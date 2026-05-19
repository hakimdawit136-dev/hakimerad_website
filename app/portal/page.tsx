import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default async function PortalPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Medical Image Demo Portal</h1>
          <p className="text-slate-600 mb-8">
            Upload up to 3 X-ray images (.JPEG or .PNG) for a free interpretation demo. 
            Our radiologists will review your case and provide a preliminary report.
          </p>

          <div className="space-y-6">
            <div className="bg-brand-50 border border-brand-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-brand-900 mb-3">How It Works</h2>
              <ol className="list-decimal list-inside space-y-2 text-brand-700">
                <li>Fill in patient information</li>
                <li>Upload up to 3 X-ray images</li>
                <li>Submit your case for review</li>
                <li>Receive a preliminary report from our radiologists</li>
              </ol>
            </div>

            <div className="flex gap-4">
              <Link href="/portal/new-case">
                <Button variant="primary" size="lg">
                  Submit New Case
                </Button>
              </Link>
              <Link href="/portal/my-cases">
                <Button variant="outline" size="lg">
                  View My Cases
                </Button>
              </Link>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Important Notice</h3>
              <p className="text-amber-700 text-sm">
                This is a demonstration portal only. The reports provided are for educational purposes 
                and should not be used for actual medical diagnosis or treatment. 
                Always consult with qualified healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
