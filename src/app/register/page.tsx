"use client";

import { FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  AuthAlert,
  AuthCard,
  AuthCheckbox,
  AuthField,
  AuthForm,
  AuthLink,
  AuthSelect,
  useAuthForm,
} from "@/components/auth/auth-form";

function RegisterContent() {
  const searchParams = useSearchParams();
  const { error, success, isLoading, submit, setError } = useAuthForm();
  const redirectTo = searchParams.get("redirect") ?? "/home?welcome=1";
  const loginHref = redirectTo.startsWith("/")
    ? `/login?redirect=${encodeURIComponent(redirectTo)}`
    : "/login";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    await submit(
      "/api/auth/register",
      {
        firstName: String(formData.get("firstName") ?? ""),
        lastName: String(formData.get("lastName") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        city: String(formData.get("city") ?? ""),
        state: String(formData.get("state") ?? "CA"),
        password,
        confirmPassword,
        acceptTerms: formData.get("acceptTerms") === "true",
      },
      { redirectTo: `/home?welcome=1` }
    );
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Tell us a bit about yourself to get started with theory study and driving lessons."
      footer={
        <p>
          Already have an account? <AuthLink href={loginHref}>Sign in</AuthLink>
        </p>
      }
    >
      {error ? <AuthAlert type="error" message={error} /> : null}
      {success ? <AuthAlert type="success" message={success} /> : null}

      <AuthForm
        onSubmit={handleSubmit}
        submitLabel="Create account"
        isLoading={isLoading}
      >
        <div className="auth-form__row">
          <AuthField
            id="firstName"
            label="First name"
            name="firstName"
            autoComplete="given-name"
          />
          <AuthField
            id="lastName"
            label="Last name"
            name="lastName"
            autoComplete="family-name"
          />
        </div>

        <AuthField
          id="email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
        />
        <AuthField
          id="phone"
          label="Phone number"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(916) 555-0100"
        />

        <div className="auth-form__row">
          <AuthField
            id="city"
            label="City"
            name="city"
            autoComplete="address-level2"
          />
          <AuthSelect id="state" label="State" name="state" defaultValue="CA" />
        </div>

        <AuthField
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
        />
        <AuthField
          id="confirmPassword"
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          minLength={8}
        />

        <AuthCheckbox
          id="acceptTerms"
          name="acceptTerms"
          label="I agree to the terms of use and privacy policy."
        />
      </AuthForm>
    </AuthCard>
  );
}

export default function RegisterPage() {
  return (
    <main className="auth-page">
      <Suspense fallback={<AuthCard title="Create your account" subtitle="Loading..." />}>
        <RegisterContent />
      </Suspense>
    </main>
  );
}
