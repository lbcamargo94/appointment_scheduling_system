import * as doctorRepository from "./doctors.repository.js";

export async function findAll() {
  return doctorRepository.findAll();
}

export async function findById(id: string) {
  const doctor = await doctorRepository.findById(id);

  if (!doctor) {
    const error = new Error("Médico não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  return doctor;
}

export async function update(
  id: string,
  data: { specialty?: string; name?: string },
) {
  const doctor = await doctorRepository.findByIdSimple(id);

  if (!doctor) {
    const error = new Error("Médico não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  const doctorData = data.specialty ? { specialty: data.specialty } : {};
  const userData = data.name ? { name: data.name } : undefined;

  return doctorRepository.update(id, doctorData, userData);
}

export async function remove(id: string) {
  const doctor = await doctorRepository.findByIdSimple(id);

  if (!doctor) {
    const error = new Error("Médico não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  await doctorRepository.remove(id, doctor.userId);
}
