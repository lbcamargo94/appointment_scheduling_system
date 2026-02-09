import prisma from "../../config/database.js";

export async function findAll() {
  return prisma.doctor.findMany({
    include: { user: { select: { id: true, name: true, email: true, role: true } } },
  });
}

export async function findById(id: string) {
  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true, email: true, role: true } } },
  });

  if (!doctor) {
    const error = new Error("Médico não encontrado") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return doctor;
}

export async function update(id: string, data: { specialty?: string; name?: string }) {
  const doctor = await prisma.doctor.findUnique({ where: { id } });

  if (!doctor) {
    const error = new Error("Médico não encontrado") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return prisma.$transaction(async (tx) => {
    if (data.name) {
      await tx.user.update({ where: { id: doctor.userId }, data: { name: data.name } });
    }

    return tx.doctor.update({
      where: { id },
      data: { ...(data.specialty && { specialty: data.specialty }) },
      include: { user: { select: { id: true, name: true, email: true, role: true } } },
    });
  });
}

export async function remove(id: string) {
  const doctor = await prisma.doctor.findUnique({ where: { id } });

  if (!doctor) {
    const error = new Error("Médico não encontrado") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  await prisma.$transaction(async (tx) => {
    await tx.doctor.delete({ where: { id } });
    await tx.user.delete({ where: { id: doctor.userId } });
  });
}
