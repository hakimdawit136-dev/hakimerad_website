import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { query } from "@/lib/db";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Fetch pending case count for notification badge
  let pendingCount = 0;
  try {
    const userResult = await query('SELECT role FROM users WHERE id = ?', [session.user.id]) as any[];
    const user = userResult[0];
    
    if (user && (user.role === 'ADMIN' || user.role === 'RADIOLOGIST')) {
      const pendingResult = await query(
        `SELECT COUNT(*) as count FROM medical_cases WHERE status = 'SUBMITTED'`
      ) as any[];
      pendingCount = pendingResult[0].count;
    }
  } catch (error) {
    console.error("Error fetching pending count:", error);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-white border-r border-slate-200">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="font-bold text-lg">Admin Panel</span>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-md bg-brand-50 text-brand-700 font-medium">
            Dashboard
          </Link>
          <Link href="/admin/blog" className="block px-4 py-2 rounded-md text-slate-600 hover:bg-slate-50 font-medium">
            Blog Posts
          </Link>
          <Link href="/admin/cases" className="block px-4 py-2 rounded-md text-slate-600 hover:bg-slate-50 font-medium relative">
            Medical Cases
            {pendingCount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </Link>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <span className="text-slate-600">Welcome, {session.user?.name}</span>
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}>
            <Button variant="outline" size="sm">Log out</Button>
          </form>
        </header>
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
