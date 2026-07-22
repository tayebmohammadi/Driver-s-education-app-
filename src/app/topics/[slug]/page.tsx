"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { HubLayout } from "@/components/hub/hub-layout";
import { StudyTimeTracker } from "@/components/hub/study-time-tracker";

interface TopicData {
  topic: { slug: string; title: string; description: string; icon: string };
  lessons: {
    id: string;
    title: string;
    description: string;
    chapter: { unit: { course: { slug: string } } };
    questions: {
      id: string;
      question: string;
      explanation: string | null;
      answers: { id: string; answerText: string; isCorrect: boolean }[];
    }[];
  }[];
}

export default function TopicDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [data, setData] = useState<TopicData | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    fetch("/api/qna", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((r) => r.json())
      .then((d: { topic?: TopicData["topic"]; lessons?: TopicData["lessons"] }) => {
        if (d.topic) setData({ topic: d.topic, lessons: d.lessons ?? [] });
      });
  }, [slug]);

  const allQuestions =
    data?.lessons.flatMap((l) =>
      l.questions.map((q) => ({ ...q, lessonTitle: l.title }))
    ) ?? [];
  const currentQ = allQuestions[quizIndex];

  function handleReveal(answerId: string) {
    setSelected(answerId);
    setRevealed(true);
  }

  function nextQuestion() {
    setSelected(null);
    setRevealed(false);
    setQuizIndex((i) => (i + 1) % allQuestions.length);
  }

  if (!data) {
    return (
      <HubLayout title="Topic" backHref="/topics">
        <p>Loading...</p>
      </HubLayout>
    );
  }

  return (
    <HubLayout title={data.topic.title} backHref="/topics">
      <StudyTimeTracker activityType="LESSON" />

      <p className="hub-section-desc">{data.topic.description}</p>

      <h2>Lessons</h2>
      <ul className="series-lesson-list">
        {data.lessons.map((l) => (
          <li key={l.id}>
            <Link href={`/learn/${l.chapter.unit.course.slug}/lessons/${l.id}`}>
              {l.title}
            </Link>
          </li>
        ))}
      </ul>

      {allQuestions.length > 0 ? (
        <>
          <h2>Mini Quiz</h2>
          <div className="mini-quiz">
            <p className="mini-quiz__source">{currentQ.lessonTitle}</p>
            <p className="quiz-question__prompt">{currentQ.question}</p>
            <ul className="quiz-question__answers">
              {currentQ.answers.map((a) => {
                let cls = "quiz-answer-option";
                if (revealed) {
                  if (a.isCorrect) cls += " quiz-answer-option--correct";
                  else if (selected === a.id) cls += " quiz-answer-option--wrong";
                } else if (selected === a.id) {
                  cls += " quiz-answer-option--selected";
                }
                return (
                  <li key={a.id}>
                    <button
                      type="button"
                      className={cls}
                      disabled={revealed}
                      onClick={() => handleReveal(a.id)}
                    >
                      {a.answerText}
                    </button>
                  </li>
                );
              })}
            </ul>
            {revealed && currentQ.explanation ? (
              <p className="quiz-question__explanation">{currentQ.explanation}</p>
            ) : null}
            {revealed ? (
              <button type="button" className="btn btn-primary" onClick={nextQuestion}>
                Next Question
              </button>
            ) : null}
          </div>
        </>
      ) : null}
    </HubLayout>
  );
}
