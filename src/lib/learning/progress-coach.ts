export interface ProgressCoachInput {
  hoursStudied: number;
  requiredHours: number;
  hoursRemaining: number;
  requirementMet: boolean;
  percentage: number;
  lessonsCompleted: number;
  seriesCompleted: number;
  totalSeries: number;
  questionsAnswered: number;
  weakTopics: { slug: string; title: string; score: number | null }[];
  strongTopics: { slug: string; title: string; score: number | null }[];
  certificateEligible: boolean;
}

export interface ProgressCoachTip {
  message: string;
  actionLabel: string;
  actionHref: string;
  browseLabel: string;
  browseHref: string;
}

export function getProgressCoachTip(input: ProgressCoachInput): ProgressCoachTip {
  const nextSeries = Math.min(input.seriesCompleted + 1, input.totalSeries);
  const focus = input.weakTopics[0];
  const strength = input.strongTopics[0];

  if (input.certificateEligible) {
    return {
      message:
        "You’ve completed your 30 study hours — that’s a big milestone. Grab your certificate, then start planning your DMV visit.",
      actionLabel: "View certificate",
      actionHref: "/journey/certificate",
      browseLabel: "Browse Study by Topic",
      browseHref: "/topics",
    };
  }

  if (input.lessonsCompleted === 0 && input.questionsAnswered === 0) {
    return {
      message:
        "You’re just getting started. Open Study by Topic and work through Road Signs first — it builds a strong base for everything else.",
      actionLabel: "Open Study by Topic",
      actionHref: "/topics",
      browseLabel: "Start Series 1",
      browseHref: "/series/1",
    };
  }

  if (focus?.score !== null && focus.score < 70) {
    const second = input.weakTopics[1];
    const strengthNote = strength?.score
      ? ` You’re already doing well in ${strength.title} (${strength.score}%).`
      : "";
    const secondNote =
      second?.score !== null
        ? ` After that, spend a few minutes on ${second.title} (${second.score}%).`
        : "";

    return {
      message: `Start in Study by Topic with ${focus.title} — you’re at ${focus.score}% and that’s your biggest gap.${secondNote}${strengthNote} Then pick up Series ${nextSeries} when you’re ready.`,
      actionLabel: `Study ${focus.title}`,
      actionHref: `/topics/${focus.slug}`,
      browseLabel: "Browse all topics",
      browseHref: "/topics",
    };
  }

  if (input.hoursRemaining > 0) {
    return {
      message: `You’re ${input.percentage}% toward your 30-hour goal with ${input.hoursRemaining} hours left. Continue Series ${nextSeries} for structured progress, or jump into Study by Topic if you want to sharpen a specific area first.`,
      actionLabel: `Continue Series ${nextSeries}`,
      actionHref: `/series/${nextSeries}`,
      browseLabel: "Study by Topic",
      browseHref: "/topics",
    };
  }

  return {
    message:
      "Your topic scores look solid overall. Keep mixing series lessons with targeted topic reviews in Study by Topic so nothing slips before test day.",
    actionLabel: "Study by Topic",
    actionHref: "/topics",
    browseLabel: "Browse series",
    browseHref: "/series",
  };
}
