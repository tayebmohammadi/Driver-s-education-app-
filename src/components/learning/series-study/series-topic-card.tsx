import { SeriesLessonShell, StudyKeyPoints } from "./series-lesson-shell";

interface Props {
  title: string;
  body: string;
  keyPoints?: string[];
  topicTitle: string;
}

export function SeriesTopicCard({ title, body, keyPoints = [], topicTitle }: Props) {
  const paragraphs = body.split("\n\n").filter(Boolean);

  return (
    <SeriesLessonShell topicTitle={topicTitle} stepLabel="Topic">
      <h2 className="study-lesson__title">{title}</h2>
      <div className="study-lesson__prose">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
      <StudyKeyPoints points={keyPoints} />
    </SeriesLessonShell>
  );
}
