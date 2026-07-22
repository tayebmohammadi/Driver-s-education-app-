import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function jsonSuccess<T extends Record<string, unknown>>(
  data: T,
  status = 200
) {
  return NextResponse.json(data, { status });
}

export function handleValidationError(error: ZodError) {
  const message = error.errors[0]?.message ?? "Invalid input";
  return jsonError(message, 400);
}
