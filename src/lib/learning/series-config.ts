export const TOTAL_SERIES = 30;
export const REQUIRED_STUDY_HOURS = 30;
export const SERIES_EXAM_QUESTIONS = 30;
export const SERIES_PASS_SCORE = 70;

export const SERIES_TITLES: Record<number, string> = {
  1: "Getting Your License",
  2: "Permits & Requirements",
  3: "The Testing Process",
  4: "License Changes & Renewal",
  5: "Introduction to Driving",
  6: "Vehicle Controls",
  7: "Starting & Stopping",
  8: "Turning & Lane Changes",
  9: "Intersections Basics",
  10: "Traffic Signals",
  11: "Traffic Signs",
  12: "Right of Way",
  13: "Sharing the Road",
  14: "Speed Limits",
  15: "Freeway Driving",
  16: "Parking Rules",
  17: "Night Driving",
  18: "Defensive Driving",
  19: "Weather Conditions",
  20: "Emergency Situations",
  21: "Alcohol & Drugs",
  22: "Distracted Driving",
  23: "Insurance & Collisions",
  24: "Hit & Run Laws",
  25: "Vehicle Registration",
  26: "Driver Safety",
  27: "Child Safety",
  28: "Senior Driving",
  29: "Environmental Driving",
  30: "Final Review & Permit Prep",
};

/** Split N lessons evenly across 30 series */
export function assignLessonsToSeries(
  lessonIds: string[]
): Map<number, string[]> {
  const map = new Map<number, string[]>();
  for (let s = 1; s <= TOTAL_SERIES; s++) map.set(s, []);

  lessonIds.forEach((id, index) => {
    const seriesNum = Math.min(
      TOTAL_SERIES,
      Math.floor((index * TOTAL_SERIES) / lessonIds.length) + 1
    );
    map.get(seriesNum)!.push(id);
  });

  return map;
}

export function getSeriesTitle(n: number): string {
  return SERIES_TITLES[n] ?? `Series ${n}`;
}

export interface SeriesSection {
  number: number;
  title: string;
  description: string;
  seriesNumbers: number[];
}

/** Six blocks of five series — matches the 30-series curriculum */
export const SERIES_SECTIONS: SeriesSection[] = [
  {
    number: 1,
    title: "License & Getting Started",
    description: "Permits, DMV visits, and what you need before you drive.",
    seriesNumbers: [1, 2, 3, 4, 5],
  },
  {
    number: 2,
    title: "Vehicle Basics & Control",
    description: "Controls, starting, stopping, turns, and intersections.",
    seriesNumbers: [6, 7, 8, 9, 10],
  },
  {
    number: 3,
    title: "Rules of the Road",
    description: "Signs, signals, right-of-way, and sharing the road.",
    seriesNumbers: [11, 12, 13, 14, 15],
  },
  {
    number: 4,
    title: "Advanced Driving",
    description: "Parking, night driving, defense, and weather.",
    seriesNumbers: [16, 17, 18, 19, 20],
  },
  {
    number: 5,
    title: "Responsibility & Safety",
    description: "Alcohol, distractions, insurance, and collisions.",
    seriesNumbers: [21, 22, 23, 24, 25],
  },
  {
    number: 6,
    title: "Final Preparation",
    description: "Safety topics and permit test review.",
    seriesNumbers: [26, 27, 28, 29, 30],
  },
];

export function getSeriesSection(seriesNumber: number): SeriesSection {
  return (
    SERIES_SECTIONS.find((section) =>
      section.seriesNumbers.includes(seriesNumber)
    ) ?? SERIES_SECTIONS[0]
  );
}

export function getSectionIndexInSeries(
  seriesNumber: number
): number {
  const section = getSeriesSection(seriesNumber);
  return section.seriesNumbers.indexOf(seriesNumber) + 1;
}
