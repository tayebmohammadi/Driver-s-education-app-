import type { DiagramKind, MotionKind } from "./series-study-content";

interface VisualPreset {
  diagram: {
    kind: DiagramKind;
    title: string;
    caption: string;
    callouts: { label: string; detail: string }[];
  };
  motion: {
    motion: MotionKind;
    title: string;
    description: string;
  };
}

const PRESETS: Record<string, VisualPreset> = {
  license: {
    diagram: {
      kind: "permit-journey",
      title: "Steps to your license",
      caption: "Education → permit → practice → license.",
      callouts: [
        { label: "Driver ed", detail: "Learn rules before you drive." },
        { label: "Permit", detail: "Pass the knowledge test at DMV." },
        { label: "Practice", detail: "Supervised hours behind the wheel." },
      ],
    },
    motion: {
      motion: "permit-journey",
      title: "Your license path",
      description: "Each step unlocks the next — you cannot skip ahead.",
    },
  },
  testing: {
    diagram: {
      kind: "dmv-test-flow",
      title: "DMV testing sequence",
      caption: "Vision → knowledge → practice → drive test.",
      callouts: [
        { label: "Vision", detail: "Can you see clearly enough to drive?" },
        { label: "Knowledge", detail: "Signs, laws, and safe-driving rules." },
        { label: "Drive test", detail: "Real streets with an examiner." },
      ],
    },
    motion: {
      motion: "dmv-test-flow",
      title: "How testing unfolds",
      description: "Watch each DMV checkpoint light up in order.",
    },
  },
  signs: {
    diagram: {
      kind: "traffic-signs",
      title: "Sign shapes tell you the type",
      caption: "Shape and color come before you read the words.",
      callouts: [
        { label: "Octagon", detail: "Always means STOP." },
        { label: "Triangle", detail: "Yield — slow and be ready to stop." },
        { label: "Rectangle", detail: "Speed, parking, and other rules." },
      ],
    },
    motion: {
      motion: "sign-recognition",
      title: "Spot signs early",
      description: "Scan far ahead — signs appear before you need to act.",
    },
  },
  intersection: {
    diagram: {
      kind: "four-way-stop",
      title: "Four-way stop layout",
      caption: "Stop fully. Same time? Yield to the right.",
      callouts: [
        { label: "You", detail: "Stop behind the white line." },
        { label: "Right car", detail: "Goes first when you arrive together." },
        { label: "Wait", detail: "Scan until the intersection is clear." },
      ],
    },
    motion: {
      motion: "four-way-yield",
      title: "Right-side driver goes first",
      description: "Both stop — the car on the right proceeds while you wait.",
    },
  },
  signals: {
    diagram: {
      kind: "traffic-signal",
      title: "Signal phases",
      caption: "Red stop · Yellow prepare · Green go if clear.",
      callouts: [
        { label: "Red", detail: "Stop behind the limit line." },
        { label: "Yellow", detail: "Stop if safe — do not speed up." },
        { label: "Green", detail: "Go only when the path is open." },
      ],
    },
    motion: {
      motion: "signal-phases",
      title: "Light changes",
      description: "Red holds, yellow warns, green means go when safe.",
    },
  },
  lane: {
    diagram: {
      kind: "lane-change",
      title: "Safe lane change",
      caption: "Signal → mirrors → shoulder check → move.",
      callouts: [
        { label: "Signal", detail: "At least 3 seconds before moving." },
        { label: "Blind spot", detail: "Glance over your shoulder." },
        { label: "Merge", detail: "Match speed and hold your lane." },
      ],
    },
    motion: {
      motion: "lane-change",
      title: "Changing lanes",
      description: "Signal first, check blind spot, then merge smoothly.",
    },
  },
  rightOfWay: {
    diagram: {
      kind: "left-turn-yield",
      title: "Left turn yield zone",
      caption: "Oncoming traffic and pedestrians go first.",
      callouts: [
        { label: "Oncoming", detail: "Straight traffic has priority." },
        { label: "Crosswalk", detail: "Stop for pedestrians." },
        { label: "Your turn", detail: "Go only when a safe gap opens." },
      ],
    },
    motion: {
      motion: "left-turn-yield",
      title: "Waiting to turn left",
      description: "Hold until oncoming cars and pedestrians clear.",
    },
  },
  speed: {
    diagram: {
      kind: "speed-zone",
      title: "Speed under conditions",
      caption: "Posted max is for ideal weather — rain means slower.",
      callouts: [
        { label: "Posted 45", detail: "Maximum in perfect conditions." },
        { label: "Rain", detail: "Basic Speed Law — slow down." },
        { label: "Gap", detail: "More following distance." },
      ],
    },
    motion: {
      motion: "slow-for-conditions",
      title: "Adjusting speed",
      description: "Ease off the gas and widen your following gap.",
    },
  },
  freeway: {
    diagram: {
      kind: "freeway-merge",
      title: "Freeway merge zone",
      caption: "Use the ramp to match traffic speed.",
      callouts: [
        { label: "On-ramp", detail: "Accelerate with traffic flow." },
        { label: "Gap", detail: "Merge when a space is safe." },
        { label: "Lane", detail: "Stay right until comfortable." },
      ],
    },
    motion: {
      motion: "freeway-merge",
      title: "Merging onto the freeway",
      description: "Build speed on the ramp, then blend into traffic.",
    },
  },
  parking: {
    diagram: {
      kind: "parallel-park",
      title: "Parallel parking",
      caption: "Pull alongside → back in → straighten.",
      callouts: [
        { label: "Align", detail: "Stop next to the front car." },
        { label: "Angle", detail: "Back in at about 45°." },
        { label: "Center", detail: "Straighten in the space." },
      ],
    },
    motion: {
      motion: "parallel-park",
      title: "Backing into the space",
      description: "Small steering inputs — check mirrors as you move.",
    },
  },
  crosswalk: {
    diagram: {
      kind: "crosswalk",
      title: "Pedestrian crosswalk",
      caption: "Stop before the line — people cross first.",
      callouts: [
        { label: "Crosswalk", detail: "White lines mark the path." },
        { label: "Stop line", detail: "Do not block the walk." },
        { label: "Yield", detail: "Wait until they clear." },
      ],
    },
    motion: {
      motion: "pedestrian-yield",
      title: "Pedestrian crossing",
      description: "Stop and wait until the crosswalk is completely clear.",
    },
  },
};

const SERIES_PRESET_KEY: Record<number, keyof typeof PRESETS> = {
  1: "license",
  2: "license",
  3: "testing",
  4: "license",
  5: "intersection",
  6: "lane",
  7: "intersection",
  8: "lane",
  9: "intersection",
  10: "signals",
  11: "signs",
  12: "rightOfWay",
  13: "crosswalk",
  14: "speed",
  15: "freeway",
  16: "parking",
  17: "signals",
  18: "rightOfWay",
  19: "speed",
  20: "intersection",
  21: "signs",
  22: "lane",
  23: "intersection",
  24: "intersection",
  25: "license",
  26: "rightOfWay",
  27: "crosswalk",
  28: "speed",
  29: "freeway",
  30: "testing",
};

export function getSeriesVisualPreset(seriesNumber: number): VisualPreset {
  const key = SERIES_PRESET_KEY[seriesNumber] ?? "intersection";
  return PRESETS[key];
}
