export interface StudyTopic {
  slug: string;
  title: string;
  description: string;
  icon: string;
  categories: string[];
}

export const STUDY_TOPICS: StudyTopic[] = [
  {
    slug: "road-signs",
    title: "Road Signs",
    description: "Recognize and understand California road signs.",
    icon: "🛑",
    categories: ["traffic-signs"],
  },
  {
    slug: "rules-of-the-road",
    title: "Rules of the Road",
    description: "Traffic laws, speed limits, and lane rules.",
    icon: "📋",
    categories: ["traffic-signals", "speed-limits", "navigating"],
  },
  {
    slug: "right-of-way",
    title: "Right of Way",
    description: "Who goes first at intersections and merges.",
    icon: "↔️",
    categories: ["right-of-way"],
  },
  {
    slug: "parking",
    title: "Parking",
    description: "Parking rules, zones, and hill parking.",
    icon: "🅿️",
    categories: ["navigating", "driving-basics"],
  },
  {
    slug: "intersections",
    title: "Intersections",
    description: "Signals, signs, and safe intersection navigation.",
    icon: "🔀",
    categories: ["traffic-signals", "right-of-way"],
  },
  {
    slug: "freeway-driving",
    title: "Freeway Driving",
    description: "Entering, merging, and exiting freeways safely.",
    icon: "🛣️",
    categories: ["navigating", "sharing-road"],
  },
  {
    slug: "night-driving",
    title: "Night Driving",
    description: "Headlights, visibility, and night hazards.",
    icon: "🌙",
    categories: ["safe-driving"],
  },
  {
    slug: "defensive-driving",
    title: "Defensive Driving",
    description: "Anticipate hazards and protect yourself.",
    icon: "🛡️",
    categories: ["safe-driving", "driver-safety"],
  },
  {
    slug: "alcohol-drugs",
    title: "Alcohol & Drugs",
    description: "DUI laws, BAC limits, and consequences.",
    icon: "🚫",
    categories: ["alcohol-drugs"],
  },
  {
    slug: "distracted-driving",
    title: "Distracted Driving",
    description: "Phone use, distractions, and focus.",
    icon: "📵",
    categories: ["safe-driving", "driver-safety"],
  },
  {
    slug: "emergency-situations",
    title: "Emergency Situations",
    description: "Breakdowns, collisions, and emergencies.",
    icon: "🚨",
    categories: ["safe-driving", "insurance-collisions", "driver-safety"],
  },
];

export function getTopicBySlug(slug: string): StudyTopic | undefined {
  return STUDY_TOPICS.find((t) => t.slug === slug);
}
