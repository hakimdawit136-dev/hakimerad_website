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

    const userResult = await query('SELECT role FROM users WHERE id = ?', [session.user.id]) as any[];
    const user = userResult[0];

    if (!user || (user.role !== 'ADMIN' && user.role !== 'RADIOLOGIST')) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id: caseId } = await context.params;

    const caseResult = await query(
      `SELECT mc.*, p.first_name, p.last_name, p.date_of_birth, p.gender, p.phone, p.address,
              u.name as submitted_by_name, u.email as submitted_by_email
       FROM medical_cases mc
       JOIN patients p ON mc.patient_id = p.id
       JOIN users u ON p.user_id = u.id
       WHERE mc.id = ?`,
      [caseId]
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
      images,
      report
    });

  } catch (error) {
    console.error("Error fetching case details:", error);
    return NextResponse.json({ message: "Failed to fetch case details" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userResult = await query('SELECT role FROM users WHERE id = ?', [session.user.id]) as any[];
    const user = userResult[0];

    if (!user || (user.role !== 'ADMIN' && user.role !== 'RADIOLOGIST')) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id: caseId } = await context.params;
    const body = await req.json();
    const { status, notes } = body;

    if (status && !['SUBMITTED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    let updateQuery = "UPDATE medical_cases SET ";
    const updateParams: any[] = [];
    const updates: string[] = [];

    if (status) {
      updates.push("status = ?");
      updateParams.push(status);
      if (status === 'COMPLETED') {
        updates.push("completed_date = CURRENT_TIMESTAMP");
      }
    }

    if (notes !== undefined) {
      updates.push("notes = ?");
      updateParams.push(notes);
    }

    if (updates.length === 0) {
      return NextResponse.json({ message: "No fields to update" }, { status: 400 });
    }

    updateQuery += updates.join(", ") + " WHERE id = ?";
    updateParams.push(caseId);

    await query(updateQuery, updateParams);

    return NextResponse.json({ message: "Case updated successfully" });

  } catch (error) {
    console.error("Error updating case:", error);
    return NextResponse.json({ message: "Failed to update case" }, { status: 500 });
  }
}
