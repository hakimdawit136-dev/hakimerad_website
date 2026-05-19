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
  submitted_by_name: string;
  submitted_by_email: string;
}

export default function AdminCasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    fetchCases();
  }, []);

  useEffect(() => {
    if (statusFilter === "ALL") {
      setFilteredCases(cases);
    } else {
      setFilteredCases(cases.filter(c => c.status === statusFilter));
    }
  }, [statusFilter, cases]);

  const fetchCases = async () => {
    try {
      const response = await fetch("/api/admin/cases");
      if (!response.ok) {
        throw new Error("Failed to fetch cases");
      }
      const data = await response.json();
      setCases(data.cases || []);
      setFilteredCases(data.cases || []);
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

  const getPendingCount = () => cases.filter(c => c.status === "SUBMITTED").length;
  const getInProgressCount = () => cases.filter(c => c.status === "IN_PROGRESS").length;
  const getCompletedCount = () => cases.filter(c => c.status === "COMPLETED").length;

  return (
    <div className="max-w-7xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Medical Cases</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Total Cases</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">{cases.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Pending Review</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{getPendingCount()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{getInProgressCount()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Completed</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{getCompletedCount()}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="flex gap-4 items-center">
          <span className="text-sm font-medium text-slate-700">Filter by Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-orange-500 focus:border-brand-orange-500"
          >
            <option value="ALL">All Cases</option>
            <option value="SUBMITTED">Pending Review</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
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
      ) : filteredCases.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Cases Found</h3>
          <p className="text-slate-600">No cases match the current filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Case #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Submitted By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {caseItem.case_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {caseItem.first_name} {caseItem.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    <div>
                      <div className="font-medium">{caseItem.submitted_by_name}</div>
                      <div className="text-xs text-slate-500">{caseItem.submitted_by_email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {new Date(caseItem.submission_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link href={`/admin/cases/${caseItem.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
