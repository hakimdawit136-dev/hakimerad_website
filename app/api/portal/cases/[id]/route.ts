import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id: caseId } = await context.params;

    // Verify the case belongs to the user
    const caseResult = await query(
      `SELECT mc.*, p.first_name, p.last_name, p.date_of_birth, p.gender, p.phone, p.address
       FROM medical_cases mc
       JOIN patients p ON mc.patient_id = p.id
       WHERE mc.id = ? AND p.user_id = ?`,
      [caseId, session.user.id]
    ) as any[];

    if (caseResult.length === 0) {
      return NextResponse.json({ message: "Case not found" }, { status: 404 });
    }

    const caseDetail = caseResult[0];

    const images = await query(
      `SELECT * FROM medical_images WHERE case_id = ?`,
      [caseId]
    );

    const reportResult = await query(
      `SELECT * FROM reports WHERE case_id = ?`,
      [caseId]
    ) as any[];

    const report = reportResult.length > 0 ? reportResult[0] : null;

    return NextResponse.json({
      ...caseDetail,
      patient: {
        first_name: caseDetail.first_name,
        last_name: caseDetail.last_name,
        date_of_birth: caseDetail.date_of_birth,
        gender: caseDetail.gender,
        phone: caseDetail.phone,
        address: caseDetail.address,
      },
      images,
      report
    });

  } catch (error) {
    console.error("Error fetching case details:", error);
    return NextResponse.json({ message: "Failed to fetch case details" }, { status: 500 });
  }
}
