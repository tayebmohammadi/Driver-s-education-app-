"use client";

import { useCallback, useEffect, useState } from "react";

interface QuizAnswer {
  id: string;
  answerText: string;
  orderNumber: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  questionType: string;
  imageUrl: string | null;
  orderNumber: number;
  answers: QuizAnswer[];
}

interface QuizResult {
  questionId: string;
  selectedAnswerId: string;
  isCorrect: boolean;
  correctAnswerId: string | null;
  explanation: string | null;
}

interface QuizEngineProps {
  lessonId: string;
}

export function QuizEngine({ lessonId }: QuizEngineProps) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadQuiz = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/quizzes/${lessonId}`);
      const data = (await res.json()) as {
        quiz?: {
          quizId: string;
          questions: QuizQuestion[];
        };
        error?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Failed to load quiz");
        return;
      }
      setQuestions(data.quiz?.questions ?? []);
    } catch {
      setError("Failed to load quiz");
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  function selectAnswer(questionId: string, answerId: string) {
    if (submitted) return;
    setSelections((prev) => ({ ...prev, [questionId]: answerId }));
  }

  async function handleSubmit() {
    if (submitted || submitting) return;
    setSubmitting(true);
    setError(null);

    const answers = questions.map((q) => ({
      questionId: q.id,
      selectedAnswerId: selections[q.id] ?? "",
    }));

    try {
      const res = await fetch(`/api/quizzes/${lessonId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = (await res.json()) as {
        result?: {
          score: number;
          results: QuizResult[];
          passed: boolean;
        };
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Submit failed");
        return;
      }

      setScore(data.result?.score ?? 0);
      setResults(data.result?.results ?? []);
      setSubmitted(true);
    } catch {
      setError("Submit failed");
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetry() {
    setSubmitted(false);
    setScore(null);
    setResults([]);
    setSelections({});
    loadQuiz();
  }

  if (loading) {
    return (
      <section className="quiz-engine">
        <p className="quiz-engine__loading">Loading quiz...</p>
      </section>
    );
  }

  if (error && questions.length === 0) {
    return (
      <section className="quiz-engine">
        <p className="auth-alert auth-alert--error">{error}</p>
      </section>
    );
  }

  if (questions.length === 0) {
    return (
      <section className="quiz-engine">
        <h2>Lesson Quiz</h2>
        <p className="quiz-engine__empty">No quiz questions for this lesson yet.</p>
      </section>
    );
  }

  const resultMap = new Map(results.map((r) => [r.questionId, r]));

  return (
    <section className="quiz-engine">
      <div className="quiz-engine__header">
        <h2>Lesson Quiz</h2>
        {submitted && score !== null ? (
          <div
            className={`quiz-score-badge ${
              score >= 70 ? "quiz-score-badge--pass" : "quiz-score-badge--fail"
            }`}
          >
            Score: {score}%
          </div>
        ) : null}
      </div>

      {error ? <div className="auth-alert auth-alert--error">{error}</div> : null}

      <ol className="quiz-engine__list">
        {questions.map((q, index) => {
          const result = resultMap.get(q.id);
          const selected = selections[q.id];

          return (
            <li key={q.id} className="quiz-question">
              <p className="quiz-question__prompt">
                {index + 1}. {q.question}
              </p>
              {q.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={q.imageUrl}
                  alt="Question illustration"
                  className="quiz-question__image"
                />
              ) : null}

              <ul className="quiz-question__answers">
                {q.answers.map((a) => {
                  let className = "quiz-answer-option";
                  if (submitted && result) {
                    if (a.id === result.correctAnswerId) {
                      className += " quiz-answer-option--correct";
                    } else if (a.id === selected && !result.isCorrect) {
                      className += " quiz-answer-option--wrong";
                    }
                  } else if (selected === a.id) {
                    className += " quiz-answer-option--selected";
                  }

                  return (
                    <li key={a.id}>
                      <button
                        type="button"
                        className={className}
                        onClick={() => selectAnswer(q.id, a.id)}
                        disabled={submitted}
                      >
                        {a.answerText}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {submitted && result?.explanation ? (
                <p className="quiz-question__explanation">
                  <strong>Explanation:</strong> {result.explanation}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="quiz-engine__actions">
        {!submitted ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={
              submitting ||
              questions.some((q) => !selections[q.id])
            }
          >
            {submitting ? "Submitting..." : "Submit Quiz"}
          </button>
        ) : (
          <button type="button" className="btn btn-secondary" onClick={handleRetry}>
            Try Again
          </button>
        )}
      </div>
    </section>
  );
}
