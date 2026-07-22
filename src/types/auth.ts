import { UserRole } from "@prisma/client";

export interface JwtPayload {
  userId: string;
  role: UserRole;
  emailVerified: boolean;
}

export interface SafeUser {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  profilePhoto: string | null;
  emailVerified: boolean;
  createdAt: Date;
}

export function toSafeUser(user: {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone?: string | null;
  city?: string | null;
  state?: string | null;
  profilePhoto: string | null;
  emailVerified: boolean;
  createdAt: Date;
}): SafeUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone ?? null,
    city: user.city ?? null,
    state: user.state ?? null,
    profilePhoto: user.profilePhoto,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
  };
}
