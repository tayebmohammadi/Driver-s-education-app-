import { getConfiguredDemoStudentEmail } from "@/lib/auth/demo-student";

export function isDemoAutoLoginEnabled(
  env: NodeJS.ProcessEnv = process.env
): boolean {
  return (
    env.NODE_ENV !== "production" &&
    env.ENABLE_DEMO_AUTO_LOGIN === "true" &&
    getConfiguredDemoStudentEmail(env) !== null
  );
}
