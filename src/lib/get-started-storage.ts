export const GET_STARTED_STORAGE_KEY = "dmv-study:get-started";

export type SavedGetStartedState = {
  helping: "self" | "teenager" | null;
  need:
    | "teen-full"
    | "adult-first"
    | "required-training"
    | "road-test"
    | "lessons-only"
    | "refresher"
    | null;
  stage:
    | "not-started-ed"
    | "completing-ed"
    | "ed-certificate"
    | "learner-permit"
    | "driving-practice"
    | "road-test-prep"
    | "provisional-license"
    | "permit-study"
    | "learning-drive"
    | "required-six-hours"
    | "general-practice"
    | "road-test-vehicle"
    | "licensed-refresher"
    | null;
  ageGroup:
    | "under-15-half"
    | "15-half-17-half"
    | "17-half-18"
    | "18-plus"
    | null;
};

const HELPING = new Set(["self", "teenager"]);
const NEEDS = new Set([
  "teen-full",
  "adult-first",
  "required-training",
  "road-test",
  "lessons-only",
  "refresher",
]);
const STAGES = new Set([
  "not-started-ed",
  "completing-ed",
  "ed-certificate",
  "learner-permit",
  "driving-practice",
  "road-test-prep",
  "provisional-license",
  "permit-study",
  "learning-drive",
  "required-six-hours",
  "general-practice",
  "road-test-vehicle",
  "licensed-refresher",
]);
const AGE_GROUPS = new Set([
  "under-15-half",
  "15-half-17-half",
  "17-half-18",
  "18-plus",
]);

function validValue<T extends string>(
  value: unknown,
  allowed: Set<string>
): T | null {
  return typeof value === "string" && allowed.has(value) ? (value as T) : null;
}
export function parseGetStartedState(
  raw: string | null
): SavedGetStartedState | null {
  if (!raw) return null;

  try {
    const value = JSON.parse(raw) as Record<string, unknown>;
    const need = validValue<NonNullable<SavedGetStartedState["need"]>>(
      value.need,
      NEEDS
    );

    if (!need) return null;

    return {
      helping: validValue<NonNullable<SavedGetStartedState["helping"]>>(
        value.helping,
        HELPING
      ),
      need,
      stage: validValue<NonNullable<SavedGetStartedState["stage"]>>(
        value.stage,
        STAGES
      ),
      ageGroup: validValue<NonNullable<SavedGetStartedState["ageGroup"]>>(
        value.ageGroup,
        AGE_GROUPS
      ),
    };
  } catch {
    return null;
  }
}
