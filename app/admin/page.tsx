import { query } from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboard() {
  // Fetch dashboard stats
  let pendingCases = 0;
  let inProgressCases = 0;
  let completedCases = 0;
  let totalBlogPosts = 0;
  let totalUsers = 0;
  let totalAdmins = 0;
  let totalRadiologists = 0;
  let totalPatients = 0;
  let activeCases = 0;
  let recentRegistrations = 0;

  try {
    const caseStats = await query(
      `SELECT 
        COUNT(CASE WHEN status = 'SUBMITTED' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'IN_PROGRESS' THEN 1 END) as in_progress,
        COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) as completed
       FROM medical_cases`
    ) as any[];

    if (caseStats.length > 0) {
      pendingCases = caseStats[0].pending || 0;
      inProgressCases = caseStats[0].in_progress || 0;
      completedCases = caseStats[0].completed || 0;
    }

    const blogResult = await query(`SELECT COUNT(*) as count FROM blog_posts`) as any[];
    totalBlogPosts = blogResult[0].count || 0;

    const userStats = await query(
      `SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN role = 'ADMIN' THEN 1 END) as admins,
        COUNT(CASE WHEN role = 'RADIOLOGIST' THEN 1 END) as radiologists,
        COUNT(CASE WHEN role = 'USER' THEN 1 END) as users
       FROM users`
    ) as any[];
    
    if (userStats.length > 0) {
      totalUsers = userStats[0].total || 0;
      totalAdmins = userStats[0].admins || 0;
      totalRadiologists = userStats[0].radiologists || 0;
      totalPatients = userStats[0].users || 0;
    }

    activeCases = pendingCases + inProgressCases;
    
    const recentRegResult = await query(
      `SELECT COUNT(*) as count FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`
    ) as any[];
    recentRegistrations = recentRegResult[0].count || 0;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>
      
      {/* User Management Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">User Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Total Users</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalUsers}</p>
            <p className="text-xs text-slate-500 mt-1">All registered users</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Admins</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">{totalAdmins}</p>
            <p className="text-xs text-slate-500 mt-1">System administrators</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Radiologists</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{totalRadiologists}</p>
            <p className="text-xs text-slate-500 mt-1">Medical professionals</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Patients</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{totalPatients}</p>
            <p className="text-xs text-slate-500 mt-1">Regular users</p>
          </div>
        </div>
      </div>

      {/* User Activity Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">User Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Recent Registrations (7 days)</h3>
            <p className="text-3xl font-bold text-brand-orange-500 mt-2">{recentRegistrations}</p>
            <p className="text-xs text-slate-500 mt-1">New sign-ups this week</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Active Cases</h3>
            <p className="text-3xl font-bold text-brand-blue-700 mt-2">{activeCases}</p>
            <p className="text-xs text-slate-500 mt-1">Pending + In Progress</p>
          </div>
        </div>
      </div>

      {/* Medical Cases Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Medical Cases Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Pending Review</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{pendingCases}</p>
            {pendingCases > 0 && (
              <Link href="/admin/cases?status=SUBMITTED" className="text-sm text-brand-orange-500 hover:underline mt-2 inline-block">
                View Pending →
              </Link>
            )}
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">In Progress</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{inProgressCases}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{completedCases}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Total Cases</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">{pendingCases + inProgressCases + completedCases}</p>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Content Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Total Blog Posts</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalBlogPosts}</p>
            <Link href="/admin/blog" className="text-sm text-brand-orange-500 hover:underline mt-2 inline-block">
              Manage Blog Posts →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Medical Cases</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">Manage</p>
            <Link href="/admin/cases" className="text-sm text-brand-orange-500 hover:underline mt-2 inline-block">
              View All Cases →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex gap-4 flex-wrap">
            <Link href="/admin/blog/new">
              <button className="px-4 py-2 bg-brand-orange-500 text-white rounded-lg hover:bg-brand-orange-600 transition">
                Create Blog Post
              </button>
            </Link>
            <Link href="/admin/cases">
              <button className="px-4 py-2 bg-brand-blue-700 text-white rounded-lg hover:bg-brand-blue-800 transition">
                Review Cases
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
