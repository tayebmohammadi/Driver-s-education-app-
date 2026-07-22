"use client";

import dynamic from "next/dynamic";
import type { UserMapLocation } from "./interactive-instructor-map";
import type { SacramentoInstructorPin } from "@/lib/drive/sacramento-map";

const InteractiveInstructorMap = dynamic(
  () =>
    import("./interactive-instructor-map").then(
      (module) => module.InteractiveInstructorMap
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="drive-sacramento-map drive-sacramento-map--loading"
        style={{ height: 400 }}
      >
        <p>Loading map…</p>
      </div>
    ),
  }
);

export function DriveSacramentoMap({
  pins,
  variant = "full",
  selectedInstructorId,
  addressQuery,
  userLocation,
  instructorCount,
}: {
  pins: SacramentoInstructorPin[];
  variant?: "preview" | "full";
  selectedInstructorId?: string;
  addressQuery?: string;
  userLocation?: UserMapLocation | null;
  instructorCount?: number;
}) {
  return (
    <InteractiveInstructorMap
      pins={pins}
      variant={variant}
      selectedInstructorId={selectedInstructorId}
      addressQuery={addressQuery}
      userLocation={userLocation}
      instructorCount={instructorCount}
    />
  );
}
