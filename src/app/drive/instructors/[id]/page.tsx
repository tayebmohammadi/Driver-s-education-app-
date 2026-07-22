"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { DriveLayout } from "@/components/drive/drive-layout";
import { InstructorBookingPanel } from "@/components/drive/instructor-booking-panel";
import { InstructorPhoto } from "@/components/drive/instructor-photo";
import { InstructorPricing } from "@/components/drive/instructor-pricing";
import { formatDrivePrice } from "@/lib/drive/pricing";
import { getDriveInstructor } from "@/lib/drive/config";
import {
  loadDriveSetup,
  saveDriveSetup,
  type DriveSetup,
} from "@/lib/drive/drive-setup-storage";

function InstructorProfileContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const instructor = getDriveInstructor(id);
  const [setup, setSetup] = useState<DriveSetup | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSetup(loadDriveSetup());
    setHydrated(true);
  }, []);

  const userAddress =
    searchParams.get("address")?.trim() ?? setup?.address ?? "";
  const hasAddress = userAddress.length > 0;
  const isFirstTimePick = searchParams.get("select") === "1";
  const isMyInstructor = hydrated && setup?.instructorId === id;

  const backHref = isMyInstructor
    ? "/drive"
    : hasAddress
      ? `/drive?change=1&instructors=1&address=${encodeURIComponent(userAddress)}`
      : "/drive?change=1&instructors=1";

  function chooseInstructor() {
    if (!hasAddress) {
      router.push(
        `/drive?instructors=1&address=${encodeURIComponent(userAddress)}`
      );
      return;
    }
    saveDriveSetup({ address: userAddress, instructorId: id });
    router.push("/drive");
  }

  if (!hydrated) {
    return (
      <DriveLayout>
        <p>Loading…</p>
      </DriveLayout>
    );
  }

  if (!instructor) {
    return (
      <DriveLayout>
        <p>Instructor not found.</p>
        <Link href="/drive">← Back to driving</Link>
      </DriveLayout>
    );
  }

  return (
    <DriveLayout>
      <Link href={backHref} className="drive-back-link">
        ‹ Back
      </Link>

      <div className="drive-profile">
        <div className="drive-profile__main">
          <h1>{instructor.name}</h1>
          <p className="drive-profile__school">{instructor.drivingSchoolName}</p>
          <p className="drive-profile__bio">{instructor.bio}</p>
          <p className="drive-profile__meta">
            ★ {instructor.rating} ({instructor.reviewCount})
            {hasAddress ? ` · 📍 ${instructor.distanceKm} km` : null}
            {` · ${formatDrivePrice(instructor.hourlyRate)}/hr`}
          </p>
          <span className="drive-badge drive-badge--neutral">
            {instructor.transmission}
          </span>

          <div className="drive-subtabs drive-subtabs--inline">
            <button
              type="button"
              className="drive-subtabs__tab drive-subtabs__tab--active"
            >
              About
            </button>
            <button type="button" className="drive-subtabs__tab">
              Reviews
            </button>
          </div>

          <div className="drive-profile__stats">
            <div>
              <strong>{instructor.students}</strong>
              <span>students</span>
            </div>
            <div>
              <strong>{instructor.experienceYears}y</strong>
              <span>experience</span>
            </div>
          </div>

          <dl className="drive-info-rows">
            <div>
              <dt>🏫 Driving school</dt>
              <dd>{instructor.drivingSchoolName}</dd>
            </div>
            <div>
              <dt>🚗 Car</dt>
              <dd>{instructor.vehicle} (2022)</dd>
            </div>
            {hasAddress ? (
              <div>
                <dt>📍 Address</dt>
                <dd>{instructor.address}</dd>
              </div>
            ) : null}
            <div>
              <dt>🌐 Languages</dt>
              <dd>{instructor.languages.join(", ")}</dd>
            </div>
            <div>
              <dt>🏅 Certification</dt>
              <dd>{instructor.certification}</dd>
            </div>
            <div>
              <dt>🕐 Available hours</dt>
              <dd>{instructor.hours}</dd>
            </div>
          </dl>
        </div>

        <aside className="drive-profile__aside">
          <InstructorPhoto instructor={instructor} size="profile" />
          <span className="drive-instructor-card__availability">
            ● {instructor.availability}
          </span>
          {isFirstTimePick && hasAddress ? (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={chooseInstructor}
            >
              Choose as my instructor
            </button>
          ) : (
            <Link href="/drive/packs" className="btn btn-primary btn-sm">
              View driving offers
            </Link>
          )}
        </aside>
      </div>

      <InstructorPricing
        packages={instructor.packages}
        hourlyRate={instructor.hourlyRate}
      />

      <section className="drive-schedule">
        <h2>Available slots this week</h2>
        <InstructorBookingPanel
          instructor={instructor}
          confirmLabel={
            isFirstTimePick && hasAddress ? "Choose instructor" : "Confirm"
          }
          onConfirm={
            isFirstTimePick && hasAddress ? chooseInstructor : undefined
          }
        />
      </section>
    </DriveLayout>
  );
}

export default function InstructorProfilePage() {
  return (
    <Suspense
      fallback={
        <DriveLayout>
          <p>Loading…</p>
        </DriveLayout>
      }
    >
      <InstructorProfileContent />
    </Suspense>
  );
}
