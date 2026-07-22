"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Question {
  id: string;
  question: string;
  category: string;
  lesson: { title: string };
}

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    lessonId: "",
    question: "",
    explanation: "",
    category: "general",
    answer1: "",
    answer2: "",
    correctIndex: "0",
  });

  async function load() {
    const url = search
      ? `/api/admin/questions?q=${encodeURIComponent(search)}`
      : "/api/admin/questions";
    const res = await fetch(url);
    const data = (await res.json()) as { questions?: Question[] };
    setQuestions(data.questions ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function createQuestion(e: React.FormEvent) {
    e.preventDefault();
    const answers = [
      { answerText: form.answer1, isCorrect: form.correctIndex === "0" },
      { answerText: form.answer2, isCorrect: form.correctIndex === "1" },
    ].filter((a) => a.answerText);

    await fetch("/api/admin/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lessonId: form.lessonId,
        question: form.question,
        explanation: form.explanation,
        category: form.category,
        answers,
      }),
    });
    load();
  }

  async function deleteQuestion(id: string) {
    if (!confirm("Delete question?")) return;
    await fetch(`/api/admin/questions/${id}`, { method: "DELETE" });
    load();
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
        <h1>Questions</h1>

        <div className="admin-search">
          <input
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="btn btn-secondary btn-sm" onClick={load}>
            Search
          </button>
        </div>

        <form className="admin-form" onSubmit={createQuestion}>
          <h2>Create Question</h2>
          <input
            placeholder="Lesson ID"
            value={form.lessonId}
            onChange={(e) => setForm({ ...form, lessonId: e.target.value })}
            required
          />
          <textarea
            placeholder="Question text"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            required
          />
          <textarea
            placeholder="Explanation"
            value={form.explanation}
            onChange={(e) => setForm({ ...form, explanation: e.target.value })}
          />
          <input
            placeholder="Answer 1"
            value={form.answer1}
            onChange={(e) => setForm({ ...form, answer1: e.target.value })}
            required
          />
          <input
            placeholder="Answer 2"
            value={form.answer2}
            onChange={(e) => setForm({ ...form, answer2: e.target.value })}
          />
          <select
            value={form.correctIndex}
            onChange={(e) => setForm({ ...form, correctIndex: e.target.value })}
          >
            <option value="0">Answer 1 is correct</option>
            <option value="1">Answer 2 is correct</option>
          </select>
          <button type="submit" className="btn btn-primary">
            Create Question
          </button>
        </form>

        <ul className="admin-list">
          {questions.map((q) => (
            <li key={q.id}>
              <strong>{q.lesson.title}</strong>: {q.question.slice(0, 80)}...
              <button
                type="button"
                className="btn-link btn-link--danger"
                onClick={() => deleteQuestion(q.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
