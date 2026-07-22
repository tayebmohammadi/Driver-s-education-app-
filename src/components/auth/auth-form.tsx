"use client";

import Link from "next/link";
import { FormEvent, ReactNode, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { US_STATES } from "@/lib/us-states";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <p className="auth-card__brand">Driver Education</p>
        <h1>{title}</h1>
        {subtitle ? <p className="auth-card__subtitle">{subtitle}</p> : null}
      </div>
      {children}
      {footer ? <div className="auth-card__footer">{footer}</div> : null}
    </div>
  );
}

interface AuthFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  children: ReactNode;
  submitLabel: string;
  isLoading?: boolean;
}

export function AuthForm({
  onSubmit,
  children,
  submitLabel,
  isLoading = false,
}: AuthFormProps) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {children}
      <button className="btn btn-primary" type="submit" disabled={isLoading}>
        {isLoading ? "Please wait..." : submitLabel}
      </button>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  name: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  defaultValue?: string;
  placeholder?: string;
}

export function AuthField({
  id,
  label,
  type = "text",
  name,
  autoComplete,
  required = true,
  minLength,
  defaultValue,
  placeholder,
}: FieldProps) {
  return (
    <label className="auth-field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </label>
  );
}

export function AuthSelect({
  id,
  label,
  name,
  defaultValue = "CA",
  required = true,
}: {
  id: string;
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="auth-field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} name={name} defaultValue={defaultValue} required={required}>
        {US_STATES.map((state) => (
          <option key={state.code} value={state.code}>
            {state.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export function AuthCheckbox({
  id,
  name,
  label,
  required = true,
}: {
  id: string;
  name: string;
  label: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="auth-checkbox" htmlFor={id}>
      <input id={id} name={name} type="checkbox" value="true" required={required} />
      <span>{label}</span>
    </label>
  );
}

export function AuthAlert({
  type,
  message,
}: {
  type: "error" | "success" | "info";
  message: string;
}) {
  return <div className={`auth-alert auth-alert--${type}`}>{message}</div>;
}

export function AuthLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="auth-link" href={href}>
      {children}
    </Link>
  );
}

export function useAuthForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function submit(
    endpoint: string,
    body: Record<string, string | boolean>,
    options?: { redirectTo?: string }
  ) {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }

      if (options?.redirectTo) {
        window.location.href = options.redirectTo;
        return;
      }

      setSuccess(data.message ?? "Success");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return { error, success, isLoading, submit, setError, setSuccess };
}

export function AuthRedirectQuery() {
  return (
    <Suspense fallback={null}>
      <AuthRedirectField />
    </Suspense>
  );
}

function AuthRedirectField() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  if (!redirect?.startsWith("/") || redirect.startsWith("//")) {
    return null;
  }

  return <input type="hidden" name="redirect" value={redirect} />;
}
