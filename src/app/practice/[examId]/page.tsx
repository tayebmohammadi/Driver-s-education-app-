import { PracticeExamRunner } from "@/components/learning/practice-exam-runner";

type Params = { params: Promise<{ examId: string }> };

export default async function PracticeExamPage({ params }: Params) {
  const { examId } = await params;
  return (
    <main className="learn-page">
      <PracticeExamRunner examId={examId} />
    </main>
  );
}
