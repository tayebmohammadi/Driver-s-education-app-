"use client";

import type { MotionKind } from "@/lib/learning/series-study-content";
import { SeriesLessonShell } from "./series-lesson-shell";
import { SeriesMotionPreview } from "./series-motion-preview";

interface Props {
  topicTitle: string;
  title: string;
  intro: string;
  description: string;
  steps: { title: string; text: string }[];
  takeaway: string;
  motion: MotionKind;
}

export function SeriesMotionCard({
  topicTitle,
  title,
  intro,
  description,
  steps,
  takeaway,
  motion,
}: Props) {
  return (
    <SeriesLessonShell topicTitle={topicTitle} stepLabel="Motion">
      <h2 className="study-lesson__title">{title}</h2>
      <p className="study-lesson__lead">{intro}</p>

      <div className="study-motion-frame">
        <SeriesMotionPreview kind={motion} />
      </div>

      <div className="study-lesson__prose">
        <p>{description}</p>
      </div>

      <ol className="study-step-list">
        {steps.map((step) => (
          <li key={step.title}>
            <strong>{step.title}</strong> — {step.text}
          </li>
        ))}
      </ol>

      <p className="study-notes__sub">{takeaway}</p>
    </SeriesLessonShell>
  );
}
