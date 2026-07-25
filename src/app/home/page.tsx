"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { getDriveInstructor } from "@/lib/drive/config";
import {
  GET_STARTED_STORAGE_KEY,
  parseGetStartedState,
  type SavedGetStartedState,
} from "@/lib/get-started-storage";
import type { SafeUser } from "@/types/auth";

interface HubData {
  studyTime: {
    hoursStudied: number;
    requiredHours: number;
    percentage: number;
    requirementMet?: boolean;
  };
  progress: {
    seriesCompleted: number;
    totalSeries: number;
    lessonsCompleted: number;
  };
  nextSeries: { number: number; title: string } | null;
  certificateEligible?: boolean;
}

interface TopicScore {
  slug: string;
  title: string;
  score: number | null;
  totalAnswered: number;
}

interface DetailedProgress {
  studyProgress: {
    hoursStudied: number;
    requiredHours: number;
    percentage: number;
    requirementMet: boolean;
    lessonsCompleted: number;
    totalLessons: number;
    seriesCompleted: number;
    totalSeries: number;
    examsCompleted: number;
    questionsAnswered: number;
  };
  performance: {
    strongTopics: TopicScore[];
    weakTopics: TopicScore[];
  };
  certificateEligible: boolean;
}

interface DriveSetup {
  address: string;
  instructorId: string;
}

interface DashboardData {
  hub: HubData;
  progress: DetailedProgress;
  user: SafeUser;
  driveSetup: DriveSetup | null;
}

type HomeRecommendation = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  label: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  fromOnboarding?: boolean;
};

type JourneyPhase = {
  label: string;
  state: "complete" | "active" | "upcoming";
};

async function getJson<T>(url: string, timeoutMs = 10000): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Request failed: ${url}`);
    return response.json() as Promise<T>;
  } finally {
    window.clearTimeout(timeout);
  }
}

function progressFromHub(hub: HubData): DetailedProgress {
  return {
    studyProgress: {
      hoursStudied: hub.studyTime.hoursStudied,
      requiredHours: hub.studyTime.requiredHours,
      percentage: hub.studyTime.percentage,
      requirementMet: Boolean(hub.studyTime.requirementMet),
      lessonsCompleted: hub.progress.lessonsCompleted,
      totalLessons: 0,
      seriesCompleted: hub.progress.seriesCompleted,
      totalSeries: hub.progress.totalSeries,
      examsCompleted: 0,
      questionsAnswered: 0,
    },
    performance: {
      strongTopics: [],
      weakTopics: [],
    },
    certificateEligible: Boolean(hub.certificateEligible),
  };
}

function hasRealProgress(progress: DetailedProgress) {
  const data = progress.studyProgress;
  return (
    data.hoursStudied > 0 ||
    data.lessonsCompleted > 0 ||
    data.seriesCompleted > 0 ||
    data.questionsAnswered > 0 ||
    data.examsCompleted > 0
  );
}

function getOnboardingRecommendation(
  onboarding: SavedGetStartedState
): HomeRecommendation {
  const { need, stage } = onboarding;

  if (need === "lessons-only" || need === "required-training" || need === "refresher") {
    const refresher = need === "refresher" || stage === "licensed-refresher";
    return {
      eyebrow: "Based on your Get Started answers",
      title: refresher ? "Find refresher lessons" : "Compare driving lessons near you",
      description: refresher
        ? "Review sample profiles, vehicles, prices, and example times for confidence-building practice."
        : "Compare sample instructor, school, vehicle, pricing, and availability details.",
      href: "/drive",
      label: "Find Driving Lessons",
      secondaryHref: "/journey",
      secondaryLabel: "View Journey",
      fromOnboarding: true,
    };
  }

  if (
    need === "road-test" ||
    stage === "road-test-prep" ||
    stage === "road-test-vehicle"
  ) {
    return {
      eyebrow: "Based on your Get Started answers",
      title: "Prepare for your road test",
      description:
        "Use focused practice and compare behind-the-wheel lesson options for the skills you want to strengthen.",
      href: "/drive",
      label: "Find Road-Test Lessons",
      secondaryHref: "/journey",
      secondaryLabel: "View Journey",
      fromOnboarding: true,
    };
  }

  if (
    stage === "ed-certificate" ||
    stage === "permit-study"
  ) {
    return {
      eyebrow: "Based on your Get Started answers",
      title: "Prepare for your learner’s permit",
      description:
        "Practice California permit questions and review explanations before your knowledge test.",
      href: "/qna",
      label: "Practice Questions",
      secondaryHref: "/topics",
      secondaryLabel: "Study by Topic",
      fromOnboarding: true,
    };
  }

  if (
    stage === "learner-permit" ||
    stage === "required-six-hours" ||
    stage === "learning-drive"
  ) {
    return {
      eyebrow: "Based on your Get Started answers",
      title:
        need === "teen-full"
          ? "Find required behind-the-wheel training"
          : "Build behind-the-wheel experience",
      description:
        "Compare sample instructor profiles, lesson options, service areas, and example times.",
      href: "/drive",
      label: "Find Driving Lessons",
      secondaryHref: "/journey",
      secondaryLabel: "View Journey",
      fromOnboarding: true,
    };
  }

  if (stage === "driving-practice") {
    return {
      eyebrow: "Based on your Get Started answers",
      title: "Continue your driving practice",
      description:
        "Review the full journey, then use lessons when you want professional help with specific skills.",
      href: "/journey",
      label: "View Your Journey",
      secondaryHref: "/drive",
      secondaryLabel: "Find Lessons",
      fromOnboarding: true,
    };
  }

  return {
    eyebrow: "Based on your Get Started answers",
    title:
      stage === "completing-ed"
        ? "Continue California Driver’s Ed"
        : "Start with California Driver’s Ed",
    description:
      "Begin the structured course and build the knowledge you need for the permit stage.",
    href: "/learn",
    label: stage === "completing-ed" ? "Continue Learning" : "Start Course",
    secondaryHref: "/journey",
    secondaryLabel: "View Journey",
    fromOnboarding: true,
  };
}

function getRecommendation(
  data: DashboardData,
  onboarding: SavedGetStartedState | null
): HomeRecommendation {
  if (data.progress.certificateEligible || data.hub.certificateEligible) {
    return {
      eyebrow: "Your next step",
      title: "Review your certificate preview",
      description:
        "Your tracked study-time requirement is complete. Review the current preview and its completion notice.",
      href: "/journey/certificate",
      label: "View Preview",
      secondaryHref: "/journey",
      secondaryLabel: "View Journey",
    };
  }

  if (hasRealProgress(data.progress)) {
    if (data.hub.nextSeries) {
      return {
        eyebrow: "Continue where you left off",
        title: `Continue Series ${data.hub.nextSeries.number}`,
        description: data.hub.nextSeries.title,
        href: `/series/${data.hub.nextSeries.number}`,
        label: "Continue Learning",
        secondaryHref: "/progress",
        secondaryLabel: "View Progress",
      };
    }

    return {
      eyebrow: "Keep building readiness",
      title: "Continue permit practice",
      description:
        "Use practice questions and topic review to reinforce what you have learned.",
      href: "/qna",
      label: "Practice Questions",
      secondaryHref: "/progress",
      secondaryLabel: "View Progress",
    };
  }

  if (onboarding) return getOnboardingRecommendation(onboarding);

  return {
    eyebrow: "Your next step",
    title: "Choose your next step",
    description:
      "Tell us where you are in your driving journey, and we’ll point you to the right place.",
    href: "/get-started",
    label: "Set up my path",
  };
}

function getJourneyPhases(
  onboarding: SavedGetStartedState | null,
  data: DashboardData
): {
  title: string;
  description: string;
  phases: JourneyPhase[];
  setupRequired?: boolean;
} {
  const progress = data.progress;

  if (!onboarding && !hasRealProgress(progress) && !data.driveSetup) {
    return {
      title: "Your driving path",
      description:
        "Set up your path to see steps based on your age, current stage, and driving goals.",
      phases: [],
      setupRequired: true,
    };
  }

  if (data.driveSetup && !onboarding && !hasRealProgress(progress)) {
    return {
      title: "Your driving plan",
      description: "A flexible lesson path based on your selected driving setup.",
      phases: [
        { label: "Choose Lesson", state: "complete" },
        { label: "Meet Instructor", state: "active" },
        { label: "Build Skills", state: "upcoming" },
        { label: "Test or Goal", state: "upcoming" },
        { label: "Keep Improving", state: "upcoming" },
      ],
    };
  }

  if (
    onboarding?.need === "lessons-only" ||
    onboarding?.need === "required-training" ||
    onboarding?.need === "refresher" ||
    onboarding?.need === "road-test"
  ) {
    return {
      title: "Your driving plan",
      description: "A flexible lesson path based on the goal you selected.",
      phases: [
        { label: "Choose Lesson", state: "active" },
        { label: "Meet Instructor", state: "upcoming" },
        { label: "Build Skills", state: "upcoming" },
        { label: "Test or Goal", state: "upcoming" },
        { label: "Keep Improving", state: "upcoming" },
      ],
    };
  }

  if (onboarding?.need === "adult-first") {
    return {
      title: "Your first-license journey",
      description: "Driver’s Ed is not presented as a mandatory adult step.",
      phases: [
        { label: "Permit Prep", state: "active" },
        { label: "Permit", state: "upcoming" },
        { label: "Driving Practice", state: "upcoming" },
        { label: "Road Test", state: "upcoming" },
        { label: "Licensed", state: "upcoming" },
      ],
    };
  }

  const educationComplete = progress.certificateEligible;
  const educationActive =
    progress.studyProgress.hoursStudied > 0 ||
    progress.studyProgress.lessonsCompleted > 0;

  return {
    title: "Your license journey",
    description: "A high-level view of the major stages ahead.",
    phases: [
      {
        label: "Driver’s Ed",
        state: educationComplete ? "complete" : educationActive ? "active" : "active",
      },
      { label: "Permit", state: educationComplete ? "active" : "upcoming" },
      { label: "Driving Practice", state: "upcoming" },
      { label: "Road Test", state: "upcoming" },
      { label: "Licensed", state: "upcoming" },
    ],
  };
}

function StudentHomeContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<DashboardData | null>(null);
  const [onboarding, setOnboarding] = useState<SavedGetStartedState | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    setOnboarding(
      parseGetStartedState(
        window.localStorage.getItem(GET_STARTED_STORAGE_KEY)
      )
    );

    Promise.all([
      getJson<{ hub?: HubData }>("/api/home"),
      getJson<{ user?: SafeUser }>("/api/auth/me"),
    ])
      .then(async ([homeResponse, meResponse]) => {
        if (!homeResponse.hub || !meResponse.user) throw new Error("Missing dashboard data");
        if (!active) return;

        const initialData: DashboardData = {
          hub: homeResponse.hub,
          progress: progressFromHub(homeResponse.hub),
          user: meResponse.user,
          driveSetup: null,
        };
        setData(initialData);

        const [progressResult, driveResult] = await Promise.allSettled([
          getJson<DetailedProgress>("/api/progress/detailed", 6000),
          getJson<{ setup?: DriveSetup | null }>("/api/drive/setup", 6000),
        ]);

        if (!active) return;
        setData((current) =>
          current
            ? {
                ...current,
                progress:
                  progressResult.status === "fulfilled"
                    ? progressResult.value
                    : current.progress,
                driveSetup:
                  driveResult.status === "fulfilled"
                    ? driveResult.value.setup ?? null
                    : current.driveSetup,
              }
            : current
        );
      })
      .catch(() => {
        if (active) setError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const recommendation = useMemo(
    () => (data ? getRecommendation(data, onboarding) : null),
    [data, onboarding]
  );

  const journey = useMemo(
    () => (data ? getJourneyPhases(onboarding, data) : null),
    [data, onboarding]
  );

  if (error) {
    return (
      <main className="student-home">
        <section className="student-home-error">
          <h1>We couldn&apos;t load your dashboard</h1>
          <p>Your account is safe. Refresh the page to try again.</p>
          <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </section>
      </main>
    );
  }

  if (!data || !recommendation || !journey) {
    return (
      <main className="student-home" aria-busy="true">
        <div className="student-home-loading">
          <p>Loading your next step…</p>
        </div>
      </main>
    );
  }

  const progress = data.progress.studyProgress;
  const realProgress = hasRealProgress(data.progress);
  const selectedInstructor = data.driveSetup
    ? getDriveInstructor(data.driveSetup.instructorId)
    : null;
  const weakTopic = data.progress.performance.weakTopics.find(
    (topic) => topic.score !== null
  );
  const showWelcome = searchParams.get("welcome") === "1";

  return (
    <main className="student-home">
      <header className="student-home__header">
        <div>
          <p className="student-home__eyebrow">
            {showWelcome ? "Your account is ready" : "Student home"}
          </p>
          <h1>
            {showWelcome ? "Welcome" : "Good to see you"}
            {data.user.firstName ? `, ${data.user.firstName}` : ""}
          </h1>
          <p>
            {progress.hoursStudied > 0
              ? `${progress.hoursStudied} of ${progress.requiredHours} study hours tracked`
              : "Your most useful next action is ready below."}
          </p>
        </div>
        <Link href="/profile" className="student-home__account">
          <span aria-hidden="true">
            {data.user.firstName?.charAt(0)}
            {data.user.lastName?.charAt(0)}
          </span>
          <span>Account</span>
        </Link>
      </header>

      {showWelcome && recommendation.fromOnboarding && !realProgress ? (
        <div className="student-home__guidance">
          <strong>Your Get Started answers were remembered on this device.</strong>
          <span>This recommendation is guidance and is not verified eligibility information.</span>
        </div>
      ) : null}

      <section className="student-next-step" aria-labelledby="next-step-title">
        <div className="student-next-step__copy">
          <p>{recommendation.eyebrow}</p>
          <h2 id="next-step-title">{recommendation.title}</h2>
          <span>{recommendation.description}</span>
        </div>
        {realProgress && progress.requiredHours > 0 ? (
          <div className="student-next-step__progress">
            <div>
              <span>Tracked Driver&apos;s Ed study</span>
              <strong>{progress.percentage}%</strong>
            </div>
            <span><i style={{ width: `${progress.percentage}%` }} /></span>
          </div>
        ) : null}
        <div className="student-next-step__actions">
          <Link href={recommendation.href} className="student-home-button">
            {recommendation.label} <span aria-hidden="true">→</span>
          </Link>
          {recommendation.secondaryHref && recommendation.secondaryLabel ? (
            <Link href={recommendation.secondaryHref}>
              {recommendation.secondaryLabel}
            </Link>
          ) : null}
        </div>
      </section>

      <section className="student-home-grid">
        <article className="student-dashboard-card student-dashboard-card--journey">
          <div className="student-card-heading">
            <div>
              <p>Journey snapshot</p>
              <h2>{journey.title}</h2>
              <span>{journey.description}</span>
            </div>
            <Link href={journey.setupRequired ? "/get-started" : "/journey"}>
              {journey.setupRequired ? "Set up my path" : "View Full Journey"}
            </Link>
          </div>
          {journey.setupRequired ? (
            <div className="student-journey-setup">
              <p>Your steps will appear here after you choose a path.</p>
              <Link href="/get-started" className="student-home-button">
                Set up my path <span aria-hidden="true">→</span>
              </Link>
            </div>
          ) : (
            <ol className="student-journey-phases">
              {journey.phases.map((phase, index) => (
                <li className={`is-${phase.state}`} key={phase.label}>
                  <span>{phase.state === "complete" ? "✓" : index + 1}</span>
                  <strong>{phase.label}</strong>
                </li>
              ))}
            </ol>
          )}
        </article>

        <article className="student-dashboard-card student-learning-card">
          <div className="student-card-heading">
            <div>
              <p>Learning</p>
              <h2>
                {data.hub.nextSeries
                  ? `Series ${data.hub.nextSeries.number}: ${data.hub.nextSeries.title}`
                  : "California Driver’s Ed"}
              </h2>
            </div>
            <Link
              href={
                data.hub.nextSeries && realProgress
                  ? `/series/${data.hub.nextSeries.number}`
                  : "/learn"
              }
            >
              {realProgress ? "Continue Learning" : "Start Course"}
            </Link>
          </div>
          <div className="student-learning-card__stats">
            <div>
              <strong>{progress.seriesCompleted}/{progress.totalSeries}</strong>
              <span>Series complete</span>
            </div>
            <div>
              <strong>{progress.hoursStudied}h</strong>
              <span>Study time</span>
            </div>
            <div>
              <strong>{progress.questionsAnswered}</strong>
              <span>Questions answered</span>
            </div>
          </div>
          <div className="student-card-links">
            <Link href="/qna">Practice Questions</Link>
            <Link href="/topics">Study by Topic</Link>
            {weakTopic ? (
              <Link href={`/topics/${weakTopic.slug}`}>Review {weakTopic.title}</Link>
            ) : null}
          </div>
        </article>

        <article className="student-dashboard-card student-driving-card">
          <div className="student-card-heading">
            <div>
              <p>Driving</p>
              <h2>{selectedInstructor ? "Your selected sample instructor" : "Behind-the-wheel lessons"}</h2>
            </div>
            <Link href="/drive">{selectedInstructor ? "View Driving Setup" : "Find Lessons"}</Link>
          </div>
          {selectedInstructor && data.driveSetup ? (
            <div className="student-driving-card__instructor">
              <span aria-hidden="true">
                {selectedInstructor.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div>
                <strong>{selectedInstructor.name}</strong>
                <p>{selectedInstructor.drivingSchoolName}</p>
                <small>
                  {selectedInstructor.vehicle} · {selectedInstructor.transmission}
                </small>
              </div>
            </div>
          ) : (
            <p className="student-driving-card__empty">
              {onboarding?.need === "refresher"
                ? "Compare refresher lessons for confidence and specific skills."
                : onboarding?.need === "road-test"
                  ? "Compare lessons focused on road-test preparation."
                  : "Compare sample profiles, lesson prices, vehicles, service areas, and example availability."}
            </p>
          )}
          {data.driveSetup ? (
            <p className="student-driving-card__location">
              <span aria-hidden="true">⌖</span> Pickup area: {data.driveSetup.address}
            </p>
          ) : null}
        </article>

        <article className="student-dashboard-card student-dashboard-card--practice student-practice-card">
          <div className="student-card-heading">
            <div>
              <p>Quick practice</p>
              <h2>Build confidence in a few minutes</h2>
            </div>
          </div>
          <div className="student-practice-actions">
            <Link href="/qna"><span>?</span><strong>Practice Questions</strong><small>Instant explanations</small></Link>
            <Link href="/topics"><span>◎</span><strong>Study by Topic</strong><small>Choose a focus area</small></Link>
            {weakTopic ? (
              <Link href={`/topics/${weakTopic.slug}`}><span>↻</span><strong>Review Weak Topic</strong><small>{weakTopic.title}</small></Link>
            ) : (
              <Link href="/practice"><span>✓</span><strong>Practice Exams</strong><small>Timed exam sets</small></Link>
            )}
            <Link href="/progress"><span>↗</span><strong>View Progress</strong><small>Study and performance</small></Link>
          </div>
        </article>
      </section>

      <section className="student-progress-summary" aria-labelledby="progress-summary-title">
        <div>
          <p>Progress summary</p>
          <h2 id="progress-summary-title">Your recorded learning activity</h2>
        </div>
        <dl>
          <div><dt>Course lessons</dt><dd>{progress.lessonsCompleted}/{progress.totalLessons}</dd></div>
          <div><dt>Study time</dt><dd>{progress.hoursStudied}/{progress.requiredHours}h</dd></div>
          <div><dt>Practice exams</dt><dd>{progress.examsCompleted}</dd></div>
          <div>
            <dt>Certificate</dt>
            <dd>{data.progress.certificateEligible ? "Preview available" : "Preview not yet available"}</dd>
          </div>
        </dl>
        {weakTopic ? (
          <p>
            Current review area: <Link href={`/topics/${weakTopic.slug}`}>{weakTopic.title}</Link>
            {weakTopic.score !== null ? ` (${weakTopic.score}%)` : ""}
          </p>
        ) : (
          <p>Complete practice questions to begin building topic-level performance insights.</p>
        )}
      </section>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main className="student-home" aria-busy="true">
          <div className="student-home-loading"><span /><span /><span /></div>
        </main>
      }
    >
      <StudentHomeContent />
    </Suspense>
  );
}
