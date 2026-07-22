import { getDetailedProgressStats } from "./study-time-service";
import { getSeriesList } from "./series-service";
import { getPerformanceInsights } from "./weak-areas-service";

export async function getCombinedProgress(userId: string) {
  const [stats, series, performance] = await Promise.all([
    getDetailedProgressStats(userId),
    getSeriesList(userId),
    getPerformanceInsights(userId),
  ]);

  return {
    studyProgress: {
      hoursStudied: stats.studyTime.hoursStudied,
      requiredHours: stats.studyTime.requiredHours,
      hoursRemaining: stats.studyTime.hoursRemaining,
      percentage: stats.studyTime.percentage,
      requirementMet: stats.studyTime.requirementMet,
      lessonsCompleted: stats.lessonsCompleted,
      totalLessons: stats.totalLessons,
      seriesCompleted: stats.seriesCompleted,
      totalSeries: stats.totalSeries,
      examsCompleted: stats.examsCompleted,
      questionsAnswered: stats.questionsAnswered,
    },
    performance,
    activity: {
      totalQuestionsAnswered: stats.questionsAnswered,
      examsCompleted: stats.examsCompleted,
    },
    series: series.map((s) => ({
      number: s.number,
      title: s.title,
      complete: s.complete,
    })),
    certificateEligible: stats.studyTime.requirementMet,
  };
}

export async function getLicenseJourney(userId: string) {
  const combined = await getCombinedProgress(userId);

  const hoursDone = combined.studyProgress.requirementMet;
  const certificateUnlocked = combined.certificateEligible;

  return {
    steps: [
      {
        number: 1,
        title: "Study 30 Hours",
        description:
          "Complete lessons and quizzes. Active study time is tracked automatically.",
        status: hoursDone ? "complete" : "active",
        progress: combined.studyProgress.percentage,
        detail: `${combined.studyProgress.hoursStudied} / ${combined.studyProgress.requiredHours} hours`,
        action: { label: "Continue Studying", href: "/series" },
      },
      {
        number: 2,
        title: "Get Completion Certificate",
        description:
          "Automatically unlocked after completing 30 hours of study. Free certificate from our platform.",
        status: certificateUnlocked ? "complete" : "locked",
        detail: certificateUnlocked
          ? "Certificate ready!"
          : `${combined.studyProgress.hoursRemaining} hours remaining`,
        action: certificateUnlocked
          ? { label: "View Certificate", href: "/journey/certificate" }
          : { label: "Track Progress", href: "/progress" },
      },
      {
        number: 3,
        title: "Visit DMV",
        description:
          "Find your nearest DMV office, book an appointment, and prepare for the written permit test.",
        status: certificateUnlocked ? "active" : "locked",
        detail: "Bring your certificate and required documents.",
        action: {
          label: "Find DMV Locations",
          href: "https://www.dmv.ca.gov/portal/locations/",
          external: true,
        },
      },
      {
        number: 4,
        title: "Get Learner's Permit",
        description:
          "Pass the DMV written test and receive your learner's permit.",
        status: "locked",
        detail: "Requires passing the written permit exam at the DMV.",
        action: {
          label: "Practice for Permit Test",
          href: "/qna",
        },
      },
      {
        number: 5,
        title: "Driving Practice (6 Hours)",
        description:
          "Complete 6 hours of behind-the-wheel training with a certified driving instructor.",
        status: "locked",
        detail: "California requires professional instruction for minors.",
        action: { label: "Open Behind the Wheel", href: "/drive" },
      },
      {
        number: 6,
        title: "Final Driving Test",
        description:
          "Pass the behind-the-wheel driving exam and receive your driver's license.",
        status: "locked",
        detail: "Schedule your drive test after completing practice hours.",
        action: {
          label: "Book Drive Test",
          href: "https://www.dmv.ca.gov/portal/appointments/select-appointment-type",
          external: true,
        },
      },
    ],
    studyProgress: combined.studyProgress,
    certificateEligible: combined.certificateEligible,
  };
}
