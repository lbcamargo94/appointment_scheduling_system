import prisma from "../../config/database.js";
import type { UserRole } from "@prisma/client";

const notDeleted = { deletedAt: null } as const;

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function findAll() {
  return prisma.user.findMany({ where: notDeleted, select: userSelect });
}

export async function findById(id: string) {
  return prisma.user.findUnique({ where: { id, ...notDeleted }, select: userSelect });
}

export async function findByEmail(email: string) {
  return prisma.user.findFirst({ where: { email, ...notDeleted } });
}

export async function create(data: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) {
  return prisma.user.create({ data });
}

export async function remove(id: string) {
  return prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });
}

export async function removeWithRelations(id: string, role: UserRole) {
  const now = new Date();

  return prisma.$transaction(async (tx) => {
    if (role === "DOCTOR") {
      await tx.doctor.updateMany({ where: { userId: id }, data: { deletedAt: now } });
    }
    if (role === "PATIENT") {
      await tx.patient.updateMany({ where: { userId: id }, data: { deletedAt: now } });
    }
    await tx.user.update({ where: { id }, data: { deletedAt: now } });
  });
}
