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

    // Count pending cases
    const pendingResult = await query(
      `SELECT COUNT(*) as count FROM medical_cases WHERE status = 'SUBMITTED'`
    ) as any[];

    const pendingCount = pendingResult[0].count;

    // Get recent submissions (last 5)
    const recentSubmissions = await query(
      `SELECT mc.id, mc.case_number, mc.submission_date, p.first_name, p.last_name
       FROM medical_cases mc
       JOIN patients p ON mc.patient_id = p.id
       WHERE mc.status = 'SUBMITTED'
       ORDER BY mc.submission_date DESC
       LIMIT 5`
    );

    return NextResponse.json({
      pendingCount,
      recentSubmissions
    });

  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ message: "Failed to fetch notifications" }, { status: 500 });
  }
}
