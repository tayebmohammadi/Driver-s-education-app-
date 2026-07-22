"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HubLayout } from "@/components/hub/hub-layout";

interface SeriesItem {
  number: number;
  title: string;
  lessonCount: number;
  lessonsDone: boolean;
  examPassed: boolean;
  complete: boolean;
}

export default function SeriesPage() {
  const [series, setSeries] = useState<SeriesItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/series")
      .then((r) => r.json())
      .then((d: { series?: SeriesItem[] }) => {
        setSeries(d.series ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <HubLayout title="30 Series">
      <p className="hub-section-desc">
        Complete each series — topic, scenario, diagram, and motion — then pass
        the final exam.
      </p>

      {loading ? (
        <p>Loading series...</p>
      ) : (
        <div className="series-grid">
          {series.map((s) => (
            <Link
              key={s.number}
              href={`/series/${s.number}`}
              className={`series-card${s.complete ? " series-card--done" : ""}`}
            >
              <span className="series-card__num">{s.number}</span>
              <div>
                <h3>{s.title}</h3>
                <p className="series-card__meta">
                  {s.lessonCount} lesson{s.lessonCount !== 1 ? "s" : ""}
                  {s.complete
                    ? " · ✓ Complete"
                    : s.examPassed
                      ? " · Exam passed"
                      : s.lessonsDone
                        ? " · Exam pending"
                        : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </HubLayout>
  );
}
