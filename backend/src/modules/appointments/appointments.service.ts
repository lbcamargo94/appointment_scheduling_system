import prisma from "../../config/database.js";

interface CreateAppointmentInput {
  date: string;
  reason: string;
  doctorId: string;
  patientId: string;
}

interface UpdateStatusInput {
  status: "COMPLETED" | "CANCELED";
}

export async function create(data: CreateAppointmentInput) {
  const doctor = await prisma.doctor.findUnique({
    where: { id: data.doctorId },
  });
  if (!doctor) {
    const error = new Error("Médico não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  const patient = await prisma.patient.findUnique({
    where: { id: data.patientId },
  });
  if (!patient) {
    const error = new Error("Paciente não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  return prisma.appointment.create({
    data: {
      date: new Date(data.date),
      reason: data.reason,
      doctorId: data.doctorId,
      patientId: data.patientId,
    },
    include: {
      doctor: { include: { user: { select: { name: true } } } },
      patient: { include: { user: { select: { name: true } } } },
    },
  });
}

export async function findAll() {
  return prisma.appointment.findMany({
    include: {
      doctor: { include: { user: { select: { name: true } } } },
      patient: { include: { user: { select: { name: true } } } },
    },
    orderBy: { date: "asc" },
  });
}

export async function findById(id: string) {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      doctor: { include: { user: { select: { name: true } } } },
      patient: { include: { user: { select: { name: true } } } },
    },
  });

  if (!appointment) {
    const error = new Error("Agendamento não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  return appointment;
}

export async function updateStatus(id: string, data: UpdateStatusInput) {
  const appointment = await prisma.appointment.findUnique({ where: { id } });

  if (!appointment) {
    const error = new Error("Agendamento não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  if (appointment.status !== "SCHEDULED") {
    const error = new Error(
      "Apenas agendamentos com status SCHEDULED podem ser atualizados",
    ) as Error & { statusCode: number };
    error.statusCode = 400;
    throw error;
  }

  return prisma.appointment.update({
    where: { id },
    data: { status: data.status },
    include: {
      doctor: { include: { user: { select: { name: true } } } },
      patient: { include: { user: { select: { name: true } } } },
    },
  });
}

export async function remove(id: string) {
  const appointment = await prisma.appointment.findUnique({ where: { id } });

  if (!appointment) {
    const error = new Error("Agendamento não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  await prisma.appointment.delete({ where: { id } });
}
