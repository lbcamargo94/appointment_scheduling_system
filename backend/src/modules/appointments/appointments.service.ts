import * as appointmentRepository from "./appointments.repository.js";
import * as doctorRepository from "../doctors/doctors.repository.js";
import * as patientRepository from "../patients/patients.repository.js";

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
  const doctor = await doctorRepository.findByIdSimple(data.doctorId);
  if (!doctor) {
    const error = new Error("Médico não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  const patient = await patientRepository.findByIdSimple(data.patientId);
  if (!patient) {
    const error = new Error("Paciente não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  return appointmentRepository.create({
    date: new Date(data.date),
    reason: data.reason,
    doctorId: data.doctorId,
    patientId: data.patientId,
  });
}

export async function findAll() {
  return appointmentRepository.findAll();
}

export async function findById(id: string) {
  const appointment = await appointmentRepository.findById(id);

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
  const appointment = await appointmentRepository.findByIdSimple(id);

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

  return appointmentRepository.updateStatus(id, data.status);
}

export async function remove(id: string) {
  const appointment = await appointmentRepository.findByIdSimple(id);

  if (!appointment) {
    const error = new Error("Agendamento não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  await appointmentRepository.remove(id);
}
