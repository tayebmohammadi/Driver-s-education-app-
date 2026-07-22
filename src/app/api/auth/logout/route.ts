import { createLogoutResponse } from "@/lib/auth/auth-response";

export async function POST() {
  return createLogoutResponse();
}
