"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { HubLayout } from "@/components/hub/hub-layout";
import { SeriesPlayer } from "@/components/learning/series-study/series-player";

interface SeriesDetail {
  number: number;
  title: string;
  lessonCount: number;
  lessonsDone: boolean;
  examPassed: boolean;
  complete: boolean;
  lessons: {
    id: string;
    title: string;
    courseSlug: string;
    completed: boolean;
  }[];
}

export default function SeriesDetailPage() {
  const params = useParams();
  const num = params.num as string;
  const [series, setSeries] = useState<SeriesDetail | null>(null);
  const [examId, setExamId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/series/${num}`)
      .then((r) => r.json())
      .then((d: { series?: SeriesDetail; examId?: string }) => {
        setSeries(d.series ?? null);
        setExamId(d.examId ?? null);
      });
  }, [num]);

  if (!series) {
    return (
      <HubLayout title={`Series ${num}`} backHref="/series" showStudyHours={false}>
        <p>Loading...</p>
      </HubLayout>
    );
  }

  return (
    <HubLayout backHref="/series" showStudyHours={false} showBack={false}>
      <SeriesPlayer
        seriesNumber={series.number}
        seriesTitle={series.title}
        lessonsDone={series.lessonsDone}
        examPassed={series.examPassed}
        examId={examId}
      />
    </HubLayout>
  );
}
