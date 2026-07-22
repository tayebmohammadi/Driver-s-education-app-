"use client";

import { useState } from "react";
import { SeriesLessonShell } from "./series-lesson-shell";

interface Choice {
  id: string;
  text: string;
  correct: boolean;
}

interface Props {
  topicTitle: string;
  intro: string;
  setup: string;
  prompt: string;
  choices: Choice[];
  explanation: string;
  tip?: string;
  whyItMatters?: string;
  onAnswered?: () => void;
}

export function SeriesScenarioCard({
  topicTitle,
  intro,
  setup,
  prompt,
  choices,
  explanation,
  tip,
  whyItMatters,
  onAnswered,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  function handleSelect(id: string) {
    if (revealed) return;
    setSelected(id);
    setRevealed(true);
    onAnswered?.();
  }

  function tryAgain() {
    setSelected(null);
    setRevealed(false);
  }

  const correct = choices.find((c) => c.correct);
  const wasCorrect = selected === correct?.id;

  return (
    <SeriesLessonShell topicTitle={topicTitle} stepLabel="Scenario">
      <p className="study-lesson__lead">
        {intro} {setup}
      </p>

      <p className="study-scenario-block__prompt">{prompt}</p>

      <div className="study-scenario__choices">
        {choices.map((choice) => {
          let state = "";
          if (revealed && choice.correct) state = " study-choice--correct";
          else if (revealed && selected === choice.id) state = " study-choice--wrong";

          return (
            <button
              key={choice.id}
              type="button"
              className={`study-choice${state}`}
              onClick={() => handleSelect(choice.id)}
              disabled={revealed}
            >
              {choice.text}
            </button>
          );
        })}
      </div>

      {revealed ? (
        <div
          className={`study-scenario__feedback${
            wasCorrect ? " study-scenario__feedback--correct" : ""
          }`}
        >
          <p>{explanation}</p>
          {whyItMatters ? <p className="study-notes__sub">{whyItMatters}</p> : null}
          {tip ? <p className="study-notes__sub">{tip}</p> : null}
          <button type="button" className="btn btn-secondary btn-sm" onClick={tryAgain}>
            Try again
          </button>
        </div>
      ) : null}
    </SeriesLessonShell>
  );
}
