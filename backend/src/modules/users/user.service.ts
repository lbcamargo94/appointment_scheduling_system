import * as userRepository from "./users.repository.js";

export async function findAll() {
  return userRepository.findAll();
}

export async function findById(id: string) {
  const user = await userRepository.findById(id);

  if (!user) {
    const error = new Error("Usuário não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  return user;
}

export async function remove(id: string) {
  const user = await userRepository.findById(id);

  if (!user) {
    const error = new Error("Usuário não encontrado") as Error & {
      statusCode: number;
    };
    error.statusCode = 404;
    throw error;
  }

  await userRepository.removeWithRelations(id, user.role);
}
