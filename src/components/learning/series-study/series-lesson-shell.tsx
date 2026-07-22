"use client";

interface Props {
  topicTitle: string;
  stepLabel: string;
  children: React.ReactNode;
}

export function SeriesLessonShell({ topicTitle, stepLabel, children }: Props) {
  return (
    <article className="study-lesson">
      <header className="study-lesson__header">
        <span className="study-lesson__step">{stepLabel}</span>
        <span className="study-lesson__topic">{topicTitle}</span>
      </header>
      <div className="study-lesson__body">{children}</div>
    </article>
  );
}

export function StudyKeyPoints({ points }: { points: string[] }) {
  if (points.length === 0) return null;
  return (
    <div className="study-notes">
      <p className="study-notes__label">Takeaways</p>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

export function StudyCalloutList({
  items,
}: {
  items: { label: string; detail: string }[];
}) {
  return (
    <dl className="study-callout-list">
      {items.map((item) => (
        <div key={item.label} className="study-callout-list__row">
          <dt>{item.label}</dt>
          <dd>{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
