export function getConfiguredDemoStudentEmail(
  env: NodeJS.ProcessEnv = process.env
): string | null {
  const email = env.DEMO_STUDENT_EMAIL?.trim();
  return email ? email : null;
}
