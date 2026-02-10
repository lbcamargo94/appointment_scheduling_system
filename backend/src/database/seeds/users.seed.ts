import type { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/helpers/hash.helper.js";

export async function seedUsers(prisma: PrismaClient) {
  const password = await hashPassword("Senha@123");

  const admins = [
    {
      name: "Carlos Administrador",
      email: "carlos.admin@medcare.com",
      password,
      role: "ADMIN" as const,
    },
    {
      name: "Fernanda Gestora",
      email: "fernanda.admin@medcare.com",
      password,
      role: "ADMIN" as const,
    },
    {
      name: "Roberto Supervisor",
      email: "roberto.admin@medcare.com",
      password,
      role: "ADMIN" as const,
    },
  ];

  const receptionists = [
    {
      name: "Juliana Recepção",
      email: "juliana.recep@medcare.com",
      password,
      role: "RECEPTIONIST" as const,
    },
    {
      name: "Marcos Recepção",
      email: "marcos.recep@medcare.com",
      password,
      role: "RECEPTIONIST" as const,
    },
    {
      name: "Patrícia Recepção",
      email: "patricia.recep@medcare.com",
      password,
      role: "RECEPTIONIST" as const,
    },
    {
      name: "Lucas Recepção",
      email: "lucas.recep@medcare.com",
      password,
      role: "RECEPTIONIST" as const,
    },
    {
      name: "Camila Recepção",
      email: "camila.recep@medcare.com",
      password,
      role: "RECEPTIONIST" as const,
    },
    {
      name: "André Recepção",
      email: "andre.recep@medcare.com",
      password,
      role: "RECEPTIONIST" as const,
    },
  ];

  const allUsers = [...admins, ...receptionists];
  const created = [];

  for (const user of allUsers) {
    const result = await prisma.user.create({ data: user });
    created.push(result);
  }

  console.log(
    `  -> ${created.length} users created (${admins.length} admins, ${receptionists.length} receptionists)`,
  );
  return created;
}
