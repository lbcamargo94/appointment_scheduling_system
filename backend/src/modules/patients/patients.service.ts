import * as patientRepository from "./patients.repository.js";

export async function findAll() {
  return patientRepository.findAll();
}

export async function findById(id: string) {
  const patient = await patientRepository.findById(id);

  if (!patient) {
    const error = new Error("Paciente não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  return patient;
}

export async function update(id: string, data: { name?: string }) {
  const patient = await patientRepository.findByIdSimple(id);

  if (!patient) {
    const error = new Error("Paciente não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  if (data.name) {
    return patientRepository.updateUserName(patient.userId, data.name);
  }

  return patientRepository.findById(id);
}

export async function remove(id: string) {
  const patient = await patientRepository.findByIdSimple(id);

  if (!patient) {
    const error = new Error("Paciente não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  await patientRepository.remove(id, patient.userId);
}
