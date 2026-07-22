"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DriveSacramentoMap } from "@/components/drive/sacramento-instructor-map";
import { InstructorPhoto } from "@/components/drive/instructor-photo";
import { InstructorPricing } from "@/components/drive/instructor-pricing";
import type { DriveInstructor } from "@/lib/drive/config";
import { DRIVE_INSTRUCTORS } from "@/lib/drive/config";
import { distanceKm, formatDistanceKm } from "@/lib/drive/geo-utils";
import type { SacramentoInstructorPin } from "@/lib/drive/sacramento-map";
import { saveDriveSetup } from "@/lib/drive/drive-setup-storage";

type InstructorWithDistance = DriveInstructor & { distanceKm: number };

type DriveInstructorsSectionProps = {
  address?: string;
  mapVariant?: "preview" | "full";
  selectionMode?: boolean;
};

export function DriveInstructorsSection({
  address = "",
  mapVariant = "preview",
  selectionMode = false,
}: DriveInstructorsSectionProps) {
  const router = useRouter();
  const hasAddress = address.length > 0;
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    label: string;
  } | null>(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (!hasAddress) {
      setUserLocation(null);
      setLocating(false);
      return;
    }

    let cancelled = false;
    setUserLocation(null);
    setLocating(true);

    fetch(`/api/drive/geocode?address=${encodeURIComponent(address)}`)
      .then((res) => res.json())
      .then(
        (data: {
          location?: { lat: number; lng: number };
          formattedAddress?: string;
        }) => {
          if (cancelled) return;
          if (data.location) {
            setUserLocation({
              lat: data.location.lat,
              lng: data.location.lng,
              label: data.formattedAddress ?? address,
            });
          } else {
            setUserLocation(null);
          }
        }
      )
      .catch(() => {
        if (!cancelled) setUserLocation(null);
      })
      .finally(() => {
        if (!cancelled) setLocating(false);
      });

    return () => {
      cancelled = true;
    };
  }, [address, hasAddress]);

  const sortedInstructors = useMemo((): InstructorWithDistance[] => {
    let list = DRIVE_INSTRUCTORS.filter((i) => i.transmission === "Automatic");

    if (userLocation) {
      list = list
        .map((instructor) => ({
          ...instructor,
          distanceKm: distanceKm(userLocation, {
            lat: instructor.lat,
            lng: instructor.lng,
          }),
        }))
        .sort((a, b) => a.distanceKm - b.distanceKm);
    } else {
      list = list.map((instructor) => ({
        ...instructor,
        distanceKm: instructor.distanceKm,
      }));
    }

    return list;
  }, [userLocation]);

  const mapPins = useMemo((): SacramentoInstructorPin[] => {
    return sortedInstructors.map((instructor, index) => ({
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
      distanceKm: instructor.distanceKm,
      rank: userLocation ? index + 1 : undefined,
      hourlyRate: instructor.hourlyRate,
    }));
  }, [sortedInstructors, userLocation]);

  const closest = sortedInstructors[0];

  function chooseInstructor(instructorId: string) {
    if (!hasAddress) return;
    saveDriveSetup({ address, instructorId });
    router.push("/drive");
  }

  if (!hasAddress) {
    return null;
  }

  return (
    <section className="drive-instructors-section" aria-label="Nearby instructors">
      <div className="drive-alert drive-alert--success drive-alert--figma drive-instructors-alert">
        <p>
          {locating ? (
            <>Finding your location…</>
          ) : userLocation ? (
            <>
              <strong>{mapPins.length} instructors</strong> near you — sorted
              closest first. Nearest: <strong>{closest?.name}</strong> (
              {closest ? formatDistanceKm(closest.distanceKm) : ""})
            </>
          ) : (
            <>
              Showing instructors in Sacramento. We couldn&apos;t pin{" "}
              <strong>{address}</strong> — try a full street address.
            </>
          )}
        </p>
      </div>

      {locating ? (
        <div className="drive-map-empty drive-map-empty--loading">
          <p>Finding instructors near you…</p>
        </div>
      ) : (
        <>
      <div className="drive-instructors-map-wrap">
        <DriveSacramentoMap
          key={address}
          pins={mapPins}
          variant={mapVariant}
          addressQuery={hasAddress ? address : undefined}
          userLocation={userLocation}
          instructorCount={mapPins.length}
        />
      </div>

      <div className="drive-filter-strip">
        <span className="drive-filter-strip__tag">Automatic</span>
        <span className="drive-filter-strip__count">
          {userLocation
            ? `${mapPins.length} nearby · closest first`
            : `${mapPins.length} in region`}
        </span>
      </div>

      {hasAddress && userLocation ? (
        <div className="drive-meeting-point">
          <span aria-hidden>📍</span>
          <p>{address}</p>
          <span className="drive-meeting-point__dist drive-meeting-point__dist--you">
            You
          </span>
        </div>
      ) : null}

      <div
        className={`drive-instructor-list${
          userLocation ? " drive-instructor-list--ranked" : ""
        }`}
      >
        {sortedInstructors.map((instructor, index) => {
          const profileHref = hasAddress
            ? `/drive/instructors/${instructor.id}?address=${encodeURIComponent(address)}&select=1`
            : `/drive/instructors/${instructor.id}?select=1`;

          if (selectionMode && hasAddress) {
            return (
              <div
                key={instructor.id}
                className={`drive-instructor-card drive-instructor-card--selectable${
                  userLocation && index === 0
                    ? " drive-instructor-card--closest"
                    : ""
                }`}
              >
                {userLocation ? (
                  <span className="drive-instructor-card__rank">{index + 1}</span>
                ) : null}
                <InstructorPhoto instructor={instructor} />
                <div className="drive-instructor-card__body">
                  <h2>{instructor.name}</h2>
                  <p className="drive-instructor-card__school">{instructor.drivingSchoolName}</p>
                  <InstructorPricing
                    packages={instructor.packages}
                    hourlyRate={instructor.hourlyRate}
                    compact
                  />
                  <p className="drive-instructor-card__rating">
                    ★★★★★ {instructor.rating}{" "}
                    <span>({instructor.reviewCount})</span>
                  </p>
                  <p className="drive-instructor-card__vehicle">
                    🚗 {instructor.vehicle} · {instructor.transmission}
                    {userLocation ? (
                      <span className="drive-instructor-card__distance">
                        {formatDistanceKm(instructor.distanceKm)}
                      </span>
                    ) : null}
                  </p>
                  <span className="drive-instructor-card__availability">
                    ● {instructor.availability}
                  </span>
                </div>
                <div className="drive-instructor-card__actions">
                  <button
                    type="button"
                    className="drive-instructor-card__choose"
                    onClick={() => chooseInstructor(instructor.id)}
                  >
                    Choose
                  </button>
                  <Link href={profileHref} className="drive-instructor-card__view">
                    View
                  </Link>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={instructor.id}
              href={profileHref}
              className={`drive-instructor-card${
                userLocation && index === 0
                  ? " drive-instructor-card--closest"
                  : ""
              }`}
            >
              {userLocation ? (
                <span className="drive-instructor-card__rank">{index + 1}</span>
              ) : null}
              <InstructorPhoto instructor={instructor} />
              <div className="drive-instructor-card__body">
                <h2>{instructor.name}</h2>
                <p className="drive-instructor-card__school">{instructor.drivingSchoolName}</p>
                <InstructorPricing
                  packages={instructor.packages}
                  hourlyRate={instructor.hourlyRate}
                  compact
                />
                <p className="drive-instructor-card__rating">
                  ★★★★★ {instructor.rating}{" "}
                  <span>({instructor.reviewCount})</span>
                </p>
                <p className="drive-instructor-card__vehicle">
                  🚗 {instructor.vehicle} · {instructor.transmission}
                  {userLocation ? (
                    <span className="drive-instructor-card__distance">
                      {formatDistanceKm(instructor.distanceKm)}
                    </span>
                  ) : null}
                </p>
                <span className="drive-instructor-card__availability">
                  ● {instructor.availability}
                </span>
              </div>
              <span className="drive-instructor-card__chevron">›</span>
            </Link>
          );
        })}
      </div>
        </>
      )}
    </section>
  );
}
