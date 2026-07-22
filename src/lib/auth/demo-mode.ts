export function isDemoAutoLoginEnabled(): boolean {
  return process.env.ENABLE_DEMO_AUTO_LOGIN === "true";
}
