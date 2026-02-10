import type { UserRole } from "@prisma/client";

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  specialties?: string[];
}

export interface LoginInput {
  email: string;
  password: string;
}
