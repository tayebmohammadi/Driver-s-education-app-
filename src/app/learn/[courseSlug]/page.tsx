import { redirect, notFound } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";
import {
  getCourseBySlug,
  getFirstLessonIdForCourse,
} from "@/lib/learning/course-service";

type Params = { params: Promise<{ courseSlug: string }> };

export default async function CourseIndexPage({ params }: Params) {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");

  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);

  if (!course || !course.isPublished) {
    notFound();
  }

  const firstLessonId = await getFirstLessonIdForCourse(course.id);

  if (firstLessonId) {
    redirect(`/learn/${courseSlug}/lessons/${firstLessonId}`);
  }

  notFound();
}
