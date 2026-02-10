import type { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/helpers/hash.helper.js";

export async function seedDoctors(prisma: PrismaClient) {
  const password = await hashPassword("Senha@123");

  const doctors = [
    {
      name: "Dr. André Carvalho",
      email: "andre.carvalho@medcare.com",
      specialties: ["Cardiologia"],
    },
    {
      name: "Dra. Beatriz Lima",
      email: "beatriz.lima@medcare.com",
      specialties: ["Dermatologia", "Clínica Geral"],
    },
    {
      name: "Dr. Diego Santos",
      email: "diego.santos@medcare.com",
      specialties: ["Ortopedia"],
    },
    {
      name: "Dra. Elena Ferreira",
      email: "elena.ferreira@medcare.com",
      specialties: ["Pediatria", "Neonatologia"],
    },
    {
      name: "Dr. Felipe Oliveira",
      email: "felipe.oliveira@medcare.com",
      specialties: ["Neurologia"],
    },
    {
      name: "Dra. Gabriela Costa",
      email: "gabriela.costa@medcare.com",
      specialties: ["Ginecologia", "Obstetrícia"],
    },
    {
      name: "Dr. Henrique Rocha",
      email: "henrique.rocha@medcare.com",
      specialties: ["Oftalmologia"],
    },
    {
      name: "Dra. Isabela Mendes",
      email: "isabela.mendes@medcare.com",
      specialties: ["Psiquiatria", "Clínica Geral"],
    },
  ];

  const created = [];

  for (const doc of doctors) {
    const user = await prisma.user.create({
      data: {
        name: doc.name,
        email: doc.email,
        password,
        role: "DOCTOR",
      },
    });

    const doctor = await prisma.doctor.create({
      data: {
        specialties: doc.specialties,
        userId: user.id,
      },
    });

    created.push(doctor);
  }

  console.log(`  -> ${created.length} doctors created`);
  return created;
}
