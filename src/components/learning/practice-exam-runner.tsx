"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

interface ExamSummary {
  id: string;
  title: string;
  description: string;
  passingScore: number;
  timeLimit: number;
}

interface ExamQuestion {
  id: string;
  question: string;
  questionType: string;
  imageUrl: string | null;
  orderNumber: number;
  answers: { id: string; answerText: string; orderNumber: number }[];
}

interface SubmitResult {
  attemptId: string;
  score: number;
  passed: boolean;
  passingScore: number;
  correctCount: number;
  totalQuestions: number;
  results: {
    questionId: string;
    question: string;
    isCorrect: boolean;
    selectedAnswerText?: string;
    correctAnswerText?: string;
    explanation: string | null;
  }[];
}

export function PracticeExamRunner({ examId }: { examId: string }) {
  const [phase, setPhase] = useState<"setup" | "exam" | "results">("setup");
  const [examInfo, setExamInfo] = useState<ExamSummary | null>(null);
  const [questionCount, setQuestionCount] = useState(20);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function loadExam() {
      const res = await fetch(`/api/practice-exams/${examId}`);
      const data = (await res.json()) as { exam?: ExamSummary & { description: string } };
      if (data.exam) {
        setExamInfo(data.exam);
      }
    }
    loadExam();
  }, [examId]);

  const submitExam = useCallback(async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setLoading(true);

    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    const answers = questions.map((q) => ({
      questionId: q.id,
      selectedAnswerId: selections[q.id] ?? "",
    }));

    try {
      const res = await fetch(`/api/practice-exams/${examId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit", timeSpent, answers }),
      });
      const data = (await res.json()) as { result?: SubmitResult; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Submit failed");
        return;
      }
      setSubmitResult(data.result ?? null);
      setPhase("results");
    } catch {
      setError("Submit failed");
    } finally {
      setLoading(false);
    }
  }, [examId, questions, selections]);

  useEffect(() => {
    if (phase !== "exam" || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          submitExam();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, timeLeft, submitExam]);

  async function startExam() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/practice-exams/${examId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start", questionCount }),
      });
      const data = (await res.json()) as {
        session?: {
          questions: ExamQuestion[];
          timeLimitMinutes: number;
        };
        error?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Failed to start");
        return;
      }
      setQuestions(data.session?.questions ?? []);
      setTimeLeft((data.session?.timeLimitMinutes ?? 30) * 60);
      startTimeRef.current = Date.now();
      setPhase("exam");
    } catch {
      setError("Failed to start exam");
    } finally {
      setLoading(false);
    }
  }

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  if (phase === "setup") {
    return (
      <div className="practice-exam">
        <Link href="/practice" className="practice-exam__back">
          ← Back to practice exams
        </Link>
        <h1>{examInfo?.title ?? "Practice Exam"}</h1>
        <p className="practice-exam__desc">{examInfo?.description}</p>
        <div className="practice-exam__meta">
          <span>Passing score: {examInfo?.passingScore ?? 70}%</span>
          <span>Time limit: {examInfo?.timeLimit ?? 30} min</span>
        </div>

        <label className="practice-exam__setup">
          Number of questions
          <select
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
          >
            {[10, 15, 20, 25, 30, 36].map((n) => (
              <option key={n} value={n}>
                {n} questions
              </option>
            ))}
          </select>
        </label>

        {error ? <div className="auth-alert auth-alert--error">{error}</div> : null}

        <button
          type="button"
          className="btn btn-primary"
          onClick={startExam}
          disabled={loading}
        >
          {loading ? "Starting..." : "Start Exam"}
        </button>
      </div>
    );
  }

  if (phase === "results" && submitResult) {
    return (
      <div className="practice-exam">
        <h1>Exam Results</h1>
        <div
          className={`quiz-score-badge ${
            submitResult.passed
              ? "quiz-score-badge--pass"
              : "quiz-score-badge--fail"
          }`}
        >
          {submitResult.score}% — {submitResult.passed ? "Passed" : "Did not pass"}
        </div>
        <p>
          {submitResult.correctCount} of {submitResult.totalQuestions} correct
          (need {submitResult.passingScore}% to pass)
        </p>

        <h2>Review Answers</h2>
        <ol className="quiz-engine__list">
          {submitResult.results.map((r, i) => (
            <li key={r.questionId} className="quiz-question">
              <p className="quiz-question__prompt">
                {i + 1}. {r.question}
              </p>
              <p
                className={
                  r.isCorrect
                    ? "quiz-review quiz-review--correct"
                    : "quiz-review quiz-review--wrong"
                }
              >
                Your answer: {r.selectedAnswerText ?? "None"}
              </p>
              {!r.isCorrect ? (
                <p className="quiz-review">Correct: {r.correctAnswerText}</p>
              ) : null}
              {r.explanation ? (
                <p className="quiz-question__explanation">{r.explanation}</p>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="practice-exam__actions">
          <button type="button" className="btn btn-primary" onClick={() => {
            setPhase("setup");
            setSubmitResult(null);
            setSelections({});
          }}>
            Retake Exam
          </button>
          <Link href="/home" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="practice-exam">
      <div className="practice-exam__timer-bar">
        <span>Time remaining: {formatTime(timeLeft)}</span>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={submitExam}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Exam"}
        </button>
      </div>

      <ol className="quiz-engine__list">
        {questions.map((q, index) => (
          <li key={q.id} className="quiz-question">
            <p className="quiz-question__prompt">
              {index + 1}. {q.question}
            </p>
            <ul className="quiz-question__answers">
              {q.answers.map((a) => (
                <li key={a.id}>
                  <button
                    type="button"
                    className={`quiz-answer-option${
                      selections[q.id] === a.id
                        ? " quiz-answer-option--selected"
                        : ""
                    }`}
                    onClick={() =>
                      setSelections((prev) => ({ ...prev, [q.id]: a.id }))
                    }
                  >
                    {a.answerText}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
