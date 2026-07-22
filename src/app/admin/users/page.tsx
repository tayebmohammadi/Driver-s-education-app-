"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface UserRow {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<{
    user: UserRow;
    stats: Record<string, number> | null;
  } | null>(null);

  async function loadUsers() {
    const url = search
      ? `/api/admin/users?q=${encodeURIComponent(search)}`
      : "/api/admin/users";
    const res = await fetch(url);
    const data = (await res.json()) as { users?: UserRow[] };
    setUsers(data.users ?? []);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function viewUser(userId: string) {
    const res = await fetch(`/api/admin/users?userId=${userId}`);
    const data = (await res.json()) as {
      user?: UserRow;
      stats?: Record<string, number>;
    };
    if (data.user) {
      setSelected({ user: data.user, stats: data.stats ?? null });
    }
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <nav className="admin-nav">
          <Link href="/admin">Overview</Link>
          <Link href="/admin/courses">Courses</Link>
          <Link href="/admin/questions">Questions</Link>
          <Link href="/admin/users">Users</Link>
        </nav>
      </aside>
      <main className="admin-main">
        <h1>Users</h1>

        <div className="admin-search">
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="btn btn-secondary btn-sm" onClick={loadUsers}>
            Search
          </button>
        </div>

        <ul className="admin-list">
          {users.map((u) => (
            <li key={u.id}>
              <button type="button" className="btn-link" onClick={() => viewUser(u.id)}>
                {u.firstName} {u.lastName} — {u.email} ({u.role})
              </button>
            </li>
          ))}
        </ul>

        {selected ? (
          <section className="dashboard-card">
            <h2>
              {selected.user.firstName} {selected.user.lastName}
            </h2>
            <p>{selected.user.email}</p>
            {selected.stats ? (
              <ul>
                <li>Lessons completed: {selected.stats.lessonsCompleted}</li>
                <li>Course progress: {selected.stats.courseCompletionPercentage}%</li>
                <li>Quizzes completed: {selected.stats.quizzesCompleted}</li>
                <li>Practice exams: {selected.stats.practiceExamsCompleted}</li>
              </ul>
            ) : null}
          </section>
        ) : null}
      </main>
    </div>
  );
}
