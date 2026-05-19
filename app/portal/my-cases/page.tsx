"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface Case {
  id: number;
  case_number: string;
  status: string;
  submission_date: string;
  completed_date: string | null;
  first_name: string;
  last_name: string;
}

export default function MyCasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await fetch("/api/portal/cases");
      if (!response.ok) {
        throw new Error("Failed to fetch cases");
      }
      const data = await response.json();
      setCases(data.cases || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cases");
    } finally {
      setLoading(false);
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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Cases</h1>
            <p className="text-slate-600">View and track your submitted cases</p>
          </div>
          <Link href="/portal/new-case">
            <Button variant="primary" size="lg">
              Submit New Case
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange-500"></div>
            <p className="mt-4 text-slate-600">Loading cases...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : cases.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Cases Yet</h3>
            <p className="text-slate-600 mb-6">You haven't submitted any cases yet.</p>
            <Link href="/portal/new-case">
              <Button variant="primary" size="lg">
                Submit Your First Case
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cases.map((caseItem) => (
              <div key={caseItem.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Case #{caseItem.case_number}
                    </h3>
                    <p className="text-slate-600">
                      Patient: {caseItem.first_name} {caseItem.last_name}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(caseItem.status)}`}>
                    {caseItem.status.replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-slate-600">
                    <p>Submitted: {new Date(caseItem.submission_date).toLocaleDateString()}</p>
                    {caseItem.completed_date && (
                      <p>Completed: {new Date(caseItem.completed_date).toLocaleDateString()}</p>
                    )}
                  </div>
                  <Link href={`/portal/case/${caseItem.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
