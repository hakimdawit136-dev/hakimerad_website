"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
      });
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/blog/${slug}`, { method: "DELETE" });
    setPosts(posts.filter((p) => p.slug !== slug));
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
        <Link href="/admin/blog/new">
          <Button>Create Post</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-900 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{post.title}</td>
                <td className="px-6 py-4">{new Date(post.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link href={`/admin/blog/${post.slug}/edit`} className="text-brand-600 hover:text-brand-800">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(post.slug)} className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
