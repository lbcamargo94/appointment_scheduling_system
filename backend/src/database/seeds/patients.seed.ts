import type { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/helpers/hash.helper.js";

export async function seedPatients(prisma: PrismaClient) {
  const password = await hashPassword("Senha@123");

  const patients = [
    { name: "Ana Paula Silva", email: "ana.silva@email.com" },
    { name: "Bruno Almeida", email: "bruno.almeida@email.com" },
    { name: "Cláudia Ribeiro", email: "claudia.ribeiro@email.com" },
    { name: "Daniel Souza", email: "daniel.souza@email.com" },
    { name: "Eduarda Martins", email: "eduarda.martins@email.com" },
    { name: "Fábio Pereira", email: "fabio.pereira@email.com" },
    { name: "Giovanna Barbosa", email: "giovanna.barbosa@email.com" },
    { name: "Hugo Nascimento", email: "hugo.nascimento@email.com" },
  ];

  const created = [];

  for (const pat of patients) {
    const user = await prisma.user.create({
      data: {
        name: pat.name,
        email: pat.email,
        password,
        role: "PATIENT",
      },
    });

    const patient = await prisma.patient.create({
      data: { userId: user.id },
    });

    created.push(patient);
  }

  console.log(`  -> ${created.length} patients created`);
  return created;
}
