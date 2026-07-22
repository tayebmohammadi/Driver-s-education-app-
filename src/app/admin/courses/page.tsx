"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Course {
  id: string;
  slug: string;
  title: string;
  isPublished: boolean;
  _count: { units: number };
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    regionCode: "CA",
  });

  async function load() {
    const res = await fetch("/api/admin/courses");
    const data = (await res.json()) as { courses?: Course[] };
    setCourses(data.courses ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function createCourse(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ slug: "", title: "", description: "", regionCode: "CA" });
    load();
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <p className="auth-card__brand">Admin</p>
        <nav className="admin-nav">
          <Link href="/admin">Overview</Link>
          <Link href="/admin/courses">Courses</Link>
          <Link href="/admin/questions">Questions</Link>
          <Link href="/admin/users">Users</Link>
        </nav>
      </aside>
      <main className="admin-main">
        <h1>Courses</h1>

        <form className="admin-form" onSubmit={createCourse}>
          <h2>Create Course</h2>
          <input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
          />
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            placeholder="Region code"
            value={form.regionCode}
            onChange={(e) => setForm({ ...form, regionCode: e.target.value })}
          />
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>

        <ul className="admin-list">
          {courses.map((c) => (
            <li key={c.id}>
              <Link href={`/admin/courses/${c.id}`}>
                {c.title} ({c._count.units} units)
                {c.isPublished ? " · Published" : " · Draft"}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
