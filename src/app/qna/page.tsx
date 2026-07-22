"use client";

import { useMemo, useState } from "react";
import { HubLayout } from "@/components/hub/hub-layout";
import { StudyTimeTracker } from "@/components/hub/study-time-tracker";
import {
  QNA_QUESTION_SETS,
  type QnaPracticeQuestion,
} from "@/lib/learning/class-c-written-test-1";

interface SessionAnswer {
  questionId: string;
  selectedId: string;
  isCorrect: boolean;
}

function getCorrectAnswer(question: QnaPracticeQuestion) {
  return question.answers.find((a) => a.isCorrect);
}

function getSelectedAnswer(question: QnaPracticeQuestion, selectedId: string) {
  return question.answers.find((a) => a.id === selectedId);
}

export default function QnaPage() {
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [sessionAnswers, setSessionAnswers] = useState<SessionAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const activeSet = QNA_QUESTION_SETS[activeSetIndex];
  const questions = activeSet.questions;
  const hasNextSet = activeSetIndex < QNA_QUESTION_SETS.length - 1;

  const q = questions[index];
  const isLastQuestion = index === questions.length - 1;

  const score = useMemo(
    () => sessionAnswers.filter((a) => a.isCorrect).length,
    [sessionAnswers]
  );

  const scorePercent = Math.round((score / questions.length) * 100);

  function resetQuizState() {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setSessionAnswers([]);
    setShowResults(false);
  }

  function restartTest() {
    resetQuizState();
  }

  function startNextSet() {
    if (!hasNextSet) return;
    setActiveSetIndex((current) => current + 1);
    resetQuizState();
  }

  function handleSelect(answerId: string) {
    if (revealed || !q) return;

    const isCorrect =
      q.answers.find((a) => a.id === answerId)?.isCorrect ?? false;

    setSelected(answerId);
    setRevealed(true);
    setSessionAnswers((prev) => [
      ...prev,
      { questionId: q.id, selectedId: answerId, isCorrect },
    ]);
  }

  function handleContinue() {
    if (!revealed) return;

    if (isLastQuestion) {
      setShowResults(true);
      return;
    }

    setSelected(null);
    setRevealed(false);
    setIndex((i) => i + 1);
  }

  return (
    <HubLayout title="Questions & Answers">
      <StudyTimeTracker activityType="PRACTICE" />

      <p className="hub-section-desc">
        Answer all 10 questions, then review your score and explanations.
      </p>

      {showResults ? (
        <div className="qna-results">
          <div className="qna-results__hero">
            <p className="qna-results__label">Your score</p>
            <p className="qna-results__score">
              {score}/{questions.length}
            </p>
            <p className="qna-results__percent">{scorePercent}% correct</p>
            <p className="qna-results__message">
              {scorePercent >= 83
                ? "Strong work — this is passing range for many permit tests."
                : scorePercent >= 70
                  ? "Good effort. Review the explanations below and try again."
                  : "Keep studying — focus on the questions you missed below."}
            </p>
          </div>

          <div className="qna-results__review">
            <h2>Review & explanations</h2>
            {questions.map((question, questionIndex) => {
              const answer = sessionAnswers[questionIndex];
              const selectedAnswer = answer
                ? getSelectedAnswer(question, answer.selectedId)
                : null;
              const correctAnswer = getCorrectAnswer(question);

              return (
                <article
                  key={question.id}
                  className={`qna-results__item${
                    answer?.isCorrect
                      ? " qna-results__item--correct"
                      : " qna-results__item--wrong"
                  }`}
                >
                  <p className="qna-results__question">
                    {questionIndex + 1}. {question.question}
                  </p>
                  <p className="qna-results__your-answer">
                    Your answer:{" "}
                    <strong>{selectedAnswer?.text ?? "No answer"}</strong>
                  </p>
                  {!answer?.isCorrect ? (
                    <p className="qna-results__correct-answer">
                      Correct answer: <strong>{correctAnswer?.text}</strong>
                    </p>
                  ) : null}
                  <p className="qna-results__explanation">
                    {question.explanation}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="qna-results__actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={restartTest}
            >
              Try Again
            </button>
            {hasNextSet ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={startNextSet}
              >
                Next Test →
              </button>
            ) : null}
          </div>
        </div>
      ) : q ? (
        <div className="mini-quiz mini-quiz--large">
          <p className="mini-quiz__counter">
            Question {index + 1} of {questions.length}
          </p>
          <p className="quiz-question__prompt">{q.question}</p>
          <ul className="quiz-question__answers">
            {q.answers.map((a) => {
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
                    onClick={() => handleSelect(a.id)}
                    disabled={revealed}
                  >
                    {a.text}
                  </button>
                </li>
              );
            })}
          </ul>
          {revealed ? (
            <button type="button" className="btn btn-primary" onClick={handleContinue}>
              {isLastQuestion ? "See Results →" : "Next Question →"}
            </button>
          ) : null}
        </div>
      ) : null}
    </HubLayout>
  );
}
