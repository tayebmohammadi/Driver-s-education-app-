"use client";

import Link from "next/link";
import { InstructorPhoto } from "@/components/drive/instructor-photo";
import { InstructorPricing } from "@/components/drive/instructor-pricing";
import type { DriveInstructor } from "@/lib/drive/config";
import { formatDistanceMiles } from "@/lib/drive/geo-utils";

type SelectedInstructorCardProps = {
  instructor: DriveInstructor;
  address: string;
  distanceKm?: number;
  onChangeInstructor: () => void;
};

export function SelectedInstructorCard({
  instructor,
  address,
  distanceKm,
  onChangeInstructor,
}: SelectedInstructorCardProps) {
  const profileHref = `/drive/instructors/${instructor.id}?address=${encodeURIComponent(address)}`;

  return (
    <section className="drive-my-instructor" aria-label="Your instructor">
      <div className="drive-my-instructor__header">
        <p className="drive-my-instructor__label">Selected sample instructor</p>
        <button
          type="button"
          className="drive-my-instructor__change"
          onClick={onChangeInstructor}
        >
          Change instructor
        </button>
      </div>

      <Link href={profileHref} className="drive-my-instructor__card">
        <InstructorPhoto instructor={instructor} />
        <div className="drive-my-instructor__body">
          <h2>{instructor.name}</h2>
          <p className="drive-section-label">Profile preview</p>
          <p className="drive-instructor-card__school">{instructor.drivingSchoolName}</p>
          <InstructorPricing
            packages={instructor.packages}
            hourlyRate={instructor.hourlyRate}
            compact
          />
          <p className="drive-my-instructor__rating">
            Sample rating ★ {instructor.rating}{" "}
            <span>({instructor.reviewCount} sample reviews)</span>
          </p>
          <p className="drive-my-instructor__vehicle">
            🚗 {instructor.vehicle} · {instructor.transmission}
            {distanceKm !== undefined ? (
              <span> · {formatDistanceMiles(distanceKm)}</span>
            ) : null}
          </p>
          <span className="drive-instructor-card__availability">
            ● Example availability: {instructor.availability}
          </span>
        </div>
        <span className="drive-instructor-card__chevron">›</span>
      </Link>

      <div className="drive-my-instructor__address">
        <span aria-hidden>📍</span>
        <p>{address}</p>
      </div>
    </section>
  );
}
