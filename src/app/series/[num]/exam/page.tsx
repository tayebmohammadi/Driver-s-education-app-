"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { HubLayout } from "@/components/hub/hub-layout";
import { SeriesExamRunner } from "@/components/hub/series-exam-runner";

export default function SeriesExamPage() {
  const params = useParams();
  const num = params.num as string;
  const [examId, setExamId] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(`/api/series/${num}`)
      .then((r) => r.json())
      .then((d: { series?: { title: string; lessonsDone: boolean }; examId?: string }) => {
        setExamId(d.examId ?? null);
        setTitle(d.series?.title ?? "");
      });
  }, [num]);

  return (
    <HubLayout
      title={`Series ${num} Exam`}
      backHref={`/series/${num}`}
    >
      {examId ? (
        <SeriesExamRunner
          examId={examId}
          seriesNumber={parseInt(num, 10)}
          seriesTitle={title}
        />
      ) : (
        <p>Loading exam...</p>
      )}
    </HubLayout>
  );
}
