"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AuthAlert,
  AuthCard,
  AuthField,
  AuthForm,
  AuthLink,
} from "@/components/auth/auth-form";
import {
  getSafeRoleRedirect,
  getSafeStudentRedirect,
} from "@/lib/auth/safe-redirect";

function LoginContent() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const redirectTo = getSafeStudentRedirect(searchParams.get("redirect"));
  const registerHref = `/register?redirect=${encodeURIComponent(redirectTo)}`;

  useEffect(() => {
    const verified = searchParams.get("verified");
    const registered = searchParams.get("registered");
    const authError = searchParams.get("error");

    if (verified === "success") {
      setSuccess("Email verified successfully. You can now sign in.");
    } else if (verified === "already") {
      setSuccess("Your email is already verified.");
    } else if (registered === "1") {
      setSuccess("Account created! Sign in with the email and password you just set.");
    }

    if (authError === "invalid-verification-token") {
      setError("Invalid or expired verification link.");
    } else if (authError === "verification-failed") {
      setError("Email verification failed. Please try again.");
    }
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(formData.get("email") ?? ""),
          password: String(formData.get("password") ?? ""),
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        user?: { role: "STUDENT" | "ADMIN" };
      };

      if (!response.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }

      const destination = data.user?.role
        ? getSafeRoleRedirect(redirectTo, data.user.role)
        : "/home";
      window.location.href = destination;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title="Sign in"
      subtitle="Use your email and password to access your account."
      footer={
        <p>
          New here? <AuthLink href={registerHref}>Create a free account</AuthLink>
        </p>
      }
    >
      {error ? <AuthAlert type="error" message={error} /> : null}
      {success ? <AuthAlert type="success" message={success} /> : null}

      <AuthForm onSubmit={handleSubmit} submitLabel="Sign in" isLoading={isLoading}>
        <AuthField
          id="email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
        />
        <AuthField
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <AuthLink href="/forgot-password">Forgot password?</AuthLink>
      </AuthForm>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <main className="auth-page">
      <Suspense fallback={<AuthCard title="Sign in" subtitle="Loading..." />}>
        <LoginContent />
      </Suspense>
    </main>
  );
}
