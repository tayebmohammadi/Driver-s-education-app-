import type { SeriesTopic } from "@/lib/learning/series-study-content";

export type CurriculumItem =
  | {
      id: string;
      kind: "topic";
      topicId: string;
      title: string;
      explanation: string;
      keyPoints: string[];
      section: number;
    }
  | {
      id: string;
      kind: "reinforce";
      topicId: string;
      topicTitle: string;
      format: "scenario" | "diagram" | "motion";
      section: number;
      scenario?: NonNullable<SeriesTopic["scenario"]>;
      diagram?: NonNullable<SeriesTopic["diagram"]>;
      motion?: NonNullable<SeriesTopic["motion"]>;
    }
  | {
      id: string;
      kind: "exam";
      available: boolean;
      passed: boolean;
      section: number;
    };

export function buildSeriesCurriculum(
  examPassed: boolean,
  topics: SeriesTopic[],
  examAvailable: boolean
): CurriculumItem[] {
  const items: CurriculumItem[] = [];

  topics.forEach((topic, topicIndex) => {
    const section = topicIndex + 1;

    items.push({
      id: `${topic.id}-topic`,
      kind: "topic",
      topicId: topic.id,
      title: topic.title,
      explanation: topic.explanation,
      keyPoints: topic.keyPoints,
      section,
    });

    if (topic.scenario) {
      items.push({
        id: `${topic.id}-scenario`,
        kind: "reinforce",
        topicId: topic.id,
        topicTitle: topic.title,
        format: "scenario",
        section,
        scenario: topic.scenario,
      });
    }

    if (topic.diagram) {
      items.push({
        id: `${topic.id}-diagram`,
        kind: "reinforce",
        topicId: topic.id,
        topicTitle: topic.title,
        format: "diagram",
        section,
        diagram: topic.diagram,
      });
    }

    if (topic.motion) {
      items.push({
        id: `${topic.id}-motion`,
        kind: "reinforce",
        topicId: topic.id,
        topicTitle: topic.title,
        format: "motion",
        section,
        motion: topic.motion,
      });
    }
  });

  items.push({
    id: "exam",
    kind: "exam",
    available: examAvailable,
    passed: examPassed,
    section: topics.length + 1,
  });

  return items;
}

export function getSectionLabel(section: number, totalSections: number): string {
  if (section > totalSections - 1) return "Final exam";
  return `Section ${section}`;
}

export function countStepsInSection(
  items: CurriculumItem[],
  section: number
): number {
  return items.filter((item) => item.section === section).length;
}

export function getStepIndexInSection(
  items: CurriculumItem[],
  activeIndex: number
): number {
  const activeItem = items[activeIndex];
  if (!activeItem) return 0;
  return items
    .slice(0, activeIndex + 1)
    .filter((item) => item.section === activeItem.section).length;
}

export function getCurriculumItemLabel(item: CurriculumItem): string {
  if (item.kind === "topic") return item.title;
  if (item.kind === "exam") return "Final exam";
  if (item.format === "scenario") return "Scenario check";
  if (item.format === "diagram") return item.diagram?.title ?? "Road diagram";
  return item.motion?.title ?? "In motion";
}

export function getCurriculumItemType(item: CurriculumItem): string | null {
  if (item.kind === "topic") return null;
  if (item.kind === "exam") return "Exam";
  if (item.format === "scenario") return "Scenario";
  if (item.format === "diagram") return "Diagram";
  return "Motion";
}

export function findFirstIncompleteIndex(
  items: CurriculumItem[],
  studyDone: Set<string>
): number {
  const idx = items.findIndex((item) => {
    if (item.kind === "topic" || item.kind === "reinforce") {
      return !studyDone.has(item.id);
    }
    if (item.kind === "exam") return item.available && !item.passed;
    return false;
  });
  return idx >= 0 ? idx : 0;
}

export function isScenarioItem(item: CurriculumItem): boolean {
  return item.kind === "reinforce" && item.format === "scenario";
}

export function allStudyItemsComplete(
  items: CurriculumItem[],
  studyDone: Set<string>
): boolean {
  return items
    .filter((item) => item.kind === "topic" || item.kind === "reinforce")
    .every((item) => studyDone.has(item.id));
}
