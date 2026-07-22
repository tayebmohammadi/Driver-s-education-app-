import type { CourseProgressDTO } from "@/types/learning";

interface ProgressBarProps {
  progress: CourseProgressDTO | undefined;
  label?: string;
}

export function ProgressBar({ progress, label = "Course progress" }: ProgressBarProps) {
  const percentage = progress?.completionPercentage ?? 0;
  const completed = progress?.completedLessons ?? 0;
  const total = progress?.totalLessons ?? 0;

  return (
    <div className="progress-bar" aria-label={label}>
      <div className="progress-bar__header">
        <span className="progress-bar__label">{label}</span>
        <span className="progress-bar__value">{percentage}%</span>
      </div>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <p className="progress-bar__meta">
        {completed} of {total} lessons completed
      </p>
    </div>
  );
}

interface LessonProgressBadgeProps {
  completionPercentage?: number;
  isCompleted?: boolean;
}

export function LessonProgressBadge({
  completionPercentage = 0,
  isCompleted,
}: LessonProgressBadgeProps) {
  if (isCompleted || completionPercentage >= 100) {
    return <span className="lesson-badge lesson-badge--complete">Done</span>;
  }
  if (completionPercentage > 0) {
    return (
      <span className="lesson-badge lesson-badge--progress">{completionPercentage}%</span>
    );
  }
  return <span className="lesson-badge lesson-badge--pending">Pending</span>;
}
