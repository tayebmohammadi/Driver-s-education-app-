import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";

export default async function RootPage() {
  const session = await getSessionFromCookies();

  if (session) {
    redirect(session.role === "ADMIN" ? "/admin" : "/home");
  }

  return (
    <main className="landing-page">
      <div className="landing-page__hero">
        <p className="landing-page__brand">Driver Education</p>
        <h1>Study for your permit. Book driving lessons.</h1>
        <p className="landing-page__subtitle">
          Prepare for your written test, track your progress, and find licensed
          driving schools and instructors near you — all in one app.
        </p>

        <div className="landing-page__actions">
          <Link href="/register" className="btn btn-primary btn-lg">
            Create free account
          </Link>
          <Link href="/login" className="btn btn-secondary btn-lg">
            Sign in
          </Link>
        </div>

        <ul className="landing-page__features">
          <li>California DMV theory study modules</li>
          <li>Compare instructors from licensed driving schools</li>
          <li>Book lessons and track your skills</li>
        </ul>
      </div>
    </main>
  );
}
