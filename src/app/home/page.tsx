"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { HubLayout } from "@/components/hub/hub-layout";
import type { SafeUser } from "@/types/auth";

interface HubData {
  studyTime: {
    hoursStudied: number;
    requiredHours: number;
    percentage: number;
  };
  progress: {
    seriesCompleted: number;
    totalSeries: number;
    lessonsCompleted: number;
  };
  nextSeries: { number: number; title: string } | null;
  certificateEligible?: boolean;
}

const SECTIONS = [
  {
    href: "/journey",
    title: "License Journey",
    subtitle: "Your roadmap",
    description:
      "Step-by-step guide from 30 hours of study to getting your driver's license.",
    icon: "🗺️",
    color: "hub-card--featured",
    featured: true,
  },
  {
    href: "/series",
    title: "Series",
    subtitle: "30 learning modules",
    description: "Structured lessons with a final exam for each series.",
    icon: "📚",
    color: "hub-card--blue",
  },
  {
    href: "/topics",
    title: "Study by Topic",
    subtitle: "11 DMV topics",
    description: "Learn road signs, rules, parking, and more by category.",
    icon: "🎯",
    color: "hub-card--green",
  },
  {
    href: "/qna",
    title: "Questions & Answers",
    subtitle: "Practice bank",
    description: "Random questions with instant explanations. No exam pressure.",
    icon: "❓",
    color: "hub-card--purple",
  },
  {
    href: "/progress",
    title: "My Progress",
    subtitle: "All-in-one tracker",
    description:
      "Study hours, performance insights, weak & strong areas in one place.",
    icon: "📊",
    color: "hub-card--teal",
  },
];

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hub, setHub] = useState<HubData | null>(null);
  const [user, setUser] = useState<SafeUser | null>(null);

  const showWelcome = searchParams.get("welcome") === "1";

  useEffect(() => {
    Promise.all([fetch("/api/home"), fetch("/api/auth/me")]).then(
      async ([hubRes, meRes]) => {
        const hubData = (await hubRes.json()) as { hub?: HubData };
        const meData = (await meRes.json()) as { user?: SafeUser };
        setHub(hubData.hub ?? null);
        setUser(meData.user ?? null);
      }
    );
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <HubLayout showBack={false}>
      <div className="hub-home">
        {showWelcome ? (
          <div className="hub-banner hub-banner--success">
            <strong>Welcome to Driver Education!</strong>
            <p>
              Your account is ready. Check your email to verify your address, then
              explore theory study or book a driving lesson.
            </p>
          </div>
        ) : null}

        <div className="hub-home__welcome">
          <div>
            <h1>Welcome{user?.firstName ? `, ${user.firstName}` : ""}</h1>
            <p className="hub-home__tagline">
              California DMV permit study — pass your test with confidence.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>

        <Link href="/drive" className="hub-journey-banner">
          <span className="hub-journey-banner__icon">🚗</span>
          <div>
            <strong>Find driving lessons</strong>
            <p>Compare instructors from licensed driving schools near you</p>
          </div>
          <span className="hub-journey-banner__arrow">→</span>
        </Link>

        {hub?.nextSeries ? (
          <Link
            href={`/series/${hub.nextSeries.number}`}
            className="hub-continue"
          >
            Continue: Series {hub.nextSeries.number} — {hub.nextSeries.title} →
          </Link>
        ) : null}

        <div className="hub-cards">
          {SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className={`hub-card ${section.color}${section.featured ? " hub-card--featured-card" : ""}`}
            >
              <span className="hub-card__icon">{section.icon}</span>
              <div>
                <h2>{section.title}</h2>
                <p className="hub-card__subtitle">{section.subtitle}</p>
                <p className="hub-card__desc">{section.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </HubLayout>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <HubLayout showBack={false}>
          <div className="hub-home">
            <p className="hub-home__tagline">Loading...</p>
          </div>
        </HubLayout>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
