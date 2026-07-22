"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  allStudyItemsComplete,
  buildSeriesCurriculum,
  countStepsInSection,
  findFirstIncompleteIndex,
  getSectionLabel,
  getStepIndexInSection,
  isScenarioItem,
} from "@/lib/learning/series-curriculum";
import {
  getSeriesStudyPack,
  getStudyItemsDone,
  markStudyItemDone,
} from "@/lib/learning/series-study-content";
import { SeriesContentPanel } from "./series-content-panel";

interface Props {
  seriesNumber: number;
  seriesTitle: string;
  lessonsDone: boolean;
  examPassed: boolean;
  examId: string | null;
}

export function SeriesPlayer({
  seriesNumber,
  seriesTitle,
  lessonsDone,
  examPassed,
  examId,
}: Props) {
  const pack = getSeriesStudyPack(seriesNumber);
  const [studyDone, setStudyDone] = useState<Set<string>>(() => new Set());
  const [activeId, setActiveId] = useState<string>("");
  const [answeredScenarios, setAnsweredScenarios] = useState<Set<string>>(
    () => new Set()
  );

  const examAvailable =
    lessonsDone ||
    allStudyItemsComplete(
      buildSeriesCurriculum(examPassed, pack.topics, false),
      studyDone
    );

  const items = useMemo(
    () => buildSeriesCurriculum(examPassed, pack.topics, examAvailable),
    [examPassed, pack.topics, examAvailable]
  );

  useEffect(() => {
    const done = getStudyItemsDone(seriesNumber);
    setStudyDone(done);
    const startId = items[findFirstIncompleteIndex(items, done)]?.id ?? items[0]?.id;
    if (startId) setActiveId(startId);
  }, [seriesNumber, items]);

  const activeIndex = items.findIndex((i) => i.id === activeId);
  const activeItem = items[activeIndex];
  const isLast = activeIndex === items.length - 1;

  function refreshStudyDone(itemId: string) {
    markStudyItemDone(seriesNumber, itemId);
    setStudyDone(getStudyItemsDone(seriesNumber));
  }

  function markScenarioAnswered(itemId: string) {
    setAnsweredScenarios((prev) => new Set(prev).add(itemId));
    refreshStudyDone(itemId);
  }

  function goNext() {
    if (isLast || !activeItem) return;
    if (isScenarioItem(activeItem) && !answeredScenarios.has(activeItem.id)) {
      return;
    }
    if (activeItem.kind === "topic" || activeItem.kind === "reinforce") {
      refreshStudyDone(activeItem.id);
    }
    const next = items[activeIndex + 1];
    if (next) setActiveId(next.id);
  }

  function goPrev() {
    if (activeIndex <= 0) return;
    setActiveId(items[activeIndex - 1].id);
  }

  const scenarioLocked =
    activeItem &&
    isScenarioItem(activeItem) &&
    !answeredScenarios.has(activeItem.id);

  const canContinue = !scenarioLocked;

  const studyTopicCount = pack.topics.length;
  const activeSection = activeItem?.section ?? 1;
  const stepsInSection = countStepsInSection(items, activeSection);
  const stepInSection = getStepIndexInSection(items, activeIndex);
  const sectionLabel = getSectionLabel(activeSection, studyTopicCount + 1);
  const showSectionBanner =
    activeItem &&
    activeIndex > 0 &&
    items[activeIndex - 1]?.section !== activeItem.section;

  return (
    <div className="series-player series-player--flow">
      <header className="series-player__header">
        <Link href="/series" className="series-player__back">
          ← All series
        </Link>
        <h1>
          Series {seriesNumber}: {seriesTitle}
        </h1>
        {activeIndex >= 0 ? (
          <>
            <p className="series-player__progress">
              {sectionLabel} · Step {stepInSection} of {stepsInSection}
            </p>
            <div className="series-player__progress-bar">
              <div
                className="series-player__progress-fill"
                style={{ width: `${((activeIndex + 1) / items.length) * 100}%` }}
              />
            </div>
          </>
        ) : null}
      </header>

      <main className="series-player__main">
        {!activeItem ? (
          <p>Loading…</p>
        ) : activeItem.kind === "topic" || activeItem.kind === "reinforce" ? (
          <div className="series-player__study">
            {showSectionBanner ? (
              <div className="study-flow__section-banner">
                <p className="study-flow__section-label">{sectionLabel}</p>
                <p className="study-flow__section-desc">
                  {activeSection <= studyTopicCount
                    ? "Four steps: topic, scenario, diagram, and motion."
                    : "Pass the final exam to complete this series."}
                </p>
              </div>
            ) : null}
            <SeriesContentPanel
              item={activeItem}
              scenarioLocked={!!scenarioLocked}
              onAnswered={() => markScenarioAnswered(activeItem.id)}
            />
            <div className="study-flow__nav">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={goPrev}
                disabled={activeIndex <= 0}
              >
                ← Back
              </button>
              {!isLast ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={goNext}
                  disabled={!canContinue}
                >
                  Continue →
                </button>
              ) : (
                <p className="study-flow__done">You finished this series.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="series-player__exam">
            <h2>Final Exam</h2>
            <p className="hub-section-desc">
              30 questions. No answers shown during the exam. Results and explanations
              appear after submission. 70% required to pass.
            </p>
            {!activeItem.available ? (
              <p className="auth-alert auth-alert--error">
                Complete all topic pages before taking the final exam.
              </p>
            ) : examId ? (
              <Link
                href={`/series/${seriesNumber}/exam`}
                className="btn btn-primary btn-lg"
              >
                {activeItem.passed ? "Retake Final Exam" : "Take Final Exam"}
              </Link>
            ) : (
              <p className="hub-section-desc">Exam not available yet.</p>
            )}
            <div className="study-flow__nav">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={goPrev}
                disabled={activeIndex <= 0}
              >
                ← Back
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
