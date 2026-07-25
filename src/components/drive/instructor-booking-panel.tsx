"use client";

import { useMemo, useState } from "react";
import type { DriveInstructor } from "@/lib/drive/config";
import {
  getDefaultScheduleDay,
  getSlotsForDay,
  WEEK_DAYS,
} from "@/lib/drive/instructor-schedule";

type InstructorBookingPanelProps = {
  instructor: DriveInstructor;
  confirmLabel?: string;
  onConfirm?: () => void;
};

export function InstructorBookingPanel({
  instructor,
  confirmLabel = "Review selected time",
  onConfirm,
}: InstructorBookingPanelProps) {
  const [selectedDay, setSelectedDay] = useState(
    instructor.defaultDay || getDefaultScheduleDay(instructor.weeklySlots)
  );
  const daySlots = useMemo(
    () => getSlotsForDay(instructor.weeklySlots, selectedDay),
    [instructor.weeklySlots, selectedDay]
  );
  const [selectedSlot, setSelectedSlot] = useState(
    () => getSlotsForDay(instructor.weeklySlots, instructor.defaultDay)[0] ?? ""
  );

  function handleDayChange(day: string) {
    setSelectedDay(day);
    const times = getSlotsForDay(instructor.weeklySlots, day);
    setSelectedSlot(times[0] ?? "");
  }

  return (
    <div className="drive-schedule drive-schedule--booking">
      <div className="drive-schedule__days">
        {WEEK_DAYS.map((day) => (
          <button
            key={day}
            type="button"
            className={`drive-schedule__day${
              selectedDay === day ? " drive-schedule__day--active" : ""
            }`}
            onClick={() => handleDayChange(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="drive-schedule__slots">
        {daySlots.length > 0 ? (
          daySlots.map((time) => (
            <button
              key={time}
              type="button"
              className={`drive-schedule__slot${
                selectedSlot === time ? " drive-schedule__slot--active" : ""
              }`}
              onClick={() => setSelectedSlot(time)}
            >
              {time}
            </button>
          ))
        ) : (
          <p className="drive-schedule__empty">No open slots this day</p>
        )}
      </div>
      <div className="drive-schedule__confirm">
        <div>
          <small>Selected slot</small>
          <strong>
            {selectedDay} · {selectedSlot || "Pick a time"}
          </strong>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onConfirm}
          disabled={!selectedSlot}
        >
          {confirmLabel}
        </button>
      </div>
      <p className="drive-schedule__note">
        Example availability only. Selecting a time does not create a confirmed booking.
      </p>
    </div>
  );
}
