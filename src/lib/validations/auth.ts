import { z } from "zod";
import { US_STATES } from "@/lib/us-states";

const stateCodes = US_STATES.map((state) => state.code) as [string, ...string[]];

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters");

const nameSchema = z
  .string()
  .trim()
  .min(1, "This field is required")
  .max(100, "Must be at most 100 characters");

const phoneSchema = z
  .string()
  .trim()
  .min(10, "Enter a valid phone number")
  .max(20, "Phone number is too long")
  .regex(/^[\d\s().+-]+$/, "Enter a valid phone number");

export const registerSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: z.string().trim().toLowerCase().email("Invalid email address").max(320),
    phone: phoneSchema,
    city: z.string().trim().min(1, "City is required").max(100),
    state: z.enum(stateCodes, { message: "Select your state" }),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password"),
    acceptTerms: z.literal(true, {
      message: "You must accept the terms to create an account",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(1, "Password is required").max(128),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: passwordSchema,
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
