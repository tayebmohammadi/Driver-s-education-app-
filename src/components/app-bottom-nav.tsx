"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DriveCarIcon,
  DriveProfileIcon,
  DriveTheoryIcon,
} from "@/components/drive/drive-icons";

function isDrivingTab(pathname: string) {
  return (
    pathname === "/drive" ||
    pathname.startsWith("/drive/book") ||
    pathname.startsWith("/drive/instructors") ||
    pathname.startsWith("/drive/checklist") ||
    pathname.startsWith("/drive/about") ||
    pathname.startsWith("/drive/packs")
  );
}

function isTheoryTab(pathname: string) {
  return (
    pathname !== "/" &&
    !pathname.startsWith("/drive") &&
    pathname !== "/progress" &&
    pathname !== "/profile" &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/register")
  );
}

const HIDDEN_PREFIXES = [
  "/get-started",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/admin",
];

export function AppBottomNav() {
  const pathname = usePathname();

  if (
    pathname === "/" ||
    HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    return null;
  }

  return (
    <nav className="drive-bottom-nav" aria-label="Main navigation">
      <Link
        href="/home"
        className={`drive-bottom-nav__item${
          isTheoryTab(pathname) ? " drive-bottom-nav__item--active" : ""
        }`}
        aria-current={isTheoryTab(pathname) ? "page" : undefined}
      >
        <span className="drive-bottom-nav__icon" aria-hidden>
          <DriveTheoryIcon />
        </span>
        <span>Theory</span>
      </Link>
      <Link
        href="/drive"
        className={`drive-bottom-nav__item${
          isDrivingTab(pathname) ? " drive-bottom-nav__item--active" : ""
        }`}
        aria-label="Driving"
        aria-current={isDrivingTab(pathname) ? "page" : undefined}
      >
        <span className="drive-bottom-nav__icon" aria-hidden>
          <DriveCarIcon />
        </span>
        <span>Driving</span>
      </Link>
      <Link
        href="/profile"
        className={`drive-bottom-nav__item${
          pathname === "/profile" || pathname.startsWith("/profile/")
            ? " drive-bottom-nav__item--active"
            : ""
        }`}
        aria-current={
          pathname === "/profile" || pathname.startsWith("/profile/")
            ? "page"
            : undefined
        }
      >
        <span className="drive-bottom-nav__icon" aria-hidden>
          <DriveProfileIcon />
        </span>
        <span>Profile</span>
      </Link>
    </nav>
  );
}
