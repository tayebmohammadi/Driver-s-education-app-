"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Exam {
  id: string;
  title: string;
  description: string;
  passingScore: number;
  timeLimit: number;
}

export default function PracticePage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/practice-exams");
      const data = (await res.json()) as { exams?: Exam[] };
      setExams(data.exams ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <main className="learn-page">
      <header className="learn-page__header">
        <div>
          <p className="auth-card__brand">Driver Education</p>
          <h1>Practice Exams</h1>
          <p className="learn-page__subtitle">
            DMV-style timed practice tests with randomized questions.
          </p>
        </div>
        <Link href="/home" className="btn btn-secondary">
          Dashboard
        </Link>
      </header>

      {loading ? (
        <p>Loading exams...</p>
      ) : exams.length === 0 ? (
        <section className="learn-empty">
          <p>No practice exams available. Run the seed script to create one.</p>
        </section>
      ) : (
        <section className="course-grid">
          {exams.map((exam) => (
            <Link
              key={exam.id}
              href={`/practice/${exam.id}`}
              className="course-card"
            >
              <div className="course-card__badge">DMV Practice</div>
              <h2>{exam.title}</h2>
              <p>{exam.description}</p>
              <p className="course-card__meta">
                Pass: {exam.passingScore}% · {exam.timeLimit} min
              </p>
              <span className="course-card__cta">Start exam →</span>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
