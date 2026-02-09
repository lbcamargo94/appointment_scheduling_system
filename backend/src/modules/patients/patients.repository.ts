import prisma from "../../config/database.js";

const notDeleted = { deletedAt: null } as const;

const patientInclude = {
  user: { select: { id: true, name: true, email: true, role: true } },
} as const;

export async function findAll() {
  return prisma.patient.findMany({ where: notDeleted, include: patientInclude });
}

export async function findById(id: string) {
  return prisma.patient.findUnique({ where: { id, ...notDeleted }, include: patientInclude });
}

export async function findByIdSimple(id: string) {
  return prisma.patient.findUnique({ where: { id, ...notDeleted } });
}

export async function create(data: { userId: string }) {
  return prisma.patient.create({ data });
}

export async function updateUserName(userId: string, name: string) {
  await prisma.user.update({ where: { id: userId }, data: { name } });
  return prisma.patient.findFirst({
    where: { userId, ...notDeleted },
    include: patientInclude,
  });
}

export async function remove(id: string, userId: string) {
  const now = new Date();

  return prisma.$transaction(async (tx) => {
    await tx.patient.update({ where: { id }, data: { deletedAt: now } });
    await tx.user.update({ where: { id: userId }, data: { deletedAt: now } });
  });
}
