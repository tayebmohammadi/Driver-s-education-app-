export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export type WeekDay = (typeof WEEK_DAYS)[number];

export type WeeklySlots = Record<WeekDay, string[]>;

const ALL_SLOT_TIMES = [
  "7:00am",
  "7:30am",
  "8:00am",
  "8:30am",
  "9:00am",
  "9:30am",
  "10:00am",
  "10:30am",
  "11:00am",
  "11:30am",
  "12:00pm",
  "12:30pm",
  "1:00pm",
  "1:30pm",
  "2:00pm",
  "2:30pm",
  "3:00pm",
  "3:30pm",
  "4:00pm",
  "4:30pm",
  "5:00pm",
  "5:30pm",
  "6:00pm",
  "6:30pm",
  "7:00pm",
];

function createSeededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function timeToMinutes(time: string): number {
  const match = time.match(/^(\d+):(\d+)(am|pm)$/i);
  if (!match) return 0;

  let hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const period = match[3].toLowerCase();

  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

function sortTimes(times: string[]): string[] {
  return [...times].sort((a, b) => timeToMinutes(a) - timeToMinutes(b));
}

export function buildWeeklySlots(instructorIndex: number): WeeklySlots {
  const weeklySlots = {} as WeeklySlots;

  WEEK_DAYS.forEach((day, dayIndex) => {
    const random = createSeededRandom(instructorIndex * 997 + dayIndex * 131);
    const slotCount = 3 + Math.floor(random() * 4);
    const pool = [...ALL_SLOT_TIMES];
    const times: string[] = [];

    for (let i = 0; i < slotCount && pool.length > 0; i += 1) {
      const pickIndex = Math.floor(random() * pool.length);
      times.push(pool.splice(pickIndex, 1)[0]);
    }

    weeklySlots[day] = sortTimes(times);
  });

  return weeklySlots;
}

export function getSlotsForDay(
  weeklySlots: WeeklySlots | Record<string, string[]>,
  day: string
): string[] {
  return weeklySlots[day as WeekDay] ?? [];
}

export function getDefaultScheduleDay(
  weeklySlots: WeeklySlots | Record<string, string[]>
): WeekDay {
  return WEEK_DAYS.find((day) => getSlotsForDay(weeklySlots, day).length > 0) ?? "Mon";
}
