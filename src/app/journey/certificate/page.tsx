"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HubLayout } from "@/components/hub/hub-layout";

interface CertData {
  eligible: boolean;
  user: { firstName: string; lastName: string; email: string };
  studyProgress: {
    hoursStudied: number;
    requiredHours: number;
  };
  previewDate: string;
}

export default function CertificatePage() {
  const [cert, setCert] = useState<CertData | null>(null);

  useEffect(() => {
    Promise.all([fetch("/api/progress/detailed"), fetch("/api/auth/me")]).then(
      async ([progressRes, meRes]) => {
        const progress = (await progressRes.json()) as {
          certificateEligible?: boolean;
          studyProgress?: { hoursStudied: number; requiredHours: number };
        };
        const me = (await meRes.json()) as {
          user?: { firstName: string; lastName: string; email: string };
        };

        setCert({
          eligible: progress.certificateEligible ?? false,
          user: me.user ?? {
            firstName: "Student",
            lastName: "",
            email: "",
          },
          studyProgress: progress.studyProgress ?? {
            hoursStudied: 0,
            requiredHours: 30,
          },
          previewDate: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
      }
    );
  }, []);

  if (!cert) {
    return (
      <HubLayout title="Certificate" backHref="/journey">
        <p>Loading...</p>
      </HubLayout>
    );
  }

  if (!cert.eligible) {
    return (
      <HubLayout title="Certificate" backHref="/journey">
        <div className="cert-locked">
          <h2>Certificate Preview Not Yet Available</h2>
          <p>
            The current preview becomes available after{" "}
            {cert.studyProgress.requiredHours} tracked study hours.
          </p>
          <p>
            Current progress:{" "}
            <strong>
              {cert.studyProgress.hoursStudied} /{" "}
              {cert.studyProgress.requiredHours} hours
            </strong>
          </p>
          <Link href="/series" className="btn btn-primary">
            Continue Studying
          </Link>
        </div>
      </HubLayout>
    );
  }

  function handlePrint() {
    window.print();
  }

  return (
    <HubLayout title="Certificate Preview" backHref="/journey">
      <div className="certificate" id="certificate">
        <div className="certificate__border">
          <p className="certificate__platform">Certificate preview</p>
          <h1 className="certificate__title">Driver Education Completion Preview</h1>
          <p className="certificate__subtitle">
            California Driver Education — 30-Hour Study Requirement
          </p>

          <p className="certificate__awarded">Prepared as a preview for</p>
          <p className="certificate__name">
            {cert.user.firstName} {cert.user.lastName}
          </p>
          <p className="certificate__body">
            has recorded{" "}
            <strong>{cert.studyProgress.hoursStudied} hours</strong> of
            study activity in the platform. Tracked time alone does not verify
            completion of every configured course requirement.
          </p>

          <p className="certificate__date">Previewed: {cert.previewDate}</p>
          <p className="certificate__footer">
            Preview only — not an officially issued or DMV-verified certificate
          </p>
        </div>
      </div>

      <div className="certificate__actions">
        <button type="button" className="btn btn-primary" onClick={handlePrint}>
          Print preview
        </button>
        <Link href="/journey" className="btn btn-secondary">
          Back to Journey
        </Link>
      </div>
      <p className="certificate__preview-note">
        Official issuance must verify all configured course-completion
        requirements and applicable provider requirements. This preview has no
        certificate identifier, signature, or verification record.
      </p>
    </HubLayout>
  );
}
