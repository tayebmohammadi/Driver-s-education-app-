"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SafeUser } from "@/types/auth";

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function formatMemberSince(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function ProfileView({ user }: { user: SafeUser }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <>
      <section className="profile-photo-card">
        <div className="profile-photo-card__avatar" aria-hidden>
          {user.profilePhoto ? (
            <img src={user.profilePhoto} alt="" />
          ) : (
            getInitials(user.firstName, user.lastName)
          )}
        </div>
        <div className="profile-photo-card__meta">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.email}</p>
        </div>
      </section>

      <section className="profile-section">
        <h3 className="profile-section__title">Personal information</h3>
        <dl className="profile-info-list">
          <div>
            <dt>First name</dt>
            <dd>{user.firstName}</dd>
          </div>
          <div>
            <dt>Last name</dt>
            <dd>{user.lastName}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{user.phone ?? "Not set"}</dd>
          </div>
          <div>
            <dt>City</dt>
            <dd>{user.city ?? "Not set"}</dd>
          </div>
          <div>
            <dt>State</dt>
            <dd>{user.state ?? "Not set"}</dd>
          </div>
          <div>
            <dt>Profile photo</dt>
            <dd>{user.profilePhoto ? "Added" : "Not set"}</dd>
          </div>
        </dl>
      </section>

      <section className="profile-section">
        <h3 className="profile-section__title">Account</h3>
        <dl className="profile-info-list">
          <div>
            <dt>Account type</dt>
            <dd>{user.role === "ADMIN" ? "Administrator" : "Student"}</dd>
          </div>
          <div>
            <dt>Email status</dt>
            <dd>{user.emailVerified ? "Verified" : "Not verified"}</dd>
          </div>
          <div>
            <dt>Member since</dt>
            <dd>{formatMemberSince(user.createdAt)}</dd>
          </div>
        </dl>
      </section>

      <section className="profile-section">
        <h3 className="profile-section__title">Security</h3>
        <div className="profile-links">
          <Link href="/forgot-password" className="profile-link-row">
            <span>Change password</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <button type="button" className="profile-signout" onClick={handleLogout}>
        Sign out
      </button>
    </>
  );
}
