import type { DriveInstructor } from "@/lib/drive/instructors-data";

type InstructorPhotoProps = {
  instructor: Pick<DriveInstructor, "name" | "photoUrl">;
  className?: string;
  size?: "card" | "profile";
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function InstructorPhoto({
  instructor,
  className = "",
  size = "card",
}: InstructorPhotoProps) {
  const baseClass =
    size === "profile"
      ? "drive-profile__photo drive-profile__photo--image"
      : "drive-instructor-card__avatar drive-instructor-card__avatar--photo";

  return (
    <div className={`${baseClass} ${className}`.trim()}>
      <img
        src={instructor.photoUrl}
        alt={`${instructor.name} profile photo`}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <span className="drive-instructor-photo__fallback" aria-hidden>
        {initials(instructor.name)}
      </span>
    </div>
  );
}
