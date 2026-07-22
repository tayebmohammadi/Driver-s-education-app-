"use client";

import type { CurriculumItem } from "@/lib/learning/series-curriculum";
import { SeriesTopicCard } from "./series-topic-card";
import { SeriesScenarioCard } from "./series-scenario-card";
import { SeriesDiagramLesson } from "./series-diagram-lesson";
import { SeriesMotionCard } from "./series-motion-card";

interface Props {
  item: CurriculumItem;
  scenarioLocked?: boolean;
  onAnswered?: () => void;
}

export function SeriesContentPanel({
  item,
  scenarioLocked = false,
  onAnswered,
}: Props) {
  if (item.kind === "topic") {
    return (
      <SeriesTopicCard
        title={item.title}
        body={item.explanation}
        keyPoints={item.keyPoints}
        topicTitle={item.title}
      />
    );
  }

  if (item.kind === "reinforce") {
    if (item.format === "scenario" && item.scenario) {
      return (
        <>
          <SeriesScenarioCard
            topicTitle={item.topicTitle}
            intro={item.scenario.intro}
            setup={item.scenario.setup}
            prompt={item.scenario.prompt}
            choices={item.scenario.choices}
            explanation={item.scenario.explanation}
            tip={item.scenario.tip}
            whyItMatters={item.scenario.whyItMatters}
            onAnswered={onAnswered}
          />
          {scenarioLocked ? (
            <p className="study-flow__hint">Answer the scenario to continue.</p>
          ) : null}
        </>
      );
    }

    if (item.format === "diagram" && item.diagram) {
      return (
        <SeriesDiagramLesson
          topicTitle={item.topicTitle}
          kind={item.diagram.kind}
          title={item.diagram.title}
          intro={item.diagram.intro}
          caption={item.diagram.caption}
          details={item.diagram.details}
          callouts={item.diagram.callouts}
        />
      );
    }

    if (item.format === "motion" && item.motion) {
      return (
        <SeriesMotionCard
          topicTitle={item.topicTitle}
          title={item.motion.title}
          intro={item.motion.intro}
          description={item.motion.description}
          steps={item.motion.steps}
          takeaway={item.motion.takeaway}
          motion={item.motion.motion}
        />
      );
    }
  }

  return null;
}
