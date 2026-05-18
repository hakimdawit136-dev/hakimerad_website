export default function AdminDashboard() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Total Blog Posts</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">Manage</p>
        </div>
      </div>
    </div>
  );
}
