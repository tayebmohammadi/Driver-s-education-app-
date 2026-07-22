"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { DriveInstructorsSection } from "@/components/drive/drive-instructors-section";
import { InstructorBookingPanel } from "@/components/drive/instructor-booking-panel";
import { DriveLayout } from "@/components/drive/drive-layout";
import { SelectedInstructorCard } from "@/components/drive/selected-instructor-card";
import {
  DriveCalendarIcon,
  DriveChatIcon,
  DriveChevronIcon,
  DrivePinIcon,
  DriveTrainingIcon,
} from "@/components/drive/drive-icons";
import {
  DRIVE_HOME_RESOURCES,
  getDriveInstructor,
} from "@/lib/drive/config";
import { distanceKm } from "@/lib/drive/geo-utils";
import {
  loadDriveSetup,
  loadDriveSetupFromAccount,
  type DriveSetup,
} from "@/lib/drive/drive-setup-storage";

const RESOURCE_ICONS = {
  calendar: DriveCalendarIcon,
  training: DriveTrainingIcon,
} as const;

function DriveHomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlAddress = searchParams.get("address")?.trim() ?? "";
  const changeFromUrl = searchParams.get("change") === "1";
  const instructorsFromUrl = searchParams.get("instructors") === "1";
  const shouldBrowseFromUrl = instructorsFromUrl && urlAddress.length > 0;

  const [setup, setSetup] = useState<DriveSetup | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [changeMode, setChangeMode] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [browseInstructors, setBrowseInstructors] = useState(false);
  const [userCoords, setUserCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    setSetup(loadDriveSetup());
    setHydrated(true);

    loadDriveSetupFromAccount()
      .then((saved) => {
        if (!cancelled) setSetup(saved);
      })
      .catch(() => {
        // Local storage fallback is already applied above.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    setChangeMode(changeFromUrl);

    if (changeFromUrl) {
      if (shouldBrowseFromUrl) {
        setAddress(urlAddress);
        setBrowseInstructors(true);
      } else {
        setAddress("");
        setBrowseInstructors(false);
      }
      return;
    }

    if (urlAddress) {
      setAddress(urlAddress);
      setBrowseInstructors(shouldBrowseFromUrl);
      return;
    }

    setAddress((current) => current || setup?.address || "");
    setBrowseInstructors(false);
  }, [
    hydrated,
    changeFromUrl,
    shouldBrowseFromUrl,
    urlAddress,
    setup?.address,
  ]);

  useEffect(() => {
    if (hydrated && searchParams.get("book") === "1" && setup) {
      setBookingOpen(true);
    }
  }, [hydrated, setup, searchParams]);

  const showOnboarding = !setup || changeMode;
  const trimmedAddress = address.trim();
  const showInstructorResults =
    trimmedAddress.length > 0 && (shouldBrowseFromUrl || browseInstructors);

  const selectedInstructor = setup
    ? getDriveInstructor(setup.instructorId)
    : undefined;

  useEffect(() => {
    if (!hydrated || !setup?.address || showOnboarding) {
      setUserCoords(null);
      return;
    }

    let cancelled = false;

    fetch(`/api/drive/geocode?address=${encodeURIComponent(setup.address)}`)
      .then((res) => res.json())
      .then((data: { location?: { lat: number; lng: number } }) => {
        if (!cancelled && data.location) {
          setUserCoords(data.location);
        }
      })
      .catch(() => {
        if (!cancelled) setUserCoords(null);
      });

    return () => {
      cancelled = true;
    };
  }, [hydrated, setup?.address, showOnboarding]);

  const selectedDistance = useMemo(() => {
    if (!selectedInstructor || !userCoords) return undefined;
    return distanceKm(userCoords, {
      lat: selectedInstructor.lat,
      lng: selectedInstructor.lng,
    });
  }, [selectedInstructor, userCoords]);

  function handleAddressChange(value: string) {
    setAddress(value);

    if (!value.trim() && shouldBrowseFromUrl) {
      setBrowseInstructors(false);
      const params = new URLSearchParams();
      if (changeMode) params.set("change", "1");
      const query = params.toString();
      router.replace(query ? `/drive?${query}` : "/drive");
    }
  }

  function openInstructorBrowse(nextAddress?: string) {
    const trimmed = (nextAddress ?? address).trim();
    if (!trimmed) {
      setBrowseInstructors(false);
      router.push(changeMode ? "/drive?change=1" : "/drive");
      return;
    }

    setAddress(trimmed);
    setBrowseInstructors(true);
    const params = new URLSearchParams();
    params.set("instructors", "1");
    params.set("address", trimmed);
    if (changeMode) params.set("change", "1");
    router.push(`/drive?${params.toString()}`);
  }

  function handleChangeInstructor() {
    setBookingOpen(false);
    setChangeMode(true);
    setBrowseInstructors(false);
    setAddress("");
    router.push("/drive?change=1");
  }

  function openBooking() {
    setBookingOpen(true);
    window.history.replaceState(null, "", "/drive?book=1");
  }

  function closeBooking() {
    setBookingOpen(false);
    router.replace("/drive");
  }

  if (!hydrated) {
    return (
      <DriveLayout shell="home">
        <p>Loading…</p>
      </DriveLayout>
    );
  }

  if (bookingOpen && selectedInstructor && setup && !showOnboarding) {
    return (
      <DriveLayout shell="home">
        <button type="button" className="drive-back-link" onClick={closeBooking}>
          ‹ Back
        </button>
        <InstructorBookingPanel
          instructor={selectedInstructor}
          confirmLabel="Book lesson"
        />
      </DriveLayout>
    );
  }

  return (
    <DriveLayout shell="home">
      {showOnboarding ? (
        <>
          <form
            className="drive-search"
            onSubmit={(e) => {
              e.preventDefault();
              openInstructorBrowse(address);
            }}
          >
            <span className="drive-search__icon" aria-hidden>
              <DrivePinIcon />
            </span>
            <input
              type="text"
              placeholder="Enter your address to find nearby instructors..."
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
            />
            <button type="submit" className="drive-search__btn">
              Search
            </button>
          </form>

          {showInstructorResults ? (
            <DriveInstructorsSection
              key={trimmedAddress}
              address={trimmedAddress}
              mapVariant="preview"
              selectionMode
            />
          ) : null}
        </>
      ) : selectedInstructor && setup ? (
        <SelectedInstructorCard
          instructor={selectedInstructor}
          address={setup.address}
          distanceKm={selectedDistance}
          onChangeInstructor={handleChangeInstructor}
        />
      ) : null}

      {!showOnboarding ? (
        <div className="drive-cta-row">
          <Link
            href="/drive/packs"
            className="drive-cta-row__btn drive-cta-row__btn--offers"
          >
            View driving offers
          </Link>
          <button
            type="button"
            className="drive-cta-row__btn drive-cta-row__btn--instructors"
            onClick={openBooking}
          >
            Book a lesson
          </button>
        </div>
      ) : (
        <div className="drive-cta-row">
          <Link
            href="/drive/packs"
            className="drive-cta-row__btn drive-cta-row__btn--offers"
          >
            View driving offers
          </Link>
          <button
            type="button"
            className="drive-cta-row__btn drive-cta-row__btn--instructors"
            onClick={() => openInstructorBrowse()}
            disabled={!trimmedAddress}
          >
            See instructors
          </button>
        </div>
      )}

      <p className="drive-section-label drive-section-label--caps">
        Everything about driving
      </p>
      <div className="drive-resource-grid">
        {DRIVE_HOME_RESOURCES.map((card) => {
          const Icon = RESOURCE_ICONS[card.icon];
          return (
            <Link
              key={card.href}
              href={card.href}
              className="drive-resource-card"
            >
              <span className="drive-resource-card__icon" aria-hidden>
                <Icon />
              </span>
              <p>{card.title}</p>
              <span className="drive-resource-card__arrow" aria-hidden>
                <DriveChevronIcon />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="drive-home-footer">
        <div className="drive-reviews-bar">
          <span
            className="drive-reviews-bar__rating"
            aria-label="4.7 out of 5 stars"
          >
            <span className="drive-reviews-bar__stars" aria-hidden>
              ★★★★★
            </span>
            <strong>4.7/5</strong>
          </span>
          <Link href="/drive/about#reviews" className="drive-reviews-bar__link">
            See reviews
          </Link>
        </div>

        <div className="drive-callback drive-callback--footer">
          <span className="drive-callback__icon" aria-hidden>
            <DriveChatIcon />
          </span>
          <p>A question? We call you back free 📞</p>
          <button type="button" className="drive-callback__link">
            Ask a question
          </button>
        </div>
      </div>
    </DriveLayout>
  );
}

export default function DriveHomePage() {
  return (
    <Suspense
      fallback={
        <DriveLayout shell="home">
          <p>Loading…</p>
        </DriveLayout>
      }
    >
      <DriveHomeContent />
    </Suspense>
  );
}
