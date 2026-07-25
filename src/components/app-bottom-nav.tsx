"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

type StudentNavItem = {
  key: "home" | "learn" | "journey" | "driving" | "account";
  label: string;
  href: string;
  icon: ReactNode;
  matches: (pathname: string) => boolean;
};

function matchesPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 11 9-8 9 8v9H15v-6H9v6H3v-9Z" />
    </svg>
  );
}

function LearnIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
    </svg>
  );
}

function JourneyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M7.5 16.5 16.5 7.5M8 6h4M6 8v4M12 18h4M18 12v4" />
    </svg>
  );
}

function DrivingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 11 2-5h10l2 5M3 13a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5H3v-5ZM6 18v2M18 18v2M7 14h.01M17 14h.01" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </svg>
  );
}

export const STUDENT_NAV_ITEMS: StudentNavItem[] = [
  {
    key: "home",
    label: "Home",
    href: "/home",
    icon: <HomeIcon />,
    matches: (pathname) =>
      matchesPrefix(pathname, "/home") || matchesPrefix(pathname, "/dashboard"),
  },
  {
    key: "learn",
    label: "Learn",
    href: "/learn",
    icon: <LearnIcon />,
    matches: (pathname) =>
      ["/learn", "/series", "/topics", "/qna", "/practice", "/weak-areas", "/progress"].some(
        (prefix) => matchesPrefix(pathname, prefix)
      ),
  },
  {
    key: "journey",
    label: "Journey",
    href: "/journey",
    icon: <JourneyIcon />,
    matches: (pathname) => matchesPrefix(pathname, "/journey"),
  },
  {
    key: "driving",
    label: "Driving",
    href: "/drive",
    icon: <DrivingIcon />,
    matches: (pathname) =>
      matchesPrefix(pathname, "/drive") ||
      matchesPrefix(pathname, "/lessons") ||
      matchesPrefix(pathname, "/bookings"),
  },
  {
    key: "account",
    label: "Account",
    href: "/profile",
    icon: <AccountIcon />,
    matches: (pathname) => matchesPrefix(pathname, "/profile"),
  },
];

const HIDDEN_PREFIXES = [
  "/get-started",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/admin",
];

function isHidden(pathname: string) {
  return (
    pathname === "/" ||
    HIDDEN_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix))
  );
}

export function AppBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (isHidden(pathname)) return null;

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      <header className="student-desktop-nav">
        <div className="student-desktop-nav__inner">
          <Link href="/home" className="student-brand" aria-label="DMV Study student home">
            <span className="student-brand__mark" aria-hidden="true"><span /></span>
            <span>DMV Study</span>
          </Link>

          <nav className="student-desktop-nav__links" aria-label="Student navigation">
            {STUDENT_NAV_ITEMS.filter((item) => item.key !== "account").map((item) => {
              const active = item.matches(pathname);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={active ? "is-active" : ""}
                  aria-current={active ? "page" : undefined}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <details className="student-account-menu">
            <summary
              className={STUDENT_NAV_ITEMS[4].matches(pathname) ? "is-active" : ""}
              aria-label="Open account menu"
            >
              <span aria-hidden="true">{STUDENT_NAV_ITEMS[4].icon}</span>
              <span>Account</span>
              <span className="student-account-menu__chevron" aria-hidden="true">⌄</span>
            </summary>
            <div className="student-account-menu__panel">
              <Link href="/profile">Profile &amp; account</Link>
              <Link href="/progress">Learning progress</Link>
              <button type="button" onClick={signOut}>Sign out</button>
            </div>
          </details>
        </div>
      </header>

      <nav className="student-mobile-nav" aria-label="Student navigation">
        {STUDENT_NAV_ITEMS.map((item) => {
          const active = item.matches(pathname);
          return (
            <Link
              key={item.key}
              href={item.href}
              className={active ? "is-active" : ""}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
            >
              <span className="student-mobile-nav__icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
