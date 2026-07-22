import { getStudyTimeStats, getDetailedProgressStats } from "./study-time-service";
import { getSeriesList } from "./series-service";
import { TOTAL_SERIES } from "./series-config";

export async function getHomeHubData(userId: string) {
  const [studyTime, progress, series] = await Promise.all([
    getStudyTimeStats(userId),
    getDetailedProgressStats(userId),
    getSeriesList(userId),
  ]);

  const seriesCompleted = series.filter((s) => s.complete).length;

  return {
    studyTime,
    progress: {
      seriesCompleted,
      totalSeries: TOTAL_SERIES,
      lessonsCompleted: progress.lessonsCompleted,
    },
    certificateEligible: progress.studyTime.requirementMet,
    nextSeries: series.find((s) => !s.complete) ?? null,
  };
}
