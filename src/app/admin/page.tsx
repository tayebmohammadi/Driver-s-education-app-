"use client";

import Link from "next/link";

export default function AdminHomePage() {
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
        <Link href="/home" className="admin-nav__back">
          ← Student view
        </Link>
      </aside>
      <main className="admin-main">
        <h1>Admin Dashboard</h1>
        <p className="dashboard-meta">
          Manage courses, lessons, quiz questions, and view student progress.
        </p>
        <div className="admin-quick-links">
          <Link href="/admin/courses" className="course-card">
            <h2>Courses</h2>
            <p>Create and edit course structure</p>
          </Link>
          <Link href="/admin/questions" className="course-card">
            <h2>Questions</h2>
            <p>Manage quiz and practice exam questions</p>
          </Link>
          <Link href="/admin/users" className="course-card">
            <h2>Users</h2>
            <p>Search users and view progress</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
