"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useParams } from "next/navigation";

interface CaseDetail {
  id: number;
  case_number: string;
  status: string;
  submission_date: string;
  completed_date: string | null;
  notes: string | null;
  patient: {
    first_name: string;
    last_name: string;
    date_of_birth: string | null;
    gender: string | null;
    phone: string | null;
    address: string | null;
  };
  images: {
    id: number;
    image_path: string;
    image_name: string;
    image_type: string;
  }[];
  report: {
    id: number;
    findings: string | null;
    impression: string | null;
    recommendation: string | null;
    report_date: string;
  } | null;
}

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = params.id as string;
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCaseDetail();
  }, [caseId]);

  const fetchCaseDetail = async () => {
    try {
      const response = await fetch(`/api/portal/cases/${caseId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch case details");
      }
      const data = await response.json();
      setCaseDetail(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch case details");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!caseDetail?.report) return;

    try {
      const response = await fetch(`/api/portal/cases/${caseId}/report/download`);
      if (!response.ok) {
        throw new Error("Failed to download report");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${caseDetail.case_number}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download report");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return "bg-blue-100 text-blue-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange-500"></div>
          <p className="mt-4 text-slate-600">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (error || !caseDetail) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error || "Case not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/portal/my-cases">
            <Button variant="ghost" size="sm">
              ← Back to My Cases
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Information */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-slate-900">Case Details</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(caseDetail.status)}`}>
                {caseDetail.status.replace("_", " ")}
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Case Number</p>
                <p className="font-semibold text-slate-900">{caseDetail.case_number}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Patient Name</p>
                <p className="font-semibold text-slate-900">
                  {caseDetail.patient.first_name} {caseDetail.patient.last_name}
                </p>
              </div>
              {caseDetail.patient.date_of_birth && (
                <div>
                  <p className="text-sm text-slate-500">Date of Birth</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(caseDetail.patient.date_of_birth).toLocaleDateString()}
                  </p>
                </div>
              )}
              {caseDetail.patient.gender && (
                <div>
                  <p className="text-sm text-slate-500">Gender</p>
                  <p className="font-semibold text-slate-900">{caseDetail.patient.gender}</p>
                </div>
              )}
              {caseDetail.patient.phone && (
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-semibold text-slate-900">{caseDetail.patient.phone}</p>
                </div>
              )}
              {caseDetail.patient.address && (
                <div>
                  <p className="text-sm text-slate-500">Address</p>
                  <p className="font-semibold text-slate-900">{caseDetail.patient.address}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-slate-500">Submitted</p>
                <p className="font-semibold text-slate-900">
                  {new Date(caseDetail.submission_date).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Uploaded Images */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Uploaded Images</h2>
            <div className="grid grid-cols-1 gap-4">
              {caseDetail.images.map((image) => (
                <div key={image.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <img
                    src={image.image_path}
                    alt={image.image_name}
                    className="w-full h-auto"
                  />
                  <div className="p-3 bg-slate-50">
                    <p className="text-sm text-slate-600">{image.image_name}</p>
                    <p className="text-xs text-slate-500">{image.image_type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Radiologist Report</h2>
              {caseDetail.report && (
                <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                  Download Report
                </Button>
              )}
            </div>

            {caseDetail.report ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Findings</h3>
                  <p className="text-slate-700 whitespace-pre-wrap">{caseDetail.report.findings || "No findings provided"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Impression</h3>
                  <p className="text-slate-700 whitespace-pre-wrap">{caseDetail.report.impression || "No impression provided"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Recommendation</h3>
                  <p className="text-slate-700 whitespace-pre-wrap">{caseDetail.report.recommendation || "No recommendation provided"}</p>
                </div>
                <div className="text-sm text-slate-500 pt-4 border-t border-slate-200">
                  Report Date: {new Date(caseDetail.report.report_date).toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">
                  {caseDetail.status === "SUBMITTED" 
                    ? "Your case is awaiting review by a radiologist."
                    : caseDetail.status === "IN_PROGRESS"
                    ? "A radiologist is currently reviewing your case."
                    : "No report available yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
