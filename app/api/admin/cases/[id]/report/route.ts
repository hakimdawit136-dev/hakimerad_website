import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";

export async function POST(
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
    const { findings, impression, recommendation } = body;

    if (!findings || !impression) {
      return NextResponse.json({ message: "Findings and impression are required" }, { status: 400 });
    }

    // Check if report already exists
    const existingReport = await query(
      `SELECT id FROM reports WHERE case_id = ?`,
      [caseId]
    ) as any[];

    if (existingReport.length > 0) {
      // Update existing report
      await query(
        `UPDATE reports 
         SET findings = ?, impression = ?, recommendation = ?, updated_at = CURRENT_TIMESTAMP
         WHERE case_id = ?`,
        [findings, impression, recommendation || null, caseId]
      );
    } else {
      // Create new report
      await query(
        `INSERT INTO reports (case_id, radiologist_id, findings, impression, recommendation)
         VALUES (?, ?, ?, ?, ?)`,
        [caseId, session.user.id, findings, impression, recommendation || null]
      );
    }

    // Update case status to COMPLETED
    await query(
      `UPDATE medical_cases 
       SET status = 'COMPLETED', completed_date = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [caseId]
    );

    return NextResponse.json({ message: "Report saved successfully" });

  } catch (error) {
    console.error("Error saving report:", error);
    return NextResponse.json({ message: "Failed to save report" }, { status: 500 });
  }
}
