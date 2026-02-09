import prisma from "../../config/database.js";
import type { AppointmentStatus } from "@prisma/client";

const notDeleted = { deletedAt: null } as const;

const appointmentInclude = {
  doctor: { include: { user: { select: { name: true } } } },
  patient: { include: { user: { select: { name: true } } } },
} as const;

export async function create(data: {
  date: Date;
  reason: string;
  doctorId: string;
  patientId: string;
}) {
  return prisma.appointment.create({ data, include: appointmentInclude });
}

export async function findAll() {
  return prisma.appointment.findMany({
    where: notDeleted,
    include: appointmentInclude,
    orderBy: { date: "asc" },
  });
}

export async function findById(id: string) {
  return prisma.appointment.findUnique({
    where: { id, ...notDeleted },
    include: appointmentInclude,
  });
}

export async function findByIdSimple(id: string) {
  return prisma.appointment.findUnique({ where: { id, ...notDeleted } });
}

export async function updateStatus(id: string, status: AppointmentStatus) {
  return prisma.appointment.update({
    where: { id },
    data: { status },
    include: appointmentInclude,
  });
}

export async function remove(id: string) {
  return prisma.appointment.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}
