import { notFound, redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";
import {
  getCourseBySlug,
  getLessonById,
} from "@/lib/learning/course-service";
import {
  getCourseNavigationWithProgress,
  getLessonProgress,
  touchCourseAccess,
} from "@/lib/learning/progress-service";
import { LearningLayout } from "@/components/learning/learning-layout";
import { LessonReader } from "@/components/learning/lesson-reader";

type Params = {
  params: Promise<{ courseSlug: string; lessonId: string }>;
};

export default async function LessonPage({ params }: Params) {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");

  const { courseSlug, lessonId } = await params;

  const [course, lesson] = await Promise.all([
    getCourseBySlug(courseSlug),
    getLessonById(lessonId),
  ]);

  if (!course || !course.isPublished || !lesson) {
    notFound();
  }

  if (lesson.courseSlug !== courseSlug) {
    notFound();
  }

  const [navigation, progress] = await Promise.all([
    getCourseNavigationWithProgress(course, session.userId),
    getLessonProgress(session.userId, lessonId),
    touchCourseAccess(session.userId, course.id),
  ]);

  const lessonWithProgress = { ...lesson, progress: progress ?? undefined };

  return (
    <LearningLayout
      navigation={navigation}
      courseSlug={courseSlug}
      activeLessonId={lessonId}
    >
      <LessonReader lesson={lessonWithProgress} />
    </LearningLayout>
  );
}
