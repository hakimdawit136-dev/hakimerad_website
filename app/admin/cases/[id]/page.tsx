"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface CaseDetail {
  id: number;
  case_number: string;
  status: string;
  submission_date: string;
  completed_date: string | null;
  notes: string | null;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  gender: string | null;
  phone: string | null;
  address: string | null;
  submitted_by_name: string;
  submitted_by_email: string;
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

export default function AdminCaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.id as string;
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSavingReport, setIsSavingReport] = useState(false);
  
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  
  const [reportForm, setReportForm] = useState({
    findings: "",
    impression: "",
    recommendation: "",
  });

  useEffect(() => {
    fetchCaseDetail();
  }, [caseId]);

  const fetchCaseDetail = async () => {
    try {
      const response = await fetch(`/api/admin/cases/${caseId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch case details");
      }
      const data = await response.json();
      setCaseDetail(data);
      setStatus(data.status);
      setNotes(data.notes || "");
      if (data.report) {
        setReportForm({
          findings: data.report.findings || "",
          impression: data.report.impression || "",
          recommendation: data.report.recommendation || "",
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch case details");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/cases/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });
      if (!response.ok) {
        throw new Error("Failed to update case");
      }
      await fetchCaseDetail();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update case");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveReport = async () => {
    setIsSavingReport(true);
    try {
      const response = await fetch(`/api/admin/cases/${caseId}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportForm),
      });
      if (!response.ok) {
        throw new Error("Failed to save report");
      }
      await fetchCaseDetail();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save report");
    } finally {
      setIsSavingReport(false);
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
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange-500"></div>
        <p className="mt-4 text-slate-600">Loading case details...</p>
      </div>
    );
  }

  if (error || !caseDetail) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error || "Case not found"}
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <div className="mb-6">
        <Link href="/admin/cases">
          <Button variant="ghost" size="sm">
            ← Back to Cases
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Case Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-slate-900">Case Information</h2>
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
                {caseDetail.first_name} {caseDetail.last_name}
              </p>
            </div>
            {caseDetail.date_of_birth && (
              <div>
                <p className="text-sm text-slate-500">Date of Birth</p>
                <p className="font-semibold text-slate-900">
                  {new Date(caseDetail.date_of_birth).toLocaleDateString()}
                </p>
              </div>
            )}
            {caseDetail.gender && (
              <div>
                <p className="text-sm text-slate-500">Gender</p>
                <p className="font-semibold text-slate-900">{caseDetail.gender}</p>
              </div>
            )}
            {caseDetail.phone && (
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-semibold text-slate-900">{caseDetail.phone}</p>
              </div>
            )}
            {caseDetail.address && (
              <div>
                <p className="text-sm text-slate-500">Address</p>
                <p className="font-semibold text-slate-900">{caseDetail.address}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-slate-500">Submitted By</p>
              <p className="font-semibold text-slate-900">{caseDetail.submitted_by_name}</p>
              <p className="text-sm text-slate-600">{caseDetail.submitted_by_email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Submitted</p>
              <p className="font-semibold text-slate-900">
                {new Date(caseDetail.submission_date).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Status Update */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Update Status</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-orange-500 focus:border-brand-orange-500"
              >
                <option value="SUBMITTED">Submitted</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-orange-500 focus:border-brand-orange-500"
                placeholder="Add any notes about this case..."
              />
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleUpdateStatus}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Status"}
            </Button>
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

        {/* Report Writing */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Radiologist Report</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Findings *</label>
              <textarea
                value={reportForm.findings}
                onChange={(e) => setReportForm({ ...reportForm, findings: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-orange-500 focus:border-brand-orange-500"
                placeholder="Describe your findings from the images..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Impression *</label>
              <textarea
                value={reportForm.impression}
                onChange={(e) => setReportForm({ ...reportForm, impression: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-orange-500 focus:border-brand-orange-500"
                placeholder="Your impression and diagnosis..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Recommendation</label>
              <textarea
                value={reportForm.recommendation}
                onChange={(e) => setReportForm({ ...reportForm, recommendation: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-orange-500 focus:border-brand-orange-500"
                placeholder="Any recommendations for follow-up or further imaging..."
              />
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleSaveReport}
              disabled={isSavingReport}
            >
              {isSavingReport ? "Saving..." : "Save Report"}
            </Button>
          </div>

          {caseDetail.report && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                Last updated: {new Date(caseDetail.report.report_date).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
