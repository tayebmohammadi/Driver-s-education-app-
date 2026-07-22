export interface DrivePack {
  id: string;
  title: string;
  hours: string;
  price: number;
  originalPrice?: number;
  rateLabel: string;
  saveLabel?: string;
  badges: { label: string; variant: "neutral" | "purple" | "green" | "orange" }[];
  featured?: boolean;
  ribbon?: string;
}

export interface ChecklistSkill {
  id: string;
  label: string;
  status: "competent" | "needs-development" | "pending";
}

export interface ChecklistCategory {
  code: string;
  title: string;
  completed: number;
  total: number;
  competent: number;
  needsDevelopment: number;
  expanded?: boolean;
  skills?: ChecklistSkill[];
}

export const DRIVE_PACKS: DrivePack[] = [
  {
    id: "single",
    title: "Single Lesson",
    hours: "1 hour of driving",
    price: 89,
    originalPrice: 99,
    rateLabel: "$89 / hr",
    saveLabel: "Save $10",
    badges: [{ label: "No commitment", variant: "neutral" }],
  },
  {
    id: "starter",
    title: "Starter Pack",
    hours: "6 hours of driving",
    price: 480,
    originalPrice: 530,
    rateLabel: "$80 / hr",
    saveLabel: "Save $50",
    featured: true,
    ribbon: "Most Popular",
    badges: [
      { label: "Most Popular", variant: "purple" },
      { label: "4x no fees", variant: "green" },
    ],
  },
  {
    id: "progress",
    title: "Progress Pack",
    hours: "10 hours of driving",
    price: 800,
    originalPrice: 920,
    rateLabel: "$80 / hr",
    saveLabel: "Save $120",
    badges: [
      { label: "4x no fees", variant: "green" },
      { label: "Save $120", variant: "neutral" },
    ],
  },
  {
    id: "full-prep",
    title: "Full Prep Pack",
    hours: "15 hours of driving",
    price: 1200,
    originalPrice: 1350,
    rateLabel: "$80 / hr",
    saveLabel: "Save $150",
    ribbon: "Best Deal",
    badges: [
      { label: "Best Value", variant: "orange" },
      { label: "4x no fees", variant: "green" },
    ],
  },
];

export type { DriveDrivingSchool, DriveInstructor } from "./instructors-data";
export type { InstructorPackage } from "./pricing";
export {
  DRIVE_DRIVING_SCHOOLS,
  DRIVE_INSTRUCTORS,
  getDriveDrivingSchool,
  getDriveInstructor,
  getInstructorsByDrivingSchool,
} from "./instructors-data";

export const DRIVE_CHECKLIST: ChecklistCategory[] = [
  {
    code: "PDP",
    title: "Pre-Drive Preparation",
    completed: 4,
    total: 5,
    competent: 3,
    needsDevelopment: 1,
    skills: [
      { id: "01", label: "Adjusts seat, mirrors, and headrest correctly", status: "competent" },
      { id: "02", label: "Fastens seatbelt before starting", status: "competent" },
      { id: "03", label: "Checks dashboard warning lights", status: "competent" },
      { id: "04", label: "Sets the parking brake before starting engine", status: "competent" },
      { id: "05", label: "Checks blind spots before moving off", status: "needs-development" },
    ],
  },
  {
    code: "VC",
    title: "Vehicle Controls",
    completed: 1,
    total: 6,
    competent: 1,
    needsDevelopment: 0,
    skills: [
      { id: "01", label: "Smooth steering control", status: "competent" },
      { id: "02", label: "Accurate accelerator use", status: "pending" },
      { id: "03", label: "Progressive braking", status: "pending" },
      { id: "04", label: "Clutch control (if applicable)", status: "pending" },
      { id: "05", label: "Correct gear selection", status: "pending" },
      { id: "06", label: "Uses indicators correctly", status: "pending" },
    ],
  },
  {
    code: "JI",
    title: "Junctions & Intersections",
    completed: 0,
    total: 6,
    competent: 0,
    needsDevelopment: 0,
    skills: [
      { id: "01", label: "Approaches junctions at safe speed", status: "pending" },
      { id: "02", label: "Checks mirrors before slowing", status: "pending" },
      { id: "03", label: "Assesses gap in traffic", status: "pending" },
      { id: "04", label: "Positions correctly for turn", status: "pending" },
      { id: "05", label: "Yields when required", status: "pending" },
      { id: "06", label: "Clears junction without hesitation", status: "pending" },
    ],
  },
  {
    code: "RP",
    title: "Road Positioning",
    completed: 0,
    total: 5,
    competent: 0,
    needsDevelopment: 0,
    skills: [
      { id: "01", label: "Maintains lane position", status: "pending" },
      { id: "02", label: "Keeps safe distance from kerb", status: "pending" },
      { id: "03", label: "Positions for bends and hills", status: "pending" },
      { id: "04", label: "Avoids straddling lanes", status: "pending" },
      { id: "05", label: "Adjusts position for hazards", status: "pending" },
    ],
  },
  {
    code: "MAN",
    title: "Maneuvers",
    completed: 0,
    total: 5,
    competent: 0,
    needsDevelopment: 0,
    skills: [
      { id: "01", label: "Parallel parking", status: "pending" },
      { id: "02", label: "Reverse parking into bay", status: "pending" },
      { id: "03", label: "Three-point turn", status: "pending" },
      { id: "04", label: "Pulling over and stopping safely", status: "pending" },
      { id: "05", label: "Moving off uphill/downhill", status: "pending" },
    ],
  },
  {
    code: "HA",
    title: "Hazard Awareness",
    completed: 0,
    total: 6,
    competent: 0,
    needsDevelopment: 0,
    skills: [
      { id: "01", label: "Scans road ahead regularly", status: "pending" },
      { id: "02", label: "Checks mirrors frequently", status: "pending" },
      { id: "03", label: "Spots pedestrians and cyclists", status: "pending" },
      { id: "04", label: "Reacts to changing conditions", status: "pending" },
      { id: "05", label: "Anticipates other road users", status: "pending" },
      { id: "06", label: "Uses MSM routine consistently", status: "pending" },
    ],
  },
  {
    code: "RRS",
    title: "Road Rules & Signs",
    completed: 0,
    total: 5,
    competent: 0,
    needsDevelopment: 0,
    skills: [
      { id: "01", label: "Obeys speed limits", status: "pending" },
      { id: "02", label: "Responds to traffic signs", status: "pending" },
      { id: "03", label: "Follows road markings", status: "pending" },
      { id: "04", label: "Understands right of way", status: "pending" },
      { id: "05", label: "Complies with traffic signals", status: "pending" },
    ],
  },
  {
    code: "DCM",
    title: "Dual Carriageways & Motorways",
    completed: 0,
    total: 4,
    competent: 0,
    needsDevelopment: 0,
    skills: [
      { id: "01", label: "Merges safely onto dual carriageway", status: "pending" },
      { id: "02", label: "Maintains safe following distance", status: "pending" },
      { id: "03", label: "Changes lanes safely", status: "pending" },
      { id: "04", label: "Exits dual carriageway correctly", status: "pending" },
    ],
  },
];

export const DRIVE_HOME_RESOURCES = [
  {
    title: "How it works — find & book driving lessons",
    href: "/drive/about",
    icon: "calendar" as const,
  },
  {
    title: "Training — track your skills & progress",
    href: "/drive/checklist",
    icon: "training" as const,
  },
];

export const DRIVE_ABOUT_STATS = [
  { value: "#1", label: "Online School" },
  { value: "1,800+", label: "Instructors" },
  { value: "4.7/5", label: "Rating" },
  { value: "100+", label: "Licensed Schools" },
];

export const DRIVE_WHY_CHOOSE = [
  {
    icon: "👥",
    title: "Large Instructor Pool",
    points: [
      "A large pool of driving instructors from licensed schools near you.",
      "Compare prices, lesson packages, and availability in one place.",
    ],
  },
  {
    icon: "🎯",
    title: "Pick the Right Instructor",
    points: [
      "Choose whoever fits you best — language, gender, ratings, and teaching style.",
      "Filter by car type, pickup location, and more.",
    ],
  },
  {
    icon: "📋",
    title: "Feedback & Skill Checklist",
    points: [
      "Read instructor feedback after every lesson.",
      "Track your progress with a step-by-step skills checklist.",
    ],
  },
  {
    icon: "✅",
    title: "See Real Availability",
    points: [
      "See which schools and instructors have open lesson slots near you.",
      "No more calling around only to hear \"we're booked for weeks.\"",
    ],
  },
  {
    icon: "📅",
    title: "Flexible Scheduling",
    points: [
      "Schedule anytime, 24/7, right from your phone.",
      "See available time slots and book the one that works for you.",
    ],
  },
  {
    icon: "🛡️",
    title: "Licensed & All in One App",
    points: [
      "Every instructor comes from a licensed driving school.",
      "Track bookings, lesson history, and remaining hours in one account.",
    ],
  },
];

export const DRIVE_HOW_IT_WORKS_SUBTITLE =
  "We connect students with licensed driving schools. Browse schools near you, compare options, and book your next lesson in minutes.";

export const DRIVE_HOW_IT_WORKS_STUDENTS_SUBTITLE =
  "Search licensed schools in your area, compare lesson packages and instructors, then book your time slot directly in the app.";

export const DRIVE_HOW_IT_WORKS_SCHOOLS_SUBTITLE =
  "Create your school profile, list your packages and availability, and start receiving confirmed student bookings through the platform.";

export const DRIVE_HOW_IT_WORKS_TRUST_NOTE =
  "We do not provide driving lessons ourselves. Every lesson is delivered by a licensed driving school — our app simply makes it easier to search, compare, and book.";

export const DRIVE_HOW_IT_WORKS_STUDENTS = [
  {
    step: "1",
    title: "Search Instructors Near You",
    body: "Enter your address to see instructors near your area, along with their packages, ratings, and availability.",
  },
  {
    step: "2",
    title: "Compare Packages & Instructors",
    body: "Compare packages side by side — hourly rates, lesson bundles, exam prep, and exam-day options where an instructor goes with you in their car. Browse instructors by rating, languages spoken, experience, and pricing to find the right fit.",
  },
  {
    step: "3",
    title: "Book Your Lesson",
    body: "Choose your package, pick an available time, and complete your booking in the app. Your spot is reserved as soon as you book.",
  },
  {
    step: "4",
    title: "Take Your Lesson",
    body: "Show up at your scheduled time. The driving school handles your training with a licensed instructor and manages everything from their side.",
  },
];

export const DRIVE_HOW_IT_WORKS_SCHOOLS = [
  {
    step: "1",
    title: "Create Your School Profile",
    body: "Set up your business profile with your school name, license number, service area, contact details, and policies so students know what to expect.",
  },
  {
    step: "2",
    title: "List Packages & Availability",
    body: "Add your lesson offerings — single lessons, teen packages, road test prep, adult courses — and open the time slots students can book online.",
  },
  {
    step: "3",
    title: "Receive Confirmed Bookings",
    body: "When a student books through the app, you get their details right away: chosen package, pickup location, scheduled time, and contact information.",
  },
  {
    step: "4",
    title: "Assign an Instructor",
    body: "Match each booking to an available instructor on your team and share the lesson details. Your school runs the lesson from there.",
  },
  {
    step: "5",
    title: "Pay Only When We Bring a Student",
    body: "There are no upfront listing fees. The platform earns a commission only on bookings that come through the app.",
  },
];

export const DRIVE_FAQ = [
  {
    question: "How is an online driving school different from a traditional one?",
    answer:
      "You study theory at your own pace online, then book practical lessons with a certified instructor near you. No physical classroom — everything is managed via the app, making it faster and much cheaper.",
  },
  {
    question: "Are the instructors really certified?",
    answer:
      "Yes, 100%. Every instructor holds a state-issued diploma (DVSA approved) and is continuously evaluated. You can see each instructor's rating, pass rate, and reviews before booking.",
  },
  {
    question: "How many lessons will I need?",
    answer:
      "It varies per person, but the average is around 20–25 hours. Your instructor evaluates your level in the first session and builds a personalized roadmap for you.",
  },
  {
    question: "Can I choose my own instructor?",
    answer:
      "Absolutely. Browse available instructors near you, filter by language or availability, and pick whoever feels right. You can switch instructors at any time.",
  },
  {
    question: "What if I'm not happy after my first lesson?",
    answer:
      "You can switch to a different instructor at any time. Browse ratings, profiles, language, teaching style, and car type to find a better match without starting your search over.",
  },
  {
    question: "How does the exam booking work?",
    answer:
      "Once your instructor confirms you're ready, we handle the practical exam registration. An exam slot is guaranteed as part of your pack, and your instructor accompanies you on the day.",
  },
];
