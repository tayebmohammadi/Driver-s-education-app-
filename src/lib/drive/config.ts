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
      { id: "02", label: "Keeps a safe distance from the curb", status: "pending" },
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
    title: "Freeways & Multi-Lane Roads",
    completed: 0,
    total: 4,
    competent: 0,
    needsDevelopment: 0,
    skills: [
      { id: "01", label: "Merges safely onto the freeway", status: "pending" },
      { id: "02", label: "Maintains safe following distance", status: "pending" },
      { id: "03", label: "Changes lanes safely", status: "pending" },
      { id: "04", label: "Exits the freeway correctly", status: "pending" },
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
  { value: "Preview", label: "Marketplace" },
  { value: "Sample", label: "Instructor Profiles" },
  { value: "Example", label: "Availability" },
  { value: "Sample", label: "Lesson Packages" },
];

export const DRIVE_WHY_CHOOSE = [
  {
    icon: "👥",
    title: "Compare Instructor Profiles",
    points: [
      "Explore sample instructor and driving-school profiles.",
      "Preview how prices, lesson packages, and availability can be compared.",
    ],
  },
  {
    icon: "🎯",
    title: "Pick the Right Instructor",
    points: [
      "Compare profile details such as language, vehicle, sample rating, and teaching style.",
      "Filter by car type, pickup location, and more.",
    ],
  },
  {
    icon: "📋",
    title: "Training Progress Preview",
    points: [
      "Preview how lesson feedback could be organized.",
      "Explore an example step-by-step skills checklist.",
    ],
  },
  {
    icon: "✅",
    title: "Explore Example Availability",
    points: [
      "Compare example time slots across sample instructor profiles.",
      "Actual availability will need confirmation when live partners are connected.",
    ],
  },
  {
    icon: "📅",
    title: "Scheduling Preview",
    points: [
      "Explore how selecting a date and time can work from your phone.",
      "Choosing an example slot does not create a confirmed booking.",
    ],
  },
  {
    icon: "🛡️",
    title: "One Connected Experience",
    points: [
      "Review school, instructor, vehicle, package, and schedule details together.",
      "Partner verification and booking history are planned, not yet active.",
    ],
  },
];

export const DRIVE_HOW_IT_WORKS_SUBTITLE =
  "Preview how students can compare driving-school and instructor options in one place.";

export const DRIVE_HOW_IT_WORKS_STUDENTS_SUBTITLE =
  "Explore sample profiles, lesson packages, and example schedules. Live partner booking is not yet available.";

export const DRIVE_HOW_IT_WORKS_SCHOOLS_SUBTITLE =
  "Preview the planned partner experience for profiles, packages, and scheduling.";

export const DRIVE_HOW_IT_WORKS_TRUST_NOTE =
  "Marketplace profiles and schedules shown here are sample information. Future live listings will require partner verification.";

export const DRIVE_HOW_IT_WORKS_STUDENTS = [
  {
    step: "1",
    title: "Search Instructors Near You",
    body: "Enter an address to preview nearby sample profiles, packages, ratings, and example availability.",
  },
  {
    step: "2",
    title: "Compare Packages & Instructors",
    body: "Compare sample packages side by side, including lesson bundles, road-test preparation, languages, vehicles, and example pricing.",
  },
  {
    step: "3",
    title: "Preview a Lesson Time",
    body: "Choose a sample package and example time to explore the scheduling interface. This preview does not reserve a lesson.",
  },
  {
    step: "4",
    title: "Confirm a Future Live Listing",
    body: "When live partners are available, final school details, instructor status, pricing, and availability will need confirmation before a lesson.",
  },
];

export const DRIVE_HOW_IT_WORKS_SCHOOLS = [
  {
    step: "1",
    title: "Preview a School Profile",
    body: "The planned partner experience can present a school name, service area, contact details, offerings, and policies.",
  },
  {
    step: "2",
    title: "List Packages & Availability",
    body: "The planned tools can present single lessons, teen packages, road-test preparation, adult lessons, and schedule information.",
  },
  {
    step: "3",
    title: "Review Booking Concepts",
    body: "Confirmed booking delivery is planned but is not implemented in the current marketplace preview.",
  },
  {
    step: "4",
    title: "Assign an Instructor",
    body: "Instructor assignment and school-side lesson management are planned but are not active features.",
  },
  {
    step: "5",
    title: "Partnership Terms",
    body: "Partner enrollment, pricing, and commercial terms have not yet been finalized.",
  },
];

export const DRIVE_FAQ = [
  {
    question: "How is an online driving school different from a traditional one?",
    answer:
      "You can study theory online and preview how nearby lesson options could be compared. Live instructor verification and booking are not yet available.",
  },
  {
    question: "Are these live, verified instructors?",
    answer:
      "No. The current profiles, ratings, reviews, schedules, and school details are sample marketplace information. Future live profiles will require verification.",
  },
  {
    question: "How many lessons will I need?",
    answer:
      "Lesson needs vary by experience and goals. A future verified instructor can assess your skills and discuss an appropriate plan.",
  },
  {
    question: "Can I choose my own instructor?",
    answer:
      "The preview lets you compare sample profiles by language, vehicle, pricing, and example availability.",
  },
  {
    question: "What if I'm not happy after my first lesson?",
    answer:
      "You can return to the sample results and compare a different profile. Live switching policies will depend on future partner and booking terms.",
  },
  {
    question: "How does the exam booking work?",
    answer:
      "Road-test registration and guaranteed exam-day support are not currently provided. Confirm test scheduling and vehicle requirements through official California DMV guidance and any future verified lesson provider.",
  },
];
