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
      `SELECT mc.*, p.user_id
       FROM medical_cases mc
       JOIN patients p ON mc.patient_id = p.id
       WHERE mc.id = ? AND p.user_id = ?`,
      [caseId, session.user.id]
    ) as any[];

    if (caseResult.length === 0) {
      return NextResponse.json({ message: "Case not found" }, { status: 404 });
    }

    const caseDetail = caseResult[0];

    const reportResult = await query(
      `SELECT * FROM reports WHERE case_id = ?`,
      [caseId]
    ) as any[];

    if (reportResult.length === 0) {
      return NextResponse.json({ message: "Report not found" }, { status: 404 });
    }

    const report = reportResult[0];

    // Generate text report
    const reportText = `
MEDICAL IMAGING REPORT
======================
Case Number: ${caseDetail.case_number}
Report Date: ${new Date(report.report_date).toLocaleString()}

PATIENT INFORMATION
-------------------
First Name: ${caseDetail.first_name || 'N/A'}
Last Name: ${caseDetail.last_name || 'N/A'}

FINDINGS
--------
${report.findings || 'No findings provided'}

IMPRESSION
----------
${report.impression || 'No impression provided'}

RECOMMENDATION
--------------
${report.recommendation || 'No recommendation provided'}

---
This report is for demonstration purposes only and should not be used for actual medical diagnosis or treatment.
Always consult with qualified healthcare professionals for medical advice.
    `.trim();

    return new NextResponse(reportText, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="report-${caseDetail.case_number}.txt"`,
      },
    });

  } catch (error) {
    console.error("Error downloading report:", error);
    return NextResponse.json({ message: "Failed to download report" }, { status: 500 });
  }
}
