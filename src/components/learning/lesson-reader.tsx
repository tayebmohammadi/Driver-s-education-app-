import type { LessonDetailDTO } from "@/types/learning";
import { ContentBlockRenderer } from "./content-block-renderer";
import { LessonProgressBadge } from "./progress-bar";
import { QuizEngine } from "./quiz-engine";
import { CompleteLessonButton } from "./complete-lesson-button";
import { StudyTimeTracker } from "@/components/hub/study-time-tracker";

interface LessonReaderProps {
  lesson: LessonDetailDTO;
}

export function LessonReader({ lesson }: LessonReaderProps) {
  return (
    <article className="lesson-reader">
      <StudyTimeTracker activityType="LESSON" resourceId={lesson.id} />
      <header className="lesson-reader__header">
        <p className="lesson-reader__breadcrumb">
          {lesson.unitTitle} / {lesson.chapterTitle}
        </p>
        <div className="lesson-reader__title-row">
          <h1>{lesson.title}</h1>
          <LessonProgressBadge
            completionPercentage={lesson.progress?.completionPercentage}
            isCompleted={lesson.progress?.completionPercentage === 100}
          />
        </div>
        <p className="lesson-reader__description">{lesson.description}</p>
        <p className="lesson-reader__meta">
          Estimated duration: {lesson.estimatedDuration} min
        </p>
      </header>

      <ContentBlockRenderer blocks={lesson.contentBlocks} />

      <QuizEngine lessonId={lesson.id} />

      <footer className="lesson-reader__footer">
        <CompleteLessonButton lessonId={lesson.id} isCompleted={lesson.progress?.completionPercentage === 100} />
      </footer>
    </article>
  );
}
