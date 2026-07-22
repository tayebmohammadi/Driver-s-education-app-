import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";
import { listPublishedCourses } from "@/lib/learning/course-service";

export default async function LearnPage() {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login?redirect=/learn");

  const courses = await listPublishedCourses();

  return (
    <main className="learn-page">
      <header className="learn-page__header">
        <div>
          <p className="auth-card__brand">Driver Education</p>
          <h1>Learning Platform</h1>
          <p className="learn-page__subtitle">
            Select a course to begin your theory learning journey.
          </p>
        </div>
        <Link href="/home" className="btn btn-secondary">
          Dashboard
        </Link>
      </header>

      {courses.length === 0 ? (
        <section className="learn-empty">
          <h2>No courses available yet</h2>
          <p>Run the seed script to load demo course structure.</p>
          <code>npm run db:seed</code>
        </section>
      ) : (
        <section className="course-grid">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/learn/${course.slug}`}
              className="course-card"
            >
              <div className="course-card__badge">{course.regionCode}</div>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <span className="course-card__cta">Start learning →</span>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
