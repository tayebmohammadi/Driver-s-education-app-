"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HubLayout } from "@/components/hub/hub-layout";
import { getProgressCoachTip } from "@/lib/learning/progress-coach";

interface TopicScore {
  slug: string;
  title: string;
  icon: string;
  score: number | null;
  totalAnswered: number;
}

interface CombinedProgress {
  studyProgress: {
    hoursStudied: number;
    requiredHours: number;
    hoursRemaining: number;
    percentage: number;
    requirementMet: boolean;
    seriesCompleted: number;
    totalSeries: number;
    questionsAnswered: number;
    lessonsCompleted: number;
  };
  performance: {
    strongTopics: TopicScore[];
    weakTopics: TopicScore[];
    allTopics: TopicScore[];
  };
  certificateEligible: boolean;
}

function AiCoachIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 2l1.2 3.6L17 6.8l-3.6 1.2L12 12l-1.2-3.6L7 6.8l3.6-1.2L12 2z"
        fill="currentColor"
      />
      <path
        d="M5 14l.8 2.4L8 17.2l-2.4.8L5 20l-.8-2.4L2 17.2l2.4-.8L5 14z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M19 13l.9 2.7L22.5 17l-2.7.9L19 20.5l-.9-2.7L15.5 17l2.7-.9L19 13z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

export default function ProgressPage() {
  const [data, setData] = useState<CombinedProgress | null>(null);

  useEffect(() => {
    fetch("/api/progress/detailed")
      .then((r) => r.json())
      .then((d: CombinedProgress) => setData(d));
  }, []);

  const coachTip = useMemo(
    () =>
      data
        ? getProgressCoachTip({
            ...data.studyProgress,
            weakTopics: data.performance.weakTopics,
            strongTopics: data.performance.strongTopics,
            certificateEligible: data.certificateEligible,
          })
        : null,
    [data]
  );

  if (!data) {
    return (
      <HubLayout title="My Progress">
        <p>Loading...</p>
      </HubLayout>
    );
  }

  const sp = data.studyProgress;
  const strongTopics = data.performance.strongTopics.slice(0, 3);
  const weakTopics = data.performance.weakTopics.slice(0, 2);

  return (
    <HubLayout title="My Progress">
      <section className="progress-simple">
        <div className="progress-simple__hero">
          <p className="progress-simple__label">Study hours</p>
          <p className="progress-simple__hours">
            <strong>{sp.hoursStudied}</strong>
            <span>/ {sp.requiredHours}h</span>
          </p>
          <div className="progress-bar__track progress-simple__bar">
            <div
              className="progress-bar__fill"
              style={{ width: `${sp.percentage}%` }}
            />
          </div>
          <p className="progress-simple__meta">
            {sp.requirementMet
              ? "30-hour requirement complete"
              : `${sp.hoursRemaining} hours to go · ${sp.percentage}% done`}
          </p>
        </div>

        <div className="progress-simple__stats progress-simple__stats--two">
          <div>
            <strong>
              {sp.seriesCompleted}/{sp.totalSeries}
            </strong>
            <span>Series</span>
          </div>
          <div>
            <strong>{sp.questionsAnswered}</strong>
            <span>Questions</span>
          </div>
        </div>

        {strongTopics.length > 0 ? (
          <div className="progress-simple__review">
            <p className="progress-simple__label">Doing well</p>
            <ul className="progress-simple__topics progress-simple__topics--strong">
              {strongTopics.map((topic) => (
                <li key={topic.slug}>
                  <Link href={`/topics/${topic.slug}`}>
                    <span>
                      {topic.icon} {topic.title}
                    </span>
                    <strong>{topic.score}%</strong>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {weakTopics.length > 0 ? (
          <div className="progress-simple__review">
            <p className="progress-simple__label">Needs review</p>
            <ul className="progress-simple__topics progress-simple__topics--weak">
              {weakTopics.map((topic) => (
                <li key={topic.slug}>
                  <Link href={`/topics/${topic.slug}`}>
                    <span>
                      {topic.icon} {topic.title}
                    </span>
                    <strong>{topic.score}%</strong>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {coachTip ? (
          <div className="progress-coach progress-coach--ai">
            <div className="progress-coach__head">
              <span className="progress-coach__icon" aria-hidden>
                <AiCoachIcon />
              </span>
              <div>
                <span className="progress-coach__badge">AI Study Coach</span>
                <p className="progress-coach__title">Personalized for you</p>
              </div>
            </div>
            <p className="progress-coach__message">{coachTip.message}</p>
            <div className="progress-coach__actions">
              <Link href={coachTip.actionHref} className="btn btn-primary">
                {coachTip.actionLabel} →
              </Link>
              <Link
                href={coachTip.browseHref}
                className="progress-coach__secondary"
              >
                {coachTip.browseLabel}
              </Link>
            </div>
          </div>
        ) : null}
      </section>
    </HubLayout>
  );
}
