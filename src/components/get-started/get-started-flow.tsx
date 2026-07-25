"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FormEvent,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { UserRole } from "@prisma/client";
import { GET_STARTED_STORAGE_KEY } from "@/lib/get-started-storage";

type LandingPath = "teen" | "adult" | "lessons";
type Helping = "self" | "teenager";
type Need =
  | "teen-full"
  | "adult-first"
  | "required-training"
  | "road-test"
  | "lessons-only"
  | "refresher";
type TeenStage =
  | "not-started-ed"
  | "completing-ed"
  | "ed-certificate"
  | "learner-permit"
  | "driving-practice"
  | "road-test-prep"
  | "provisional-license";
type AdultStage =
  | "permit-study"
  | "learner-permit"
  | "learning-drive"
  | "road-test-prep";
type LessonStage =
  | "required-six-hours"
  | "general-practice"
  | "road-test-prep"
  | "road-test-vehicle"
  | "licensed-refresher";
type CurrentStage = TeenStage | AdultStage | LessonStage;
type AgeGroup = "under-15-half" | "15-half-17-half" | "17-half-18" | "18-plus";

interface Answers {
  helping: Helping | null;
  need: Need | null;
  stage: CurrentStage | null;
  ageGroup: AgeGroup | null;
}

interface GetStartedFlowProps {
  signedIn: boolean;
  role: UserRole | null;
}

const MAX_STEP = 5;

const HELPING_OPTIONS: { value: Helping; title: string; description: string }[] = [
  {
    value: "self",
    title: "Myself",
    description: "I’m planning my own license journey or driving lessons.",
  },
  {
    value: "teenager",
    title: "My teenager",
    description: "I’m helping a teen understand and organize their next steps.",
  },
];

const NEED_OPTIONS: Record<
  Helping,
  { value: Need; title: string; description: string }[]
> = {
  self: [
    {
      value: "teen-full",
      title: "Complete the full under-18 license journey",
      description: "Driver’s Ed, permit, professional training, practice, and road test.",
    },
    {
      value: "adult-first",
      title: "Get my first license as an adult",
      description: "Permit preparation, optional lessons, practice, and road-test readiness.",
    },
    {
      value: "required-training",
      title: "Find required behind-the-wheel training",
      description: "Compare professional lesson options and availability.",
    },
    {
      value: "road-test",
      title: "Prepare for the DMV road test",
      description: "Build the skills and confidence needed for test day.",
    },
    {
      value: "lessons-only",
      title: "Book driving lessons only",
      description: "Go directly to available behind-the-wheel instruction.",
    },
    {
      value: "refresher",
      title: "Take refresher or confidence lessons",
      description: "Practice specific skills or get comfortable behind the wheel again.",
    },
  ],
  teenager: [
    {
      value: "teen-full",
      title: "Complete the full under-18 license journey",
      description: "Driver’s Ed, permit, professional training, practice, and road test.",
    },
    {
      value: "required-training",
      title: "Find required behind-the-wheel training",
      description: "Compare professional lesson options and availability.",
    },
    {
      value: "road-test",
      title: "Prepare for the DMV road test",
      description: "Focus on readiness for the teen’s behind-the-wheel test.",
    },
    {
      value: "lessons-only",
      title: "Book driving lessons only",
      description: "Find instruction without changing where Driver’s Ed was completed.",
    },
  ],
};

const TEEN_STAGES: { value: TeenStage; title: string }[] = [
  { value: "not-started-ed", title: "I have not started Driver’s Ed" },
  { value: "completing-ed", title: "I am completing Driver’s Ed" },
  { value: "ed-certificate", title: "I have my Driver’s Ed certificate" },
  { value: "learner-permit", title: "I have my learner’s permit" },
  { value: "driving-practice", title: "I am completing driving practice" },
  { value: "road-test-prep", title: "I am preparing for my road test" },
  { value: "provisional-license", title: "I already have a provisional license" },
];

const ADULT_STAGES: { value: AdultStage; title: string }[] = [
  { value: "permit-study", title: "I am studying for the permit test" },
  { value: "learner-permit", title: "I have my learner’s permit" },
  { value: "learning-drive", title: "I am learning to drive" },
  { value: "road-test-prep", title: "I am preparing for my road test" },
];

const LESSON_STAGES: { value: LessonStage; title: string }[] = [
  { value: "required-six-hours", title: "I need the required six professional hours" },
  { value: "general-practice", title: "I want general driving practice" },
  { value: "road-test-prep", title: "I want road-test preparation" },
  { value: "road-test-vehicle", title: "I need a vehicle for my road test" },
  { value: "licensed-refresher", title: "I am a licensed driver seeking refresher lessons" },
];

const AGE_OPTIONS: { value: AgeGroup; title: string }[] = [
  { value: "under-15-half", title: "Under 15½" },
  { value: "15-half-17-half", title: "15½ to under 17½" },
  { value: "17-half-18", title: "17½ to under 18" },
  { value: "18-plus", title: "18 or older" },
];

const NEED_LABELS: Record<Need, string> = {
  "teen-full": "Teen first-time driver",
  "adult-first": "Adult first-time driver",
  "required-training": "Required behind-the-wheel training",
  "road-test": "Road-test preparation",
  "lessons-only": "Driving lessons only",
  refresher: "Refresher or confidence lessons",
};

const STAGE_LABELS: Record<CurrentStage, string> = {
  "not-started-ed": "Driver’s Ed not started",
  "completing-ed": "Completing Driver’s Ed",
  "ed-certificate": "Driver’s Ed certificate earned",
  "learner-permit": "Learner’s permit earned",
  "driving-practice": "Completing driving practice",
  "road-test-prep": "Preparing for the road test",
  "provisional-license": "Provisional license earned",
  "permit-study": "Studying for the permit test",
  "learning-drive": "Learning to drive",
  "required-six-hours": "Required professional hours needed",
  "general-practice": "General driving practice",
  "road-test-vehicle": "Road-test vehicle needed",
  "licensed-refresher": "Licensed driver seeking a refresher",
};

const AGE_LABELS: Record<AgeGroup, string> = Object.fromEntries(
  AGE_OPTIONS.map((option) => [option.value, option.title])
) as Record<AgeGroup, string>;

function isLandingPath(value: string | null): value is LandingPath {
  return value === "teen" || value === "adult" || value === "lessons";
}

function getPathFromNeed(need: Need | null): LandingPath | null {
  if (need === "teen-full") return "teen";
  if (need === "adult-first") return "adult";
  if (need) return "lessons";
  return null;
}

function isStageForNeed(stage: CurrentStage | null, need: Need | null) {
  if (!stage || !need) return false;
  const values =
    need === "teen-full"
      ? TEEN_STAGES
      : need === "adult-first"
        ? ADULT_STAGES
        : LESSON_STAGES;
  return values.some((option) => option.value === stage);
}

function answersFromPath(path: LandingPath | null): Answers {
  if (path === "teen") {
    return { helping: null, need: "teen-full", stage: null, ageGroup: null };
  }
  if (path === "adult") {
    return { helping: "self", need: "adult-first", stage: null, ageGroup: null };
  }
  if (path === "lessons") {
    return { helping: null, need: "lessons-only", stage: null, ageGroup: null };
  }
  return { helping: null, need: null, stage: null, ageGroup: null };
}

function getRecommendation(answers: Answers) {
  const stage = answers.stage;

  if (stage === "not-started-ed") {
    return {
      title: "Start with California Driver’s Ed",
      explanation:
        "Begin the structured course and permit-preparation material. After Driver’s Ed, the journey continues with the certificate and permit milestones.",
    };
  }
  if (stage === "completing-ed") {
    return {
      title: "Continue California Driver’s Ed",
      explanation:
        "Pick up your course progress and strengthen permit-test knowledge. Your certificate and learner’s permit are the next major milestones.",
    };
  }
  if (stage === "ed-certificate" || stage === "permit-study") {
    return {
      title: "Prepare for your learner’s permit",
      explanation:
        "Focus on California road rules and permit-style questions. Behind-the-wheel learning follows after the applicable permit requirements.",
    };
  }
  if (stage === "learner-permit" && answers.need === "teen-full") {
    return {
      title: "Book your first permit-validation lesson",
      explanation:
        "Begin the professional training stage, then continue building experience through supervised practice.",
    };
  }
  if (stage === "required-six-hours") {
    return {
      title: "Complete your required professional training",
      explanation:
        "Compare available instructors and lesson options. Supervised practice and road-test preparation follow.",
    };
  }
  if (stage === "driving-practice") {
    return {
      title: "Continue supervised practice",
      explanation:
        "Keep building consistent driving experience, including varied conditions, before moving into focused road-test preparation.",
    };
  }
  if (stage === "road-test-prep" || stage === "road-test-vehicle") {
    return {
      title: "Prepare for your DMV road test",
      explanation:
        "Compare lessons focused on test readiness and review the skills you want to strengthen before scheduling.",
    };
  }
  if (stage === "provisional-license" || stage === "licensed-refresher") {
    return {
      title: "Compare refresher lessons near you",
      explanation:
        "Choose instruction for confidence, specific skills, or additional practice without restarting the full Driver’s Ed journey.",
    };
  }
  if (answers.need === "adult-first" && stage === "learning-drive") {
    return {
      title: "Build behind-the-wheel experience",
      explanation:
        "Compare professional lessons, practice core skills, and move toward focused road-test preparation when ready.",
    };
  }
  return {
    title: "Compare driving lessons near you",
    explanation:
      "Review instructor, school, vehicle, pricing, service-area, and availability details, then choose the lesson that fits your goal.",
  };
}

function getMaxReachableStep(answers: Answers) {
  if (!answers.helping) return 1;
  if (!answers.need) return 2;
  if (!isStageForNeed(answers.stage, answers.need)) return 3;
  if (!answers.ageGroup) return 4;
  return 5;
}

function GetStartedContent({ signedIn, role }: GetStartedFlowProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryPath = searchParams.get("path");
  const requestedPath = isLandingPath(queryPath) ? queryPath : null;
  const requestedStep = Number.parseInt(searchParams.get("step") ?? "1", 10);
  const initialStep =
    Number.isFinite(requestedStep) && requestedStep >= 1 && requestedStep <= MAX_STEP
      ? requestedStep
      : 1;

  const [step, setStep] = useState(initialStep);
  const [answers, setAnswers] = useState<Answers>(() => answersFromPath(requestedPath));
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(GET_STARTED_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Answers>;
        setAnswers((current) => ({
          helping:
            parsed.helping === "self" || parsed.helping === "teenager"
              ? parsed.helping
              : current.helping,
          need:
            typeof parsed.need === "string" && parsed.need in NEED_LABELS
              ? (parsed.need as Need)
              : current.need,
          stage:
            typeof parsed.stage === "string" && parsed.stage in STAGE_LABELS
              ? (parsed.stage as CurrentStage)
              : current.stage,
          ageGroup:
            typeof parsed.ageGroup === "string" && parsed.ageGroup in AGE_LABELS
              ? (parsed.ageGroup as AgeGroup)
              : current.ageGroup,
        }));
      }
    } catch {
      window.localStorage.removeItem(GET_STARTED_STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(GET_STARTED_STORAGE_KEY, JSON.stringify(answers));
  }, [answers, hydrated]);

  useEffect(() => {
    if (!hydrated || !requestedPath) return;
    setAnswers((current) => {
      const pathAnswers = answersFromPath(requestedPath);
      if (getPathFromNeed(current.need) === requestedPath) return current;
      return pathAnswers;
    });
  }, [hydrated, requestedPath]);

  useEffect(() => {
    if (!hydrated) return;

    const safeStep = Math.min(initialStep, getMaxReachableStep(answers));
    setStep(safeStep);

    if (safeStep !== initialStep) {
      const params = new URLSearchParams();
      const selectedPath = getPathFromNeed(answers.need) ?? requestedPath;
      if (selectedPath) params.set("path", selectedPath);
      params.set("step", String(safeStep));
      router.replace(`/get-started?${params.toString()}`, { scroll: false });
    }
  }, [answers, hydrated, initialStep, requestedPath, router]);

  const stageOptions = useMemo(() => {
    if (answers.need === "teen-full") return TEEN_STAGES;
    if (answers.need === "adult-first") return ADULT_STAGES;
    return LESSON_STAGES;
  }, [answers.need]);

  const destination = getPathFromNeed(answers.need) === "lessons" ? "/drive" : "/journey";
  const recommendation = getRecommendation(answers);

  function updateUrl(nextStep: number, method: "push" | "replace" = "push") {
    const params = new URLSearchParams();
    const selectedPath = getPathFromNeed(answers.need) ?? requestedPath;
    if (selectedPath) params.set("path", selectedPath);
    params.set("step", String(nextStep));
    const href = `/get-started?${params.toString()}`;
    if (method === "replace") router.replace(href, { scroll: false });
    else router.push(href, { scroll: false });
  }

  function select<K extends keyof Answers>(key: K, value: Answers[K]) {
    setError(null);
    setAnswers((current) => {
      const next = { ...current, [key]: value };

      if (key === "helping" && value === "teenager" && current.need === "adult-first") {
        next.need = null;
        next.stage = null;
      }
      if (key === "need" && value !== current.need) {
        next.stage = null;
      }

      return next;
    });
  }

  function canContinue() {
    if (step === 1) return Boolean(answers.helping);
    if (step === 2) return Boolean(answers.need);
    if (step === 3) return isStageForNeed(answers.stage, answers.need);
    if (step === 4) return Boolean(answers.ageGroup);
    return true;
  }

  function continueFlow(event: FormEvent) {
    event.preventDefault();
    if (!canContinue()) {
      setError("Choose an option to continue.");
      return;
    }
    const nextStep = Math.min(step + 1, MAX_STEP);
    setStep(nextStep);
    updateUrl(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    if (step === 1) {
      router.push("/");
      return;
    }
    const previousStep = step - 1;
    setStep(previousStep);
    updateUrl(previousStep);
    setError(null);
  }

  function continueAfterRecommendation() {
    if (signedIn) {
      window.location.href = role === "ADMIN" ? "/admin" : destination;
      return;
    }
    window.location.href = `/register?redirect=${encodeURIComponent(destination)}`;
  }

  const signInHref = `/login?redirect=${encodeURIComponent(destination)}`;
  const progress = (step / MAX_STEP) * 100;

  return (
    <main className="get-started-page">
      <header className="get-started-header">
        <Link href="/" className="public-logo" aria-label="DMV Study home">
          <span className="public-logo__mark" aria-hidden="true"><span /></span>
          <span>DMV Study</span>
        </Link>
        {!signedIn ? <Link href={signInHref}>Sign in</Link> : null}
      </header>

      <div className="get-started-shell">
        <div className="get-started-progress" aria-label={`Step ${step} of ${MAX_STEP}`}>
          <div>
            <span>Step {step} of {MAX_STEP}</span>
            <span>{step === MAX_STEP ? "Your recommendation" : "A few quick questions"}</span>
          </div>
          <span className="get-started-progress__track">
            <span style={{ width: `${progress}%` }} />
          </span>
        </div>

        <button type="button" className="get-started-back" onClick={goBack}>
          <span aria-hidden="true">←</span> {step === 1 ? "Back to home" : "Back"}
        </button>

        <form className="get-started-card" onSubmit={continueFlow}>
          {step === 1 ? (
            <fieldset>
              <legend>Who are you helping?</legend>
              <p>We’ll use this to keep the guidance relevant.</p>
              <div className="get-started-options get-started-options--two">
                {HELPING_OPTIONS.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    name="helping"
                    checked={answers.helping === option.value}
                    onChange={() => select("helping", option.value)}
                    title={option.title}
                    description={option.description}
                  />
                ))}
              </div>
            </fieldset>
          ) : null}

          {step === 2 ? (
            <fieldset>
              <legend>What do you need?</legend>
              <p>Choose the goal that best matches where you want to go.</p>
              <div className="get-started-options">
                {(answers.helping ? NEED_OPTIONS[answers.helping] : NEED_OPTIONS.self).map(
                  (option) => (
                    <ChoiceCard
                      key={option.value}
                      name="need"
                      checked={answers.need === option.value}
                      onChange={() => select("need", option.value)}
                      title={option.title}
                      description={option.description}
                    />
                  )
                )}
              </div>
            </fieldset>
          ) : null}

          {step === 3 ? (
            <fieldset>
              <legend>Where are you now?</legend>
              <p>Choose the closest match. You can adjust this later.</p>
              <div className="get-started-options">
                {stageOptions.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    name="stage"
                    checked={answers.stage === option.value}
                    onChange={() => select("stage", option.value)}
                    title={option.title}
                  />
                ))}
              </div>
            </fieldset>
          ) : null}

          {step === 4 ? (
            <fieldset>
              <legend>
                {answers.helping === "teenager" ? "What is the learner’s age group?" : "What is your age group?"}
              </legend>
              <p>We only need a general range for this entry recommendation.</p>
              <div className="get-started-options get-started-options--two">
                {AGE_OPTIONS.map((option) => (
                  <ChoiceCard
                    key={option.value}
                    name="age"
                    checked={answers.ageGroup === option.value}
                    onChange={() => select("ageGroup", option.value)}
                    title={option.title}
                  />
                ))}
              </div>
            </fieldset>
          ) : null}

          {step === 5 ? (
            <section className="get-started-result" aria-labelledby="recommendation-title">
              <p className="public-eyebrow">Recommended starting point</p>
              <h1 id="recommendation-title">{recommendation.title}</h1>
              <p className="get-started-result__lead">{recommendation.explanation}</p>
              <dl>
                <div><dt>Selected path</dt><dd>{answers.need ? NEED_LABELS[answers.need] : "License journey"}</dd></div>
                <div><dt>Current stage</dt><dd>{answers.stage ? STAGE_LABELS[answers.stage] : "Not selected"}</dd></div>
                <div><dt>Age group</dt><dd>{answers.ageGroup ? AGE_LABELS[answers.ageGroup] : "Not selected"}</dd></div>
              </dl>
              <div className="get-started-result__note">
                This is an entry recommendation, not a calculation of your exact
                legal eligibility or DMV timeline.
              </div>
              <button
                type="button"
                className="public-button get-started-result__primary"
                onClick={continueAfterRecommendation}
              >
                {signedIn ? "Continue" : "Save and Continue"} <span aria-hidden="true">→</span>
              </button>
              {!signedIn ? (
                <Link href={signInHref} className="get-started-result__signin">
                  Already have an account? Sign in
                </Link>
              ) : null}
            </section>
          ) : null}

          {error ? <p className="get-started-error" role="alert">{error}</p> : null}

          {step < MAX_STEP ? (
            <button type="submit" className="public-button get-started-continue">
              Continue <span aria-hidden="true">→</span>
            </button>
          ) : null}
        </form>
      </div>
    </main>
  );
}

function ChoiceCard({
  name,
  checked,
  onChange,
  title,
  description,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  description?: string;
}) {
  return (
    <label className={`get-started-option${checked ? " is-selected" : ""}`}>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className="get-started-option__control" aria-hidden="true" />
      <span>
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
    </label>
  );
}

export function GetStartedFlow(props: GetStartedFlowProps) {
  return (
    <Suspense fallback={<main className="get-started-page" />}>
      <GetStartedContent {...props} />
    </Suspense>
  );
}
