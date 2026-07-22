"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface StudyTimeData {
  hoursStudied: number;
  requiredHours: number;
  percentage: number;
}

export function HubLayout({
  children,
  title,
  backHref = "/home",
  showBack = true,
  showStudyHours = true,
  wide = false,
}: {
  children: React.ReactNode;
  title?: string;
  backHref?: string;
  showBack?: boolean;
  showStudyHours?: boolean;
  wide?: boolean;
}) {
  const [studyTime, setStudyTime] = useState<StudyTimeData | null>(null);

  useEffect(() => {
    if (!showStudyHours) return;

    fetch("/api/home")
      .then((r) => r.json())
      .then((d: { hub?: { studyTime: StudyTimeData } }) => {
        if (d.hub?.studyTime) setStudyTime(d.hub.studyTime);
      })
      .catch(() => {});
  }, [showStudyHours]);

  return (
    <div className="hub">
      <header className="hub__header">
        <div className="hub__header-top">
          {showBack ? (
            <Link href={backHref} className="hub__back">
              ← Back
            </Link>
          ) : (
            <span className="hub__back hub__back--placeholder" aria-hidden />
          )}
          <Link href="/home" className="hub__logo">
            DMV Study
          </Link>
        </div>
        {showStudyHours && studyTime ? (
          <div className="hub__hours-bar">
            <div className="hub__hours-label">
              <span>Study Hours</span>
              <strong>
                {studyTime.hoursStudied} / {studyTime.requiredHours} hrs
              </strong>
            </div>
            <div className="progress-bar__track hub__hours-track">
              <div
                className="progress-bar__fill"
                style={{ width: `${studyTime.percentage}%` }}
              />
            </div>
          </div>
        ) : null}
        {title ? <h1 className="hub__title">{title}</h1> : null}
      </header>
      <main className={`hub__main${wide ? " hub__main--wide" : ""}`}>{children}</main>
    </div>
  );
}
