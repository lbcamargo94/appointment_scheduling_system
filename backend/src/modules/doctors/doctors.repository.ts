import prisma from "../../config/database.js";

const notDeleted = { deletedAt: null } as const;

const doctorInclude = {
  user: { select: { id: true, name: true, email: true, role: true } },
} as const;

export async function findAll() {
  return prisma.doctor.findMany({ where: notDeleted, include: doctorInclude });
}

export async function findById(id: string) {
  return prisma.doctor.findUnique({ where: { id, ...notDeleted }, include: doctorInclude });
}

export async function findByIdSimple(id: string) {
  return prisma.doctor.findUnique({ where: { id, ...notDeleted } });
}

export async function create(data: { specialty: string; userId: string }) {
  return prisma.doctor.create({ data });
}

export async function update(
  id: string,
  doctorData: { specialty?: string },
  userData?: { name?: string },
) {
  return prisma.$transaction(async (tx) => {
    if (userData?.name) {
      const doctor = await tx.doctor.findUnique({ where: { id } });
      if (doctor) {
        await tx.user.update({
          where: { id: doctor.userId },
          data: { name: userData.name },
        });
      }
    }

    return tx.doctor.update({
      where: { id },
      data: doctorData,
      include: doctorInclude,
    });
  });
}

export async function remove(id: string, userId: string) {
  const now = new Date();

  return prisma.$transaction(async (tx) => {
    await tx.doctor.update({ where: { id }, data: { deletedAt: now } });
    await tx.user.update({ where: { id: userId }, data: { deletedAt: now } });
  });
}
