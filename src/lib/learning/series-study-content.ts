import {
  EXPANDED_PRIMARY_TOPICS,
  EXPANDED_SECOND_TOPICS,
} from "./series-study-expanded";
import { getSeriesTitle } from "@/lib/learning/series-config";
import { getSeriesVisualPreset } from "@/lib/learning/series-visual-presets";

export type DiagramKind =
  | "four-way-stop"
  | "lane-change"
  | "parallel-park"
  | "stop-sign"
  | "speed-zone"
  | "traffic-signal"
  | "freeway-merge"
  | "crosswalk"
  | "curb-colors"
  | "railroad"
  | "dmv-test-flow"
  | "permit-journey"
  | "traffic-signs"
  | "left-turn-yield";

export type MotionKind =
  | "lane-change"
  | "signal-phases"
  | "pedestrian-yield"
  | "freeway-merge"
  | "four-way-yield"
  | "left-turn-yield"
  | "parallel-park"
  | "dmv-test-flow"
  | "permit-journey"
  | "sign-recognition"
  | "slow-for-conditions";

export interface CalloutDetail {
  label: string;
  detail: string;
}

export interface SeriesTopic {
  id: string;
  title: string;
  explanation: string;
  keyPoints: string[];
  scenario?: {
    intro: string;
    setup: string;
    prompt: string;
    choices: { id: string; text: string; correct: boolean }[];
    explanation: string;
    tip: string;
    whyItMatters: string;
  };
  diagram?: {
    kind: DiagramKind;
    title: string;
    intro: string;
    caption: string;
    details: string;
    callouts: CalloutDetail[];
    tips: string[];
  };
  motion?: {
    title: string;
    intro: string;
    description: string;
    steps: { title: string; text: string }[];
    takeaway: string;
    motion: MotionKind;
  };
}

export interface SeriesStudyPack {
  topics: SeriesTopic[];
}

export interface TopicInput {
  id: string;
  title: string;
  explanation: string;
  keyPoints?: string[];
  scenarioIntro: string;
  scenarioSetup?: string;
  scenarioPrompt: string;
  scenarioChoices: { id: string; text: string; correct: boolean }[];
  scenarioExplanation: string;
  scenarioTip?: string;
  scenarioWhy?: string;
  diagram: {
    kind: DiagramKind;
    title: string;
    intro?: string;
    caption: string;
    details?: string;
    callouts: string[] | CalloutDetail[];
    tips?: string[];
  };
  motion: {
    title: string;
    intro?: string;
    description: string;
    steps?: { title: string; text: string }[];
    takeaway?: string;
    motion: MotionKind;
  };
}

function toCallouts(callouts: string[] | CalloutDetail[], topicTitle: string): CalloutDetail[] {
  if (callouts.length === 0) return [];
  if (typeof callouts[0] === "object") return callouts as CalloutDetail[];
  return (callouts as string[]).map((label) => ({
    label,
    detail: `Watch for ${label.toLowerCase()} when applying ${topicTitle.toLowerCase()} on real roads.`,
  }));
}

export function buildTopic(input: TopicInput): SeriesTopic {
  const callouts = toCallouts(input.diagram.callouts, input.title);

  return {
    id: input.id,
    title: input.title,
    explanation: input.explanation,
    keyPoints: input.keyPoints ?? [
      `Understand the core rule before you practice ${input.title.toLowerCase()}.`,
      "Scan early, decide calmly, and act only when the path is clear.",
      "Connect each rule to a real street you have seen from the passenger seat.",
    ],
    scenario: {
      intro: input.scenarioIntro,
      setup:
        input.scenarioSetup ??
        `You are driving on a typical California street. Traffic is light but moving steadily. You remember what you just read about ${input.title.toLowerCase()} and need to make a safe decision in the next few seconds.`,
      prompt: input.scenarioPrompt,
      choices: input.scenarioChoices,
      explanation: input.scenarioExplanation,
      tip:
        input.scenarioTip ??
        `On the permit test, look for the choice that follows the handbook — not the fastest or most aggressive option.`,
      whyItMatters:
        input.scenarioWhy ??
        `Getting this right in real traffic prevents close calls and keeps pedestrians and other drivers predictable.`,
    },
    diagram: {
      kind: input.diagram.kind,
      title: input.diagram.title,
      intro:
        input.diagram.intro ??
        `This diagram breaks down ${input.title.toLowerCase()} so you can picture the road layout before you drive it.`,
      caption: input.diagram.caption,
      details:
        input.diagram.details ??
        `Use the labels below to connect each part of the scene to the rule you studied. On the test and on the road, spotting these details early gives you more time to react.`,
      callouts,
      tips:
        input.diagram.tips ??
        callouts.map((c) => c.label).slice(0, 3),
    },
    motion: {
      title: input.motion.title,
      intro:
        input.motion.intro ??
        `Watch how ${input.title.toLowerCase()} plays out step by step. Imagine you are in the driver's seat.`,
      description: input.motion.description,
      steps:
        input.motion.steps ?? [
          {
            title: "Scan the scene",
            text: "Look ahead and check mirrors before anything moves.",
          },
          {
            title: "Decide safely",
            text: "Choose the action that matches the rule you learned.",
          },
          {
            title: "Act smoothly",
            text: "Make one calm move — no sudden jerks or last-second changes.",
          },
        ],
      takeaway:
        input.motion.takeaway ??
        `Smooth, predictable driving is what examiners and other drivers both want to see.`,
      motion: input.motion.motion,
    },
  };
}

const FOUR_WAY_STOP = buildTopic({
  id: "four-way-stop",
  title: "Four-way stops",
  keyPoints: [
    "Come to a complete stop behind the line at every approach.",
    "First to stop completely goes first.",
    "If two arrive together, yield to the driver on your right.",
    "Left turns yield to straight-through traffic when facing each other.",
  ],
  explanation: `A four-way stop is one of the most common places new drivers feel unsure — especially when two or more cars arrive at the same time. The rule is simpler than it feels: every driver must come to a complete stop behind the stop line or crosswalk before the intersection.

Once stopped, the first vehicle to arrive and stop completely has the right to go first. If two cars arrive at the same time, yield to the vehicle on your right. If you are facing each other and one is turning left while the other goes straight, the straight-through driver usually goes first because left turns must yield.

Never wave another driver through unless you are completely sure it is safe — confusing gestures cause crashes. Take your turn calmly, keep scanning the intersection, and only proceed when it is clearly your turn and the path is open.`,
  scenarioIntro: "You're approaching a quiet neighborhood intersection.",
  scenarioSetup:
    "You and another driver reach a four-way stop at nearly the same moment. You are both stopped behind the limit lines. The other car is on the cross street to your right and also wants to go straight. No turn signals are on and no one has started moving yet.",
  scenarioPrompt:
    "You arrive at a four-way stop at the same time as a car to your right. Who goes first?",
  scenarioChoices: [
    { id: "a", text: "You, because you are going straight", correct: false },
    { id: "b", text: "The driver on your right", correct: true },
    { id: "c", text: "Whoever honks first", correct: false },
  ],
  scenarioExplanation:
    "When two vehicles arrive at the same time, California law says yield to the driver on your right. Wait until they clear before you enter the intersection.",
  scenarioTip:
    "At four-way stops, 'same time' means neither driver has a clear head start — when in doubt, yield.",
  scenarioWhy:
    "Right-of-way rules at four-way stops prevent gridlock and side-impact crashes in neighborhoods.",
  diagram: {
    kind: "four-way-stop",
    title: "Four-way stop layout",
    intro:
      "Every approach has a stop line. Study where each vehicle stops and who yields to whom.",
    caption: "Stop fully at every approach. Same time? Yield to the right.",
    details:
      "The blue car is you. The green car is on your right. Both must stop completely before either proceeds. When tied, the right-side driver goes first while you wait and keep scanning.",
    callouts: [
      { label: "Stop line", detail: "Stop behind the white line — not in the crosswalk." },
      { label: "Yield to right", detail: "Same arrival time? The driver on your right goes first." },
      { label: "Take turns", detail: "One vehicle at a time — never rush the intersection." },
    ],
    tips: [
      "Stop means zero movement — rolling stops fail the test and cause tickets.",
      "Make eye contact if you can, but never assume the other driver will yield.",
    ],
  },
  motion: {
    title: "Watch the intersection",
    intro: "Both drivers stop. The car on the right proceeds while you hold your position.",
    description:
      "Notice how the waiting driver keeps scanning even while stopped. That habit catches pedestrians and late-braking vehicles.",
    steps: [
      { title: "Both stop fully", text: "Each car halts behind the limit line." },
      { title: "Right-side goes", text: "The green car enters because it is on your right." },
      { title: "You proceed", text: "When the intersection is clear, take your turn smoothly." },
    ],
    takeaway: "Patience at four-way stops beats guessing — let the rules decide who moves.",
    motion: "four-way-yield",
  },
});

export const SERIES_STUDY_CONTENT: Record<number, SeriesStudyPack> = {
  1: {
    topics: [
      buildTopic({
        id: "getting-licensed",
        title: "Getting your California license",
        explanation: `Getting a driver license is a step-by-step process — not a single test day. Most new drivers begin with approved driver education, which teaches traffic laws, safe habits, and how to read the road before you ever sit behind the wheel alone.

After studying, you apply for an instruction permit at the DMV. You'll need proof of identity, residency, and parental consent if you are under 18. With a permit, you can practice driving only with a licensed adult who meets California's requirements — usually a parent, guardian, or certified instructor.

The permit stage is where you build real skill: starting smoothly, scanning intersections, and learning to stay calm in traffic. Take your time here. Rushing leads to gaps that show up later on the behind-the-wheel test. Study consistently, log your practice hours, and treat every drive as a chance to improve.`,
        scenarioIntro: "You're planning your first steps toward a California license.",
        scenarioPrompt: "You are 15½ and want a permit. What is usually required first?",
        scenarioChoices: [
          { id: "a", text: "Pass the behind-the-wheel test", correct: false },
          {
            id: "b",
            text: "Complete driver education and get parental consent",
            correct: true,
          },
          { id: "c", text: "Register a vehicle in your name", correct: false },
        ],
        scenarioExplanation:
          "Most teens complete driver education first, then apply for an instruction permit with the required documents.",
        diagram: {
          kind: "stop-sign",
          title: "The permit path",
          caption: "Study → permit → supervised practice → license test.",
          callouts: ["Driver education", "Instruction permit", "Supervised practice"],
        },
        motion: {
          title: "Green light to study",
          description: "Each step builds on the last — start with knowledge, then practice.",
          motion: "permit-journey",
        },
      }),
    ],
  },
  3: {
    topics: [
      buildTopic({
        id: "testing-process",
        title: "The Testing Process",
        keyPoints: [
          "The vision test checks that you can see well enough to drive safely.",
          "The knowledge test covers signs, laws, and safe-driving rules from the handbook.",
          "The behind-the-wheel test evaluates real driving skill — not just memorization.",
          "Bring the right documents every visit so you are not turned away.",
        ],
        explanation: `California uses three main checkpoints before you earn a full license: vision screening, a written knowledge test, and a behind-the-wheel drive test. Each one checks a different skill — seeing clearly, knowing the rules, and applying them on real roads.

The vision test makes sure your eyesight meets minimum standards, with or without glasses or contacts. The knowledge test asks about signs, right-of-way, speed, alcohol laws, and other handbook topics. Study your course material and handbook until the answers feel familiar, not memorized word-for-word.

The drive test is the longest step. An examiner watches how you start, stop, turn, change lanes, and respond to traffic. Smooth, predictable moves beat flashy driving every time. Nerves are normal — deep breaths, shoulder checks, and scanning the road show confidence.

Before any DMV visit, confirm your documents: proof of identity, residency, permit or application forms, and parental signatures if you are under 18. Missing paperwork is the most common reason teens have to reschedule.`,
        scenarioIntro: "It's the morning of your knowledge test at the DMV.",
        scenarioSetup:
          "You studied for two weeks and feel ready for the questions. At the counter, the clerk asks for your documents before you can take the test. Your friend forgot an ID last month and had to come back another day.",
        scenarioPrompt:
          "What should you do before leaving home for a DMV knowledge test?",
        scenarioChoices: [
          { id: "a", text: "Only bring your phone for the appointment code", correct: false },
          {
            id: "b",
            text: "Bring required ID, forms, and any proof the DMV listed for your visit",
            correct: true,
          },
          { id: "c", text: "Skip breakfast so you are not late", correct: false },
        ],
        scenarioExplanation:
          "Always verify the DMV checklist for your appointment type. Missing ID or forms means you cannot test that day.",
        scenarioTip:
          "Screenshot or print the DMV appointment confirmation and pack documents the night before.",
        scenarioWhy:
          "Being prepared reduces stress and keeps you from losing weeks of waiting for a new appointment slot.",
        diagram: {
          kind: "dmv-test-flow",
          title: "Your path through DMV testing",
          intro:
            "Think of testing as a sequence — each step unlocks the next one on your license journey.",
          caption: "Vision → knowledge → supervised practice → drive test.",
          details:
            "You cannot skip steps. Most new drivers pass the knowledge test, practice with a permit, then schedule the behind-the-wheel exam when their instructor or parent says they are ready.",
          callouts: [
            { label: "Vision screen", detail: "Quick check — bring glasses if you need them." },
            { label: "Knowledge test", detail: "Handbook rules, signs, and safe-driving scenarios." },
            { label: "Drive test", detail: "Real streets with a DMV examiner riding along." },
          ],
          tips: [
            "Arrive early — lines and parking take time.",
            "If you fail a test, ask what to study before retaking.",
          ],
        },
        motion: {
          title: "From study to steering wheel",
          intro: "Each phase builds skill before you drive solo.",
          description:
            "Knowledge comes first, then hours of supervised practice turn rules into habits your body remembers.",
          steps: [
            { title: "Study & pass knowledge test", text: "Learn the rules before you apply them on the road." },
            { title: "Practice with permit", text: "Build muscle memory with a licensed adult beside you." },
            { title: "Pass drive test", text: "Show smooth, safe habits in real traffic." },
          ],
          takeaway: "The testing process is long on purpose — each step makes the next one safer.",
          motion: "dmv-test-flow",
        },
      }),
    ],
  },
  8: {
    topics: [
      buildTopic({
        id: "lane-changes",
        title: "Changing lanes safely",
        explanation: `Lane changes cause more close calls than many drivers expect, because a mirror alone cannot show everything beside and behind you. Before you move the wheel, signal early — at least three seconds on city streets — so other drivers know your plan.

Check your rearview mirror, then your side mirror, then glance over your shoulder into the blind spot. That shoulder check is not optional; it is the only way to see a car sitting in the space you want to enter. Move smoothly, match the speed of the lane you are entering, and cancel your signal once you are settled.

Never change lanes in an intersection, across solid lines, or when another driver is closing the gap. If the lane is not clear, wait. A late lane change is stressful; a safe one should feel almost boring.`,
        scenarioIntro: "You're on a multi-lane street and your exit is coming up.",
        scenarioPrompt:
          "You need to move one lane right for an exit. What is the safest sequence?",
        scenarioChoices: [
          {
            id: "a",
            text: "Signal, mirror, shoulder check, move when clear",
            correct: true,
          },
          { id: "b", text: "Move first, signal after", correct: false },
          { id: "c", text: "Honk and merge immediately", correct: false },
        ],
        scenarioExplanation:
          "Signal first, check mirrors and blind spot, then change lanes only when a gap is safe.",
        diagram: {
          kind: "lane-change",
          title: "Lane change diagram",
          caption: "Mirrors show a lot — but not everything. Always shoulder check.",
          callouts: ["Mirror check", "Blind spot", "Signal"],
        },
        motion: {
          title: "Lane change in motion",
          description: "Signal, check, then glide into the open lane without jerking the wheel.",
          motion: "lane-change",
        },
      }),
    ],
  },
  9: { topics: [FOUR_WAY_STOP] },
  10: {
    topics: [
      buildTopic({
        id: "traffic-signals",
        title: "Traffic signals",
        explanation: `Traffic signals tell everyone at an intersection whose turn it is to move — but the colors only work if drivers know what each phase means. Red means stop behind the limit line. Stay stopped until the light turns green and the intersection is clear.

Yellow does not mean speed up. It warns that red is coming. Stop if you can do so safely. If you are already so close that stopping would be abrupt or dangerous, proceed with caution — but never enter on yellow if you have time to stop comfortably.

Green means you may go, but only if the intersection is open. You must still yield to pedestrians in crosswalks and to vehicles already lawfully in the intersection. A green light is permission to proceed — not a guarantee that the path is safe.`,
        scenarioIntro: "You're approaching an intersection as the light changes.",
        scenarioPrompt: "A light turns yellow as you approach. What should you do?",
        scenarioChoices: [
          { id: "a", text: "Speed up to beat the red", correct: false },
          {
            id: "b",
            text: "Stop if you can do so safely; otherwise proceed with caution",
            correct: true,
          },
          { id: "c", text: "Always slam the brakes", correct: false },
        ],
        scenarioExplanation:
          "Yellow means prepare to stop. Stop when safe; don't race the light.",
        diagram: {
          kind: "traffic-signal",
          title: "Signal phases",
          caption: "Red — stop. Yellow — prepare. Green — go if clear.",
          callouts: ["Red", "Yellow", "Green"],
        },
        motion: {
          title: "Light turns green",
          description: "Wait for red to clear, then move only when the intersection is open.",
          motion: "signal-phases",
        },
      }),
    ],
  },
  12: {
    topics: [
      buildTopic({
        id: "right-of-way",
        title: "Right-of-way rules",
        explanation: `Right-of-way is not something you own — it is something you give. Even when you think you have priority, you must be ready to yield if another driver or pedestrian makes a mistake. That mindset is the core of defensive driving.

At intersections, yield to pedestrians in crosswalks every time. When turning left on a green light, yield to oncoming traffic going straight or turning right. At uncontrolled intersections, yield to whoever arrived first; if you arrive together, yield to the right.

Protected turn arrows change the picture: a green arrow usually means oncoming traffic is stopped for you. But at a plain green ball, left turns still yield. Never assume another driver will stop — confirm with eye contact and spacing before you move.`,
        scenarioIntro: "You have a green light and want to turn left.",
        scenarioPrompt:
          "You are turning left at a green light with oncoming traffic. You should:",
        scenarioChoices: [
          { id: "a", text: "Turn immediately — green means go", correct: false },
          {
            id: "b",
            text: "Yield to oncoming vehicles and pedestrians in the crosswalk",
            correct: true,
          },
          { id: "c", text: "Honk to claim right-of-way", correct: false },
        ],
        scenarioExplanation:
          "A green light does not override oncoming traffic when you turn left.",
        diagram: {
          kind: "left-turn-yield",
          title: "Yield zones",
          caption: "Pedestrians and oncoming traffic come first when required.",
          callouts: ["Crosswalk", "Oncoming lane", "Your yield"],
        },
        motion: {
          title: "Pedestrian crosses first",
          description: "Hold your turn until the crosswalk is clear and a gap opens.",
          motion: "left-turn-yield",
        },
      }),
    ],
  },
  14: {
    topics: [
      buildTopic({
        id: "speed-limits",
        title: "Speed limits & the Basic Speed Law",
        explanation: `Posted speed limits show the maximum speed under ideal conditions — dry pavement, clear visibility, light traffic. California's Basic Speed Law adds another layer: you must never drive faster than is safe for current conditions, even if you are under the posted limit.

Rain, fog, heavy traffic, construction, and sharp curves all demand slower speeds. School zones and residential streets have lower limits for a reason: people appear suddenly. Following distance should grow as speed and risk grow — the faster you go, the longer it takes to stop.

Getting a ticket is not the only risk of speeding. Higher speed reduces your time to react and increases crash force. Smooth, predictable speed helps everyone around you plan their moves.`,
        scenarioIntro: "It's raining and traffic is heavy.",
        scenarioPrompt: "Posted limit is 45 mph but grip is poor. You should:",
        scenarioChoices: [
          { id: "a", text: "Drive 45 mph — it's the law", correct: false },
          { id: "b", text: "Slow to a speed safe for conditions", correct: true },
          { id: "c", text: "Use hazard lights and stop in lane", correct: false },
        ],
        scenarioExplanation:
          "The Basic Speed Law requires a safe speed for conditions, not just the posted max.",
        diagram: {
          kind: "speed-zone",
          title: "Speed zone",
          caption: "Posted max applies in ideal conditions — rain means slow down.",
          callouts: ["45 MAX", "Rain = slower", "School zone ahead"],
        },
        motion: {
          title: "Adjust your pace",
          description: "Scan conditions, ease off the gas, and widen your following gap.",
          motion: "slow-for-conditions",
        },
      }),
    ],
  },
  15: {
    topics: [
      buildTopic({
        id: "freeway-driving",
        title: "Freeway driving & merging",
        explanation: `Freeways move fast, and the biggest mistake new drivers make is entering too slowly. Use the acceleration lane — the on-ramp — to match the speed of traffic already on the freeway. Stopping at the end of a ramp is dangerous unless absolutely necessary.

Signal early, find a gap, and merge smoothly. Once on the freeway, stay in the right lane until you are comfortable. Pass on the left when needed, and return right when finished. Keep a large following distance at highway speeds.

If you miss your exit, continue to the next one. Never cross lanes abruptly or reverse on a freeway. Plan ahead, read signs early, and make one calm lane change at a time.`,
        scenarioIntro: "You're joining a busy freeway from an on-ramp.",
        scenarioPrompt: "You are entering a freeway from an on-ramp. Your speed should be:",
        scenarioChoices: [
          { id: "a", text: "At or near traffic speed in the merge lane", correct: true },
          { id: "b", text: "20 mph below traffic", correct: false },
          { id: "c", text: "Stop at the end of the ramp", correct: false },
        ],
        scenarioExplanation:
          "Use the acceleration lane to match freeway speed, then merge when a gap is safe.",
        diagram: {
          kind: "freeway-merge",
          title: "Freeway merge",
          caption: "Build speed on the ramp, then blend into through traffic.",
          callouts: ["On-ramp", "Merge point", "Through lanes"],
        },
        motion: {
          title: "Merge onto the freeway",
          description: "Accelerate on the ramp and slide into a gap without stopping.",
          motion: "freeway-merge",
        },
      }),
    ],
  },
  16: {
    topics: [
      buildTopic({
        id: "parking-rules",
        title: "Parking rules & hill safety",
        explanation: `Parking is more than finding an empty space — it is about leaving your car legally and safely. Read curb colors: red means no stopping, green allows short stops, yellow is for loading, and white marks passenger pickup. Always park facing the direction of traffic and within marked spaces.

When parallel parking, signal, pull alongside the front car, and back in at a shallow angle. Take your time — small steering inputs beat big corrections. On hills, curb your wheels so the car rolls into the curb, not traffic, if brakes fail: turn wheels away from the curb uphill, toward the curb downhill.

Before you leave a parked car, check mirrors, shoulder check, and pull out only when the lane is clear. Opening a door into a bike lane without looking is a common cause of injury.`,
        scenarioIntro: "You found a spot on a steep street with a curb.",
        scenarioPrompt:
          "Parallel parking on a hill with a curb — which way should you turn the wheels?",
        scenarioChoices: [
          {
            id: "a",
            text: "Away from curb uphill, toward curb downhill",
            correct: true,
          },
          { id: "b", text: "Always straight", correct: false },
          { id: "c", text: "Toward travel lane always", correct: false },
        ],
        scenarioExplanation:
          "Curb the wheels so the vehicle rolls into the curb if it moves on its own.",
        diagram: {
          kind: "parallel-park",
          title: "Parallel parking steps",
          caption: "Pull alongside → back in at an angle → straighten in the space.",
          callouts: ["Signal", "45° angle", "Straighten"],
        },
        motion: {
          title: "Back into the space",
          description: "Move slowly, check mirrors, and center between the cars.",
          motion: "parallel-park",
        },
      }),
    ],
  },
  2: {
    topics: [
      buildTopic({
        id: "permits-requirements",
        title: "Instruction permits & requirements",
        explanation: `California uses an instruction permit so new drivers can practice with a licensed adult before testing alone. To qualify, you must meet age requirements, complete driver education, and pass the knowledge test at the DMV.

With a permit, you may drive only when a licensed driver who is at least 25 years old (or a certified instructor) sits beside you. They must be alert and ready to take control. Permits come with restrictions — no driving alone, no carrying passengers who would distract you, and no using a phone unless it is hands-free where allowed.

Keep your permit and proof of insurance in the vehicle every time you practice. Treat the permit stage as training, not a shortcut. The hours you log now build habits the examiner will watch on test day.`,
        scenarioIntro: "You just passed your knowledge test and received your permit.",
        scenarioPrompt: "Who can legally supervise you while practicing with a permit?",
        scenarioChoices: [
          { id: "a", text: "Any friend who has had a license for one year", correct: false },
          {
            id: "b",
            text: "A licensed driver at least 25 years old in the front seat",
            correct: true,
          },
          { id: "c", text: "No one — you may drive alone during daylight", correct: false },
        ],
        scenarioExplanation:
          "Permit holders must practice with a qualified licensed adult in the front passenger seat.",
        diagram: {
          kind: "permit-journey",
          title: "Permit requirements",
          caption: "Education → knowledge test → supervised practice.",
          callouts: ["Driver education", "Knowledge test", "Supervised hours"],
        },
        motion: {
          title: "Practice with supervision",
          description: "Every drive with your permit builds skill under guidance.",
          motion: "permit-journey",
        },
      }),
    ],
  },
  4: {
    topics: [
      buildTopic({
        id: "license-renewal",
        title: "License changes & renewal",
        explanation: `Your driver license is not a one-time document — it must stay accurate and current. When you move, change your name, or update your legal status, California requires you to notify the DMV within a set time frame.

Renewals happen on a schedule printed on your card. Real ID licenses may require extra documents proving identity and residency. If your license expires, you cannot legally drive until it is renewed — even if you are only one day late.

Keep a digital photo of your license and registration in your phone for reference, but always carry the physical card when driving. Out-of-date information can delay tests, tickets, or insurance claims.`,
        scenarioIntro: "You moved to a new address last month.",
        scenarioPrompt: "When must you update your address with the DMV?",
        scenarioChoices: [
          { id: "a", text: "Within 10 days of moving", correct: true },
          { id: "b", text: "Only when your license expires", correct: false },
          { id: "c", text: "Never — the post office handles it", correct: false },
        ],
        scenarioExplanation:
          "California requires address updates within 10 days of a move.",
        diagram: {
          kind: "dmv-test-flow",
          title: "Keeping your license valid",
          caption: "Update info → renew on time → carry proof when driving.",
          callouts: ["Address change", "Renewal date", "Real ID docs"],
        },
        motion: {
          title: "Stay current",
          description: "Small updates now prevent problems at checkpoints later.",
          motion: "dmv-test-flow",
        },
      }),
    ],
  },
  5: {
    topics: [
      buildTopic({
        id: "intro-driving",
        title: "Introduction to driving",
        explanation: `Driving is a skill that combines knowledge, coordination, and judgment. Before you turn the key, understand that you are responsible for a heavy machine that can hurt people in seconds. That responsibility starts the moment you sit in the driver's seat.

Good drivers develop routines: adjust mirrors and seat, buckle up, know where controls are, and plan your route. They scan constantly — not just straight ahead, but side streets, mirrors, and blind spots. They expect mistakes from others and leave space to react.

Your first drives should be in calm conditions with a patient supervisor. Empty parking lots are perfect for feeling the pedals and steering. Gradually move to quiet neighborhoods, then busier streets. Confidence grows from repetition, not from rushing.`,
        scenarioIntro: "You're about to start your first practice drive in a parking lot.",
        scenarioPrompt: "What should you do before shifting into drive?",
        scenarioChoices: [
          { id: "a", text: "Adjust seat, mirrors, and buckle up", correct: true },
          { id: "b", text: "Turn on the radio to stay calm", correct: false },
          { id: "c", text: "Hold the wheel with one hand only", correct: false },
        ],
        scenarioExplanation:
          "Set up your seating and mirrors and buckle up before the vehicle moves.",
        diagram: {
          kind: "stop-sign",
          title: "Pre-drive checklist",
          caption: "Seat · mirrors · seatbelt · know your route.",
          callouts: ["Adjust seat", "Check mirrors", "Plan route"],
        },
        motion: {
          title: "Ready to roll",
          description: "Small setup steps prevent big mistakes once you move.",
          motion: "permit-journey",
        },
      }),
    ],
  },
  6: {
    topics: [
      buildTopic({
        id: "vehicle-controls",
        title: "Vehicle controls",
        explanation: `Every car shares the same basic controls, even if buttons and screens look different. The accelerator makes you go, the brake slows you down, and the steering wheel aims the front wheels. Automatic transmissions use P-R-N-D; know what each position means before you shift.

Secondary controls matter too: turn signals, headlights, wipers, and defrosters. You should find them without looking down for more than a split second. Horn use is for warning, not frustration. Parking brake holds the car on hills and when parked.

Before driving an unfamiliar car, sit parked and touch each control. Muscle memory on your family car will not transfer if you hop into a rental with different layouts.`,
        scenarioIntro: "You're driving a friend's car for the first time.",
        scenarioPrompt: "When should you learn where the wipers and lights are?",
        scenarioChoices: [
          { id: "a", text: "While parked, before entering traffic", correct: true },
          { id: "b", text: "Only when rain starts on the freeway", correct: false },
          { id: "c", text: "Never — they are always the same", correct: false },
        ],
        scenarioExplanation:
          "Locate controls while parked so you never hunt for them in traffic.",
        diagram: {
          kind: "traffic-signal",
          title: "Primary controls",
          caption: "Steering · brake · accelerator · shift selector.",
          callouts: ["Steering", "Brake", "Accelerator"],
        },
        motion: {
          title: "Hands on controls",
          description: "Smooth inputs on brake and gas keep the ride steady.",
          motion: "signal-phases",
        },
      }),
    ],
  },
  7: {
    topics: [
      buildTopic({
        id: "starting-stopping",
        title: "Starting & stopping smoothly",
        explanation: `Starting and stopping sound simple, but jerky moves are a top reason new drivers fail tests. Press the brake, shift to drive, release the brake gradually, then feather the accelerator for a smooth roll. On hills, use the parking brake or hold the brake until you feel the bite point if you drive manual later.

Stopping means more than hitting the brake. Scan early, ease off the gas, brake progressively, and come to a complete stop behind the limit line. Sudden stops surprise drivers behind you — check your mirror and keep following distance so you can stop gently.

Smooth stops show control. Examiners notice when you lurch forward at every light. Practice in an empty lot until starts and stops feel invisible to passengers.`,
        scenarioIntro: "You're approaching a red light with cars behind you.",
        scenarioPrompt: "How should you stop at the light?",
        scenarioChoices: [
          { id: "a", text: "Ease off the gas and brake smoothly to a full stop", correct: true },
          { id: "b", text: "Coast in neutral and brake at the last second", correct: false },
          { id: "c", text: "Stop halfway in the crosswalk if you are late", correct: false },
        ],
        scenarioExplanation:
          "Gradual braking keeps you in control and warns drivers behind you.",
        diagram: {
          kind: "stop-sign",
          title: "Complete stops",
          caption: "Behind the line · full stop · check before going.",
          callouts: ["Limit line", "Full stop", "Scan"],
        },
        motion: {
          title: "Smooth stop sequence",
          description: "Release the gas early, then apply steady brake pressure.",
          motion: "slow-for-conditions",
        },
      }),
    ],
  },
};

for (const [numStr, input] of Object.entries(EXPANDED_PRIMARY_TOPICS)) {
  const n = Number(numStr);
  SERIES_STUDY_CONTENT[n] = { topics: [buildTopic(input)] };
}

function appendSecondTopic(seriesNumber: number, pack: SeriesStudyPack): SeriesStudyPack {
  if (pack.topics.length >= 2) return pack;

  const secondInput =
    EXPANDED_SECOND_TOPICS[seriesNumber] ??
    (() => {
      const first = pack.topics[0];
      const preset = getSeriesVisualPreset(seriesNumber);
      return {
        id: `${first.id}-section-2`,
        title: `${first.title}: applied practice`,
        explanation: `Now that you understand ${first.title.toLowerCase()}, this section puts the idea into street-level decisions. Picture common situations you will face during supervised practice and on the permit test.

Focus on what you would scan first, what you would wait for, and what a calm driver does when traffic is unclear. The handbook rewards predictable, safe choices — not aggressive shortcuts.

Use this section to connect the rule to real roads before you take the series exam.`,
        scenarioIntro: `Apply what you learned about ${first.title.toLowerCase()}.`,
        scenarioPrompt:
          "When traffic is unclear, what is usually the safest choice?",
        scenarioChoices: [
          { id: "a", text: "Slow down, scan, and yield if needed", correct: true },
          { id: "b", text: "Speed up to clear the area", correct: false },
          { id: "c", text: "Assume others will always stop for you", correct: false },
        ],
        scenarioExplanation:
          "When in doubt, slow down and yield — patience prevents collisions.",
        diagram: {
          kind: preset.diagram.kind,
          title: `${preset.diagram.title} — review`,
          caption: preset.diagram.caption,
          callouts: preset.diagram.callouts.map((c) => c.label),
        },
        motion: {
          title: preset.motion.title,
          description: preset.motion.description,
          motion: preset.motion.motion,
        },
      } satisfies TopicInput;
    })();

  return {
    topics: [...pack.topics, buildTopic(secondInput)],
  };
}

for (let n = 1; n <= 30; n++) {
  if (!SERIES_STUDY_CONTENT[n]) {
    const title = getSeriesTitle(n);
    const preset = getSeriesVisualPreset(n);
    SERIES_STUDY_CONTENT[n] = {
      topics: [
        buildTopic({
          id: `series-${n}-topic`,
          title,
          explanation:
            `${title} is a core part of your California driver education. Understanding this topic means knowing not just what the handbook says, but why the rule exists and how it keeps people safe on real roads.

Start by reading each paragraph carefully. Picture yourself in the driver's seat — what would you look for, and what would you do first? Good drivers think in order: scan, decide, then act. That habit starts here, before you ever take the wheel alone.

Rules make more sense when you connect them to situations you have already seen from the passenger seat. Watch for these ideas the next time you ride with someone. The permit test will ask you to apply them, not just repeat definitions.`,
          scenarioIntro: `Now apply what you learned about ${title.toLowerCase()}.`,
          scenarioPrompt:
            "At an intersection, who must you yield to when turning left?",
          scenarioChoices: [
            { id: "a", text: "Only pedestrians on your left", correct: false },
            {
              id: "b",
              text: "Oncoming traffic and pedestrians in your path",
              correct: true,
            },
            { id: "c", text: "No one if you have a green light", correct: false },
          ],
          scenarioExplanation:
            "Left turns yield to oncoming traffic and pedestrians unless you have a protected arrow.",
          diagram: {
            kind: preset.diagram.kind,
            title: preset.diagram.title,
            caption: preset.diagram.caption,
            callouts: preset.diagram.callouts,
          },
          motion: {
            title: preset.motion.title,
            description: preset.motion.description,
            motion: preset.motion.motion,
          },
        }),
      ],
    };
  }
  SERIES_STUDY_CONTENT[n] = appendSecondTopic(n, SERIES_STUDY_CONTENT[n]);
}

export function getSeriesStudyPack(seriesNumber: number): SeriesStudyPack {
  return SERIES_STUDY_CONTENT[seriesNumber] ?? SERIES_STUDY_CONTENT[9];
}

const STUDY_DONE_PREFIX = "series-study-done:";

export function getStudyItemsDone(seriesNumber: number): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(`${STUDY_DONE_PREFIX}${seriesNumber}`);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) {
      return new Set(parsed as string[]);
    }
    return new Set();
  } catch {
    return new Set();
  }
}

export function markStudyItemDone(seriesNumber: number, itemId: string): void {
  if (typeof window === "undefined") return;
  const done = getStudyItemsDone(seriesNumber);
  done.add(itemId);
  localStorage.setItem(
    `${STUDY_DONE_PREFIX}${seriesNumber}`,
    JSON.stringify([...done])
  );
}

/** @deprecated use getStudyItemsDone */
export function getStudyCardsDone(): Set<number> {
  return new Set();
}

/** @deprecated use markStudyItemDone */
export function markStudyCardDone(): void {}
