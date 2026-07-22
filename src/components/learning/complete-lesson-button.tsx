"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CompleteLessonButton({
  lessonId,
  isCompleted,
}: {
  lessonId: string;
  isCompleted?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(isCompleted);

  async function handleComplete() {
    setLoading(true);
    try {
      await fetch(`/api/progress/lessons/${lessonId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: true }),
      });
      setDone(true);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return <p className="lesson-complete-msg">Lesson marked complete.</p>;
  }

  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={handleComplete}
      disabled={loading}
    >
      {loading ? "Saving..." : "Mark Lesson Complete"}
    </button>
  );
}
