"use client";

import { useCallback, useEffect, useRef } from "react";

const IDLE_MS = 120_000;
const FLUSH_INTERVAL_MS = 30_000;

export function StudyTimeTracker({
  activityType,
  resourceId,
}: {
  activityType: "LESSON" | "EXAM" | "QUIZ" | "PRACTICE";
  resourceId?: string;
}) {
  const activeRef = useRef(true);
  const lastActiveRef = useRef(Date.now());
  const accumulatedRef = useRef(0);
  const lastFlushRef = useRef(Date.now());

  const flush = useCallback(async () => {
    const seconds = accumulatedRef.current;
    if (seconds < 5) return;
    accumulatedRef.current = 0;
    await fetch("/api/study-time", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seconds, activityType, resourceId }),
    }).catch(() => {});
  }, [activityType, resourceId]);

  useEffect(() => {
    function onActivity() {
      lastActiveRef.current = Date.now();
      activeRef.current = true;
    }

    function onVisibility() {
      activeRef.current = document.visibilityState === "visible";
      if (activeRef.current) lastActiveRef.current = Date.now();
    }

    window.addEventListener("mousemove", onActivity);
    window.addEventListener("keydown", onActivity);
    window.addEventListener("scroll", onActivity);
    window.addEventListener("touchstart", onActivity);
    document.addEventListener("visibilitychange", onVisibility);

    const tick = setInterval(() => {
      const now = Date.now();
      const idle = now - lastActiveRef.current > IDLE_MS;

      if (activeRef.current && !idle && document.visibilityState === "visible") {
        accumulatedRef.current += 1;
      }

      if (now - lastFlushRef.current >= FLUSH_INTERVAL_MS) {
        lastFlushRef.current = now;
        flush();
      }
    }, 1000);

    return () => {
      clearInterval(tick);
      flush();
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("touchstart", onActivity);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [flush]);

  return null;
}
