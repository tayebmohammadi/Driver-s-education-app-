import {
  buildInstructorPackages,
  type InstructorPackage,
} from "./pricing";
import {
  buildWeeklySlots,
  getDefaultScheduleDay,
  type WeeklySlots,
} from "./instructor-schedule";

export interface DriveDrivingSchool {
  id: string;
  name: string;
  city: string;
  licenseNumber: string;
}

export interface DriveInstructor {
  id: string;
  name: string;
  photoUrl: string;
  rating: number;
  reviewCount: number;
  vehicle: string;
  transmission: "Manual" | "Automatic";
  distanceKm: number;
  availability: string;
  bio: string;
  students: number;
  experienceYears: number;
  address: string;
  area: string;
  city: string;
  lat: number;
  lng: number;
  languages: string[];
  certification: string;
  hours: string;
  weeklySlots: WeeklySlots;
  defaultDay: string;
  drivingSchoolId: string;
  drivingSchoolName: string;
  hourlyRate: number;
  packages: InstructorPackage[];
}

export const DRIVE_DRIVING_SCHOOLS: DriveDrivingSchool[] = [
  {
    id: "capital-city-driving",
    name: "Capital City Driving School",
    city: "Sacramento",
    licenseNumber: "DS-4821",
  },
  {
    id: "sacramento-safe-driver",
    name: "Sacramento Safe Driver Academy",
    city: "Sacramento",
    licenseNumber: "DS-5190",
  },
];

const INSTRUCTOR_NAMES: { name: string; gender: "men" | "women" }[] = [
  { name: "Marcus Thompson", gender: "men" },
  { name: "Sarah Mitchell", gender: "women" },
  { name: "Karim Laurent", gender: "men" },
  { name: "James Ortiz", gender: "men" },
  { name: "Lisa Chen", gender: "women" },
  { name: "David Kim", gender: "men" },
  { name: "Maria Santos", gender: "women" },
  { name: "Ryan Patel", gender: "men" },
  { name: "Emma Wilson", gender: "women" },
  { name: "Carlos Mendez", gender: "men" },
  { name: "Nina Johnson", gender: "women" },
  { name: "Alex Turner", gender: "men" },
  { name: "Priya Sharma", gender: "women" },
  { name: "Mike O'Connor", gender: "men" },
  { name: "Jasmine Lee", gender: "women" },
  { name: "Tom Anderson", gender: "men" },
  { name: "Sofia Ramirez", gender: "women" },
  { name: "Ben Carter", gender: "men" },
  { name: "Rachel Nguyen", gender: "women" },
  { name: "Daniel Brooks", gender: "men" },
  { name: "Angela Foster", gender: "women" },
  { name: "Kevin Walsh", gender: "men" },
  { name: "Michelle Tran", gender: "women" },
  { name: "Brian Hughes", gender: "men" },
  { name: "Olivia Martinez", gender: "women" },
  { name: "Ethan Rivera", gender: "men" },
  { name: "Hannah Cohen", gender: "women" },
  { name: "Tyler Bennett", gender: "men" },
  { name: "Grace Okonkwo", gender: "women" },
  { name: "Jason Miller", gender: "men" },
  { name: "Aisha Patel", gender: "women" },
  { name: "Chris Morrison", gender: "men" },
  { name: "Lauren Fisher", gender: "women" },
  { name: "Derek Washington", gender: "men" },
  { name: "Nicole Adams", gender: "women" },
  { name: "Patrick O'Brien", gender: "men" },
  { name: "Vanessa Ruiz", gender: "women" },
  { name: "Steven Park", gender: "men" },
  { name: "Brittany Cole", gender: "women" },
  { name: "Andrew Singh", gender: "men" },
  { name: "Megan Sullivan", gender: "women" },
  { name: "Robert Kim", gender: "men" },
  { name: "Christina Boyd", gender: "women" },
  { name: "Luis Hernandez", gender: "men" },
  { name: "Tiffany Moore", gender: "women" },
  { name: "Nathan Scott", gender: "men" },
  { name: "Valerie James", gender: "women" },
  { name: "Gregory Price", gender: "men" },
  { name: "Samantha Reed", gender: "women" },
  { name: "Jerome Taylor", gender: "men" },
  { name: "Diana Campbell", gender: "women" },
  { name: "Frank Wright", gender: "men" },
  { name: "Yuki Tanaka", gender: "women" },
  { name: "Omar Hassan", gender: "men" },
  { name: "Elena Vasquez", gender: "women" },
  { name: "William Foster", gender: "men" },
  { name: "Chloe Bennett", gender: "women" },
];

const REGION_LOCATIONS = [
  { area: "Oak Park", city: "Sacramento", lat: 38.5382, lng: -121.4578, street: "217 12th Ave" },
  { area: "Midtown", city: "Sacramento", lat: 38.5748, lng: -121.4786, street: "142 J St" },
  { area: "East Sacramento", city: "Sacramento", lat: 38.5661, lng: -121.4492, street: "88 H St" },
  { area: "Downtown", city: "Sacramento", lat: 38.5724, lng: -121.4689, street: "915 L St" },
  { area: "Natomas", city: "Sacramento", lat: 38.6384, lng: -121.5121, street: "4600 Natomas Blvd" },
  { area: "Arden-Arcade", city: "Sacramento", lat: 38.5568, lng: -121.4214, street: "1400 Ethan Way" },
  { area: "Land Park", city: "Sacramento", lat: 38.5431, lng: -121.5018, street: "2800 Freeport Blvd" },
  { area: "Old Sacramento", city: "Sacramento", lat: 38.5839, lng: -121.5046, street: "100 I St" },
  { area: "Curtis Park", city: "Sacramento", lat: 38.5583, lng: -121.4772, street: "2419 21st St" },
  { area: "Del Paso Heights", city: "Sacramento", lat: 38.6297, lng: -121.4548, street: "800 Grand Ave" },
  { area: "Greenhaven", city: "Sacramento", lat: 38.5216, lng: -121.5094, street: "7325 Greenhaven Dr" },
  { area: "Tahoe Park", city: "Sacramento", lat: 38.5612, lng: -121.4365, street: "3500 59th St" },
  { area: "North Sacramento", city: "Sacramento", lat: 38.5924, lng: -121.4821, street: "1200 Del Paso Blvd" },
  { area: "Pocket", city: "Sacramento", lat: 38.5489, lng: -121.4653, street: "650 Florin Rd" },
  { area: "Alkali Flat", city: "Sacramento", lat: 38.5678, lng: -121.4912, street: "400 Q St" },
  { area: "Gardenland", city: "Sacramento", lat: 38.6142, lng: -121.4987, street: "1800 Northgate Blvd" },
  { area: "South Land Park", city: "Sacramento", lat: 38.5346, lng: -121.4889, street: "6100 Riverside Blvd" },
  { area: "Fulton-El Camino", city: "Sacramento", lat: 38.6018, lng: -121.4316, street: "2200 Fulton Ave" },
  { area: "Davis Downtown", city: "Davis", lat: 38.5449, lng: -121.7405, street: "123 G St" },
  { area: "UC Davis", city: "Davis", lat: 38.5382, lng: -121.7614, street: "1 Shields Ave" },
  { area: "Laguna", city: "Elk Grove", lat: 38.4212, lng: -121.4234, street: "7400 Laguna Blvd" },
  { area: "Old Town Elk Grove", city: "Elk Grove", lat: 38.4088, lng: -121.3716, street: "9100 Laguna Main St" },
  { area: "Galleria", city: "Roseville", lat: 38.7521, lng: -121.288, street: "1100 Galleria Blvd" },
  { area: "Historic Roseville", city: "Roseville", lat: 38.7485, lng: -121.2834, street: "501 Vernon St" },
  { area: "Palladio", city: "Folsom", lat: 38.6779, lng: -121.176, street: "300 Palladio Pkwy" },
  { area: "Historic Folsom", city: "Folsom", lat: 38.6825, lng: -121.1698, street: "200 Wool St" },
  { area: "Sunrise", city: "Rancho Cordova", lat: 38.5891, lng: -121.3027, street: "10698 White Rock Rd" },
  { area: "Gold River", city: "Rancho Cordova", lat: 38.6262, lng: -121.2466, street: "2201 Gold Rush Dr" },
  { area: "Bridge District", city: "West Sacramento", lat: 38.5805, lng: -121.5302, street: "800 West Capitol Ave" },
  { area: "Southport", city: "West Sacramento", lat: 38.5521, lng: -121.5456, street: "2100 Lake Washington Blvd" },
  { area: "Sunrise Marketplace", city: "Citrus Heights", lat: 38.7071, lng: -121.281, street: "6100 Greenback Ln" },
  { area: "Fair Oaks Village", city: "Fair Oaks", lat: 38.6446, lng: -121.2722, street: "4849 Dewey Dr" },
  { area: "Lincoln Crossing", city: "Lincoln", lat: 38.8916, lng: -121.293, street: "900 Joiner Pkwy" },
  { area: "Rocklin Town Center", city: "Rocklin", lat: 38.7907, lng: -121.2357, street: "4800 Granite Dr" },
  { area: "Orangevale", city: "Orangevale", lat: 38.6785, lng: -121.2258, street: "9400 Greenback Ln" },
  { area: "Carmichael", city: "Carmichael", lat: 38.6171, lng: -121.3283, street: "5800 Marconi Ave" },
  { area: "Antelope", city: "Antelope", lat: 38.7082, lng: -121.3299, street: "7800 Highgate Rd" },
  { area: "North Highlands", city: "North Highlands", lat: 38.6713, lng: -121.3722, street: "5600 Watt Ave" },
  { area: "Florin", city: "Sacramento", lat: 38.4962, lng: -121.4088, street: "5900 Florin Rd" },
  { area: "Vineyard", city: "Sacramento", lat: 38.4645, lng: -121.3488, street: "8900 Elk Grove Florin Rd" },
];

const VEHICLES = [
  "Toyota Corolla",
  "Honda Civic",
  "Volkswagen Golf",
  "Hyundai Elantra",
  "Mazda 3",
  "Kia Forte",
  "Subaru Impreza",
  "Ford Focus",
  "Chevrolet Cruze",
  "Nissan Sentra",
  "Toyota Camry",
  "Honda Accord",
];

const BIOS = [
  "Certified instructor specializing in nervous beginners and highway confidence.",
  "Patient, calm teaching style focused on city and suburban driving skills.",
  "Experienced with DMV test routes and automatic vehicle training.",
  "Former examiner who helps students pass on their first attempt.",
  "Bilingual instructor with a strong track record for teen drivers.",
  "Highway and parallel parking specialist serving Sacramento neighborhoods.",
  "Structured lessons with clear feedback after every session.",
  "Friendly coach who builds confidence behind the wheel quickly.",
  "Expert in defensive driving and hazard awareness training.",
  "Flexible scheduling with evening and weekend availability.",
];

const AVAILABILITY = [
  "Available today",
  "Available tomorrow",
  "Available this week",
  "Available next week",
  "Available weekends",
];

const LANGUAGE_SETS = [
  ["English"],
  ["English", "Spanish"],
  ["English", "French"],
  ["English", "Mandarin"],
  ["English", "Vietnamese"],
  ["English", "Hindi"],
  ["English", "Arabic"],
  ["English", "Tagalog"],
];

const CERTIFICATIONS = [
  "State-certified · DMV approved",
  "State-certified · ADI qualified",
  "State-certified · 10+ years",
  "State-certified · defensive driving",
  "State-certified · teen specialist",
];

const HOURS = [
  "Mon–Sat · 7am–9pm",
  "7 days/week · 6am–11pm",
  "7 days/week · 8am–10pm",
  "Mon–Fri · 8am–8pm",
  "Tue–Sun · 9am–7pm",
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pick<T>(items: T[], index: number): T {
  return items[index % items.length];
}

function roundRating(index: number): number {
  const ratings = [4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
  return ratings[index % ratings.length];
}

function getSchoolForInstructorIndex(index: number): DriveDrivingSchool {
  return DRIVE_DRIVING_SCHOOLS[index % DRIVE_DRIVING_SCHOOLS.length];
}

function locationsForSchool(school: DriveDrivingSchool) {
  const matches = REGION_LOCATIONS.filter((location) => location.city === school.city);
  return matches.length > 0 ? matches : REGION_LOCATIONS;
}

function buildInstructor(
  entry: { name: string; gender: "men" | "women" },
  index: number
): DriveInstructor {
  const school = getSchoolForInstructorIndex(index);
  const schoolLocations = locationsForSchool(school);
  const location = pick(schoolLocations, index);
  const transmission: "Manual" | "Automatic" = "Automatic";
  const portraitIndex = (index * 7 + (entry.gender === "women" ? 3 : 11)) % 99;

  const hourlyRate = 79 + (index % 5) * 4;
  const weeklySlots = buildWeeklySlots(index);
  const defaultDay = getDefaultScheduleDay(weeklySlots);

  return {
    id: slugify(entry.name),
    name: entry.name,
    photoUrl: `https://randomuser.me/api/portraits/med/${entry.gender}/${portraitIndex}.jpg`,
    rating: roundRating(index),
    reviewCount: 85 + (index * 17) % 420,
    vehicle: pick(VEHICLES, index),
    transmission,
    distanceKm: Math.round(((index * 0.31) % 4.8 + 0.2) * 10) / 10,
    availability: pick(AVAILABILITY, index),
    bio: pick(BIOS, index),
    students: 120 + (index * 23) % 500,
    experienceYears: 3 + (index % 14),
    address: `${location.street} — ${location.area}, ${location.city}`,
    area: `${location.area}, ${location.city}`,
    city: location.city,
    lat: location.lat + ((index % 5) - 2) * 0.003,
    lng: location.lng + ((index % 7) - 3) * 0.003,
    languages: pick(LANGUAGE_SETS, index),
    certification: pick(CERTIFICATIONS, index),
    hours: pick(HOURS, index),
    weeklySlots,
    defaultDay,
    drivingSchoolId: school.id,
    drivingSchoolName: school.name,
    hourlyRate,
    packages: buildInstructorPackages(hourlyRate),
  };
}

export function getDriveDrivingSchool(id: string): DriveDrivingSchool | undefined {
  return DRIVE_DRIVING_SCHOOLS.find((school) => school.id === id);
}

export const DRIVE_INSTRUCTORS: DriveInstructor[] = INSTRUCTOR_NAMES.map(
  (entry, index) => buildInstructor(entry, index)
);

export function getInstructorsByDrivingSchool(schoolId: string): DriveInstructor[] {
  return DRIVE_INSTRUCTORS.filter((instructor) => instructor.drivingSchoolId === schoolId);
}

export function getDriveInstructor(id: string): DriveInstructor | undefined {
  return DRIVE_INSTRUCTORS.find((instructor) => instructor.id === id);
}
