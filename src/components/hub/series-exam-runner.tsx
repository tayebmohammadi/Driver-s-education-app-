"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { StudyTimeTracker } from "@/components/hub/study-time-tracker";

interface ExamQuestion {
  id: string;
  question: string;
  imageUrl: string | null;
  answers: { id: string; answerText: string }[];
}

interface SubmitResult {
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

export function SeriesExamRunner({
  examId,
  seriesNumber,
  seriesTitle,
}: {
  examId: string;
  seriesNumber: number;
  seriesTitle: string;
}) {
  const [phase, setPhase] = useState<"intro" | "exam" | "results">("intro");
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startTimeRef = useRef(0);

  const startExam = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/practice-exams/${examId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start", questionCount: 30 }),
      });
      const data = (await res.json()) as {
        session?: { questions: ExamQuestion[] };
        error?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Failed to start exam");
        return;
      }
      setQuestions(data.session?.questions ?? []);
      startTimeRef.current = Date.now();
      setPhase("exam");
    } catch {
      setError("Failed to start exam");
    } finally {
      setLoading(false);
    }
  }, [examId]);

  async function submitExam() {
    const unanswered = questions.filter((q) => !selections[q.id]);
    if (unanswered.length > 0) {
      setError(`Please answer all ${questions.length} questions before submitting.`);
      return;
    }

    setLoading(true);
    setError(null);
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    const answers = questions.map((q) => ({
      questionId: q.id,
      selectedAnswerId: selections[q.id],
    }));

    try {
      const res = await fetch(`/api/practice-exams/${examId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit", timeSpent, answers }),
      });
      const data = (await res.json()) as {
        result?: SubmitResult;
        error?: string;
      };
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
  }

  if (phase === "intro") {
    return (
      <div className="series-exam">
        <StudyTimeTracker activityType="EXAM" resourceId={examId} />
        <h1>Series {seriesNumber} Final Exam</h1>
        <p className="series-exam__subtitle">{seriesTitle}</p>
        <ul className="series-exam__rules">
          <li>30 questions — no hints during the exam</li>
          <li>No feedback until you submit</li>
          <li>70% required to pass</li>
          <li>Review all answers after submission</li>
        </ul>
        {error ? <div className="auth-alert auth-alert--error">{error}</div> : null}
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={startExam}
          disabled={loading}
        >
          {loading ? "Loading..." : "Start Exam"}
        </button>
      </div>
    );
  }

  if (phase === "results" && submitResult) {
    return (
      <div className="series-exam">
        <h1>Exam Results</h1>
        <div
          className={`quiz-score-badge ${
            submitResult.passed
              ? "quiz-score-badge--pass"
              : "quiz-score-badge--fail"
          }`}
        >
          {submitResult.score}% — {submitResult.passed ? "Passed" : "Did Not Pass"}
        </div>
        <p>
          {submitResult.correctCount} of {submitResult.totalQuestions} correct
          (need {submitResult.passingScore}% to pass)
        </p>

        <h2>Review Your Answers</h2>
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

        <div className="series-exam__actions">
          {!submitResult.passed ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setPhase("intro");
                setSubmitResult(null);
                setSelections({});
              }}
            >
              Retake Exam
            </button>
          ) : null}
          <Link href={`/series/${seriesNumber}`} className="btn btn-secondary">
            Back to Series
          </Link>
          <Link href="/home" className="btn btn-secondary">
            Home
          </Link>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(selections).length;

  return (
    <div className="series-exam">
      <StudyTimeTracker activityType="EXAM" resourceId={examId} />
      <div className="series-exam__progress-bar">
        <span>
          Question {answeredCount} / {questions.length} answered
        </span>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={submitExam}
          disabled={loading || answeredCount < questions.length}
        >
          {loading ? "Submitting..." : "Submit Exam"}
        </button>
      </div>

      {error ? <div className="auth-alert auth-alert--error">{error}</div> : null}

      <ol className="quiz-engine__list">
        {questions.map((q, index) => (
          <li key={q.id} className="quiz-question">
            <p className="quiz-question__prompt">
              {index + 1}. {q.question}
            </p>
            {q.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={q.imageUrl} alt="" className="quiz-question__image" />
            ) : null}
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

      <div className="series-exam__footer">
        <button
          type="button"
          className="btn btn-primary"
          onClick={submitExam}
          disabled={loading || answeredCount < questions.length}
        >
          Submit Exam ({answeredCount}/{questions.length})
        </button>
      </div>
    </div>
  );
}
