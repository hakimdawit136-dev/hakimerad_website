import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let queryStr = `
      SELECT mc.*, p.first_name, p.last_name, p.date_of_birth, p.gender, p.phone, p.address,
             u.name as submitted_by_name, u.email as submitted_by_email
      FROM medical_cases mc
      JOIN patients p ON mc.patient_id = p.id
      JOIN users u ON p.user_id = u.id
    `;
    
    const params: any[] = [];

    if (status) {
      queryStr += " WHERE mc.status = ?";
      params.push(status);
    }

    queryStr += " ORDER BY mc.submission_date DESC";

    const cases = await query(queryStr, params);

    return NextResponse.json({ cases });

  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json({ message: "Failed to fetch cases" }, { status: 500 });
  }
}
