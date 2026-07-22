import { createHash, randomBytes } from "crypto";

export function generateSecureToken(): string {
  return randomBytes(32).toString("hex");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function getTokenExpiry(hours: number): Date {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

export function isTokenExpired(expiry: Date | null | undefined): boolean {
  if (!expiry) return true;
  return expiry.getTime() < Date.now();
}
