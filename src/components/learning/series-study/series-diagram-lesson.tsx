import { SeriesLessonShell, StudyCalloutList } from "./series-lesson-shell";
import { SeriesRoadDiagram } from "./series-road-diagram";
import type { DiagramKind } from "@/lib/learning/series-study-content";

interface Props {
  topicTitle: string;
  kind: DiagramKind;
  title: string;
  intro: string;
  caption: string;
  details: string;
  callouts: { label: string; detail: string }[];
}

export function SeriesDiagramLesson({
  topicTitle,
  kind,
  title,
  intro,
  caption,
  details,
  callouts,
}: Props) {
  return (
    <SeriesLessonShell topicTitle={topicTitle} stepLabel="Diagram">
      <h2 className="study-lesson__title">{title}</h2>
      <p className="study-lesson__lead">{intro}</p>

      <SeriesRoadDiagram kind={kind} title={title} caption={caption} />

      <div className="study-lesson__prose">
        <p>{details}</p>
      </div>

      <StudyCalloutList items={callouts} />
    </SeriesLessonShell>
  );
}
