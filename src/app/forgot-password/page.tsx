"use client";

import { FormEvent } from "react";
import {
  AuthAlert,
  AuthCard,
  AuthField,
  AuthForm,
  AuthLink,
  useAuthForm,
} from "@/components/auth/auth-form";

export default function ForgotPasswordPage() {
  const { error, success, isLoading, submit } = useAuthForm();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await submit("/api/auth/forgot-password", {
      email: String(formData.get("email") ?? ""),
    });
  }

  return (
    <main className="auth-page">
      <AuthCard
        title="Forgot password"
        subtitle="We will email you a reset link if the account exists"
        footer={
          <p>
            Remember your password? <AuthLink href="/login">Sign in</AuthLink>
          </p>
        }
      >
        {error ? <AuthAlert type="error" message={error} /> : null}
        {success ? <AuthAlert type="success" message={success} /> : null}

        <AuthForm
          onSubmit={handleSubmit}
          submitLabel="Send reset link"
          isLoading={isLoading}
        >
          <AuthField
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
          />
        </AuthForm>
      </AuthCard>
    </main>
  );
}
