import prisma from "../../config/database.js";

export async function findAll() {
  return prisma.patient.findMany({
    include: { user: { select: { id: true, name: true, email: true, role: true } } },
  });
}

export async function findById(id: string) {
  const patient = await prisma.patient.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true, email: true, role: true } } },
  });

  if (!patient) {
    const error = new Error("Paciente não encontrado") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return patient;
}

export async function update(id: string, data: { name?: string }) {
  const patient = await prisma.patient.findUnique({ where: { id } });

  if (!patient) {
    const error = new Error("Paciente não encontrado") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  if (data.name) {
    await prisma.user.update({ where: { id: patient.userId }, data: { name: data.name } });
  }

  return prisma.patient.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true, email: true, role: true } } },
  });
}

export async function remove(id: string) {
  const patient = await prisma.patient.findUnique({ where: { id } });

  if (!patient) {
    const error = new Error("Paciente não encontrado") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  await prisma.$transaction(async (tx) => {
    await tx.patient.delete({ where: { id } });
    await tx.user.delete({ where: { id: patient.userId } });
  });
}
