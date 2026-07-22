"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Lesson {
  id: string;
  title: string;
  status: string;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Unit {
  id: string;
  title: string;
  chapters: Chapter[];
}

interface Course {
  id: string;
  title: string;
  units: Unit[];
}

export default function AdminCourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const [courseId, setCourseId] = useState("");
  const [course, setCourse] = useState<Course | null>(null);
  const [unitTitle, setUnitTitle] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterUnitId, setChapterUnitId] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonChapterId, setLessonChapterId] = useState("");

  useEffect(() => {
    params.then((p) => setCourseId(p.courseId));
  }, [params]);

  async function load() {
    if (!courseId) return;
    const res = await fetch(`/api/admin/courses/${courseId}`);
    const data = (await res.json()) as { course?: Course };
    setCourse(data.course ?? null);
  }

  useEffect(() => {
    load();
  }, [courseId]);

  async function addUnit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "unit", courseId, title: unitTitle }),
    });
    setUnitTitle("");
    load();
  }

  async function addChapter(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "chapter",
        unitId: chapterUnitId,
        title: chapterTitle,
      }),
    });
    setChapterTitle("");
    load();
  }

  async function addLesson(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "lesson",
        chapterId: lessonChapterId,
        title: lessonTitle,
        status: "PUBLISHED",
      }),
    });
    setLessonTitle("");
    load();
  }

  async function deleteLesson(lessonId: string) {
    if (!confirm("Delete this lesson?")) return;
    await fetch(`/api/admin/lessons/${lessonId}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link href="/admin/courses" className="admin-nav__back">
          ← Courses
        </Link>
      </aside>
      <main className="admin-main">
        <h1>{course?.title ?? "Course"}</h1>

        <form className="admin-form" onSubmit={addUnit}>
          <h3>Add Unit</h3>
          <input
            placeholder="Unit title"
            value={unitTitle}
            onChange={(e) => setUnitTitle(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Add Unit
          </button>
        </form>

        <form className="admin-form" onSubmit={addChapter}>
          <h3>Add Chapter</h3>
          <select
            value={chapterUnitId}
            onChange={(e) => setChapterUnitId(e.target.value)}
            required
          >
            <option value="">Select unit</option>
            {course?.units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.title}
              </option>
            ))}
          </select>
          <input
            placeholder="Chapter title"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Add Chapter
          </button>
        </form>

        <form className="admin-form" onSubmit={addLesson}>
          <h3>Add Lesson</h3>
          <select
            value={lessonChapterId}
            onChange={(e) => setLessonChapterId(e.target.value)}
            required
          >
            <option value="">Select chapter</option>
            {course?.units.flatMap((u) =>
              u.chapters.map((c) => (
                <option key={c.id} value={c.id}>
                  {u.title} → {c.title}
                </option>
              ))
            )}
          </select>
          <input
            placeholder="Lesson title"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Add Lesson
          </button>
        </form>

        {course?.units.map((unit) => (
          <section key={unit.id} className="admin-tree">
            <h2>{unit.title}</h2>
            {unit.chapters.map((chapter) => (
              <div key={chapter.id} className="admin-tree__chapter">
                <h3>{chapter.title}</h3>
                <ul>
                  {chapter.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      {lesson.title}{" "}
                      <span className="badge">{lesson.status.toLowerCase()}</span>
                      <button
                        type="button"
                        className="btn-link btn-link--danger"
                        onClick={() => deleteLesson(lesson.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}
