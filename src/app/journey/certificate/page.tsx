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
  issuedDate: string;
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
          issuedDate: new Date().toLocaleDateString("en-US", {
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
          <h2>Certificate Not Yet Available</h2>
          <p>
            Complete {cert.studyProgress.requiredHours} hours of study to unlock
            your free completion certificate.
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
    <HubLayout title="Completion Certificate" backHref="/journey">
      <div className="certificate" id="certificate">
        <div className="certificate__border">
          <p className="certificate__platform">Driver Education Platform</p>
          <h1 className="certificate__title">Certificate of Completion</h1>
          <p className="certificate__subtitle">
            California Driver Education — 30-Hour Study Requirement
          </p>

          <p className="certificate__awarded">This certifies that</p>
          <p className="certificate__name">
            {cert.user.firstName} {cert.user.lastName}
          </p>
          <p className="certificate__body">
            has successfully completed{" "}
            <strong>{cert.studyProgress.hoursStudied} hours</strong> of
            California driver education study, meeting the 30-hour requirement
            for driver education certification.
          </p>

          <p className="certificate__date">Issued: {cert.issuedDate}</p>
          <p className="certificate__footer">
            Free certificate issued by Driver Education Platform
          </p>
        </div>
      </div>

      <div className="certificate__actions">
        <button type="button" className="btn btn-primary" onClick={handlePrint}>
          Print Certificate
        </button>
        <Link href="/journey" className="btn btn-secondary">
          Back to Journey
        </Link>
      </div>
    </HubLayout>
  );
}
