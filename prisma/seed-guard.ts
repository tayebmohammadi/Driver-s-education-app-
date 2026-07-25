export function assertDestructiveSeedAllowed(
  env: NodeJS.ProcessEnv = process.env
): void {
  if (env.NODE_ENV === "production") {
    throw new Error("Destructive/demo seeding is disabled in production.");
  }

  if (env.ALLOW_DESTRUCTIVE_SEED !== "true") {
    throw new Error(
      "Destructive/demo seeding requires ALLOW_DESTRUCTIVE_SEED=true."
    );
  }
}
