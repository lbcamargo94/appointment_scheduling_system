import prisma from "../../config/database.js";

export async function findAll() {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
  });
}

export async function findById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
  });

  if (!user) {
    const error = new Error("Usuário não encontrado") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return user;
}

export async function remove(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    const error = new Error("Usuário não encontrado") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  await prisma.$transaction(async (tx) => {
    if (user.role === "DOCTOR") {
      await tx.doctor.deleteMany({ where: { userId: id } });
    }
    if (user.role === "PATIENT") {
      await tx.patient.deleteMany({ where: { userId: id } });
    }
    await tx.user.delete({ where: { id } });
  });
}
