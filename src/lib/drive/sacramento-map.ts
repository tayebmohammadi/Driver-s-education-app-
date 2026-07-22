import { DRIVE_INSTRUCTORS } from "./instructors-data";

export interface SacramentoInstructorPin {
  id: string;
  name: string;
  drivingSchoolName: string;
  lat: number;
  lng: number;
  area: string;
  transmission: "Manual" | "Automatic";
  rating: number;
  instructorId: string;
  distanceKm?: number;
  rank?: number;
  photoUrl?: string;
  hourlyRate?: number;
}

export const SACRAMENTO_MAP_CENTER: [number, number] = [38.58, -121.42];

export const SACRAMENTO_INSTRUCTOR_PINS: SacramentoInstructorPin[] =
  DRIVE_INSTRUCTORS.map((instructor) => ({
    id: instructor.id,
    name: instructor.name,
    drivingSchoolName: instructor.drivingSchoolName,
    lat: instructor.lat,
    lng: instructor.lng,
    area: instructor.area,
    transmission: instructor.transmission,
    rating: instructor.rating,
    instructorId: instructor.id,
    photoUrl: instructor.photoUrl,
    hourlyRate: instructor.hourlyRate,
  }));

export function filterSacramentoPins(
  transmission?: "manual" | "auto"
): SacramentoInstructorPin[] {
  if (!transmission) return SACRAMENTO_INSTRUCTOR_PINS;

  const target = transmission === "manual" ? "Manual" : "Automatic";
  return SACRAMENTO_INSTRUCTOR_PINS.filter(
    (pin) => pin.transmission === target
  );
}
