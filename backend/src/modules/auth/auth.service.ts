import prisma from "../../config/database.js";
import * as userRepository from "../users/users.repository.js";
import {
  hashPassword,
  comparePassword,
} from "../../utils/helpers/hash.helper.js";
import { generateToken } from "../../utils/helpers/jwt.helper.js";
import type {
  RegisterInput,
  LoginInput,
  AuthResponse,
} from "./types/auth.types.js";

export async function register(data: RegisterInput): Promise<AuthResponse> {
  const existingUser = await userRepository.findByEmail(data.email);

  if (existingUser) {
    const error = new Error("Email já está em uso") as Error & {
      statusCode: number;
    };
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.$transaction(async (tx) => {
    const createdUser = await tx.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });

    if (data.role === "DOCTOR" && data.specialties) {
      await tx.doctor.create({
        data: { specialties: data.specialties, userId: createdUser.id },
      });
    }

    if (data.role === "PATIENT") {
      await tx.patient.create({
        data: { userId: createdUser.id },
      });
    }

    return createdUser;
  });

  const token = generateToken({ userId: user.id, role: user.role });

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  };
}

export async function login(data: LoginInput): Promise<AuthResponse> {
  const user = await userRepository.findByEmail(data.email);

  if (!user) {
    const error = new Error("Credenciais inválidas") as Error & {
      statusCode: number;
    };
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await comparePassword(data.password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Credenciais inválidas") as Error & {
      statusCode: number;
    };
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({ userId: user.id, role: user.role });

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  };
}
