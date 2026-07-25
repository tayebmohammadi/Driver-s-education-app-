"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HubLayout } from "@/components/hub/hub-layout";

interface JourneyStep {
  number: number;
  title: string;
  description: string;
  status: "complete" | "active" | "locked";
  progress?: number;
  detail: string;
  action: {
    label: string;
    href: string;
    external?: boolean;
  } | null;
}

interface JourneyData {
  steps: JourneyStep[];
  studyProgress: {
    hoursStudied: number;
    requiredHours: number;
    percentage: number;
  };
  certificateEligible: boolean;
}

// Temporary: allow every journey step to be reviewed without changing progress.
const JOURNEY_INSPECTION_MODE = true;

export default function JourneyPage() {
  const [journey, setJourney] = useState<JourneyData | null>(null);

  useEffect(() => {
    fetch("/api/journey")
      .then((r) => r.json())
      .then((d: { journey?: JourneyData }) => setJourney(d.journey ?? null));
  }, []);

  if (!journey) {
    return (
      <HubLayout title="License Journey">
        <p>Loading...</p>
      </HubLayout>
    );
  }

  return (
    <HubLayout title="Driver License Journey">
      <p className="hub-section-desc">
        Your step-by-step roadmap to getting a California driver&apos;s license.
      </p>

      {JOURNEY_INSPECTION_MODE ? (
        <div className="journey-inspection-notice">
          <strong>Inspection mode is on</strong>
          <span>
            All steps are open for review. Your actual completion progress has
            not been changed.
          </span>
        </div>
      ) : null}

      <div className="journey-steps">
        {journey.steps.map((step, index) => {
          const displayStatus =
            JOURNEY_INSPECTION_MODE && step.status === "locked"
              ? "active"
              : step.status;

          return (
            <div
              key={step.number}
              className={`journey-step journey-step--${displayStatus}`}
            >
            <div className="journey-step__indicator">
              <span className="journey-step__num">
                {step.status === "complete" ? "✓" : step.number}
              </span>
              {index < journey.steps.length - 1 ? (
                <div className="journey-step__line" />
              ) : null}
            </div>

            <div className="journey-step__content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <p className="journey-step__detail">{step.detail}</p>

              {step.number === 1 && step.status !== "complete" ? (
                <div className="progress-bar__track journey-step__bar">
                  <div
                    className="progress-bar__fill"
                    style={{ width: `${step.progress ?? 0}%` }}
                  />
                </div>
              ) : null}

              {step.action ? (
                step.action.external ? (
                  <a
                    href={step.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hub-text-link"
                  >
                    {step.action.label} ↗
                  </a>
                ) : (
                  <Link href={step.action.href} className="hub-text-link">
                    {step.action.label}
                  </Link>
                )
              ) : null}
            </div>
          </div>
          );
        })}
      </div>

      {journey.certificateEligible ? (
        <div className="journey-cert-banner">
          <p>🎓 Your 30-hour certificate preview is available.</p>
          <Link href="/journey/certificate" className="btn btn-primary">
            View Certificate Preview
          </Link>
        </div>
      ) : null}
    </HubLayout>
  );
}
