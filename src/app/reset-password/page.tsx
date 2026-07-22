"use client";

import { FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  AuthAlert,
  AuthCard,
  AuthField,
  AuthForm,
  AuthLink,
  useAuthForm,
} from "@/components/auth/auth-form";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { error, success, isLoading, submit } = useAuthForm();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await submit("/api/auth/reset-password", {
      token,
      password: String(formData.get("password") ?? ""),
    });
  }

  if (!token) {
    return (
      <AuthCard title="Invalid reset link" subtitle="This password reset link is missing or invalid">
        <AuthAlert
          type="error"
          message="Please request a new password reset link."
        />
        <p className="auth-links">
          <AuthLink href="/forgot-password">Request new link</AuthLink>
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset password"
      subtitle="Choose a new password for your account"
      footer={
        success ? (
          <p>
            <AuthLink href="/login">Return to sign in</AuthLink>
          </p>
        ) : null
      }
    >
      {error ? <AuthAlert type="error" message={error} /> : null}
      {success ? (
        <AuthAlert type="success" message={success} />
      ) : (
        <AuthForm
          onSubmit={handleSubmit}
          submitLabel="Update password"
          isLoading={isLoading}
        >
          <AuthField
            id="password"
            label="New password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
          />
        </AuthForm>
      )}
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="auth-page">
      <Suspense fallback={<AuthCard title="Reset password" subtitle="Loading..." />}>
        <ResetPasswordContent />
      </Suspense>
    </main>
  );
}
