import Link from "next/link";

export default function LearnNotFound() {
  return (
    <main className="learn-page">
      <section className="learn-empty">
        <h1>Not found</h1>
        <p>The course or lesson you requested does not exist.</p>
        <Link href="/learn" className="auth-link">
          Back to courses
        </Link>
      </section>
    </main>
  );
}
