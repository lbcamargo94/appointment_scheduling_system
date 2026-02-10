import type { PrismaClient, Doctor, Patient } from "@prisma/client";

export async function seedAppointments(
  prisma: PrismaClient,
  doctors: Doctor[],
  patients: Patient[],
) {
  const now = new Date();

  const futureDate = (daysAhead: number, hour: number) => {
    const date = new Date(now);
    date.setDate(date.getDate() + daysAhead);
    date.setHours(hour, 0, 0, 0);
    return date;
  };

  const pastDate = (daysAgo: number, hour: number) => {
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    date.setHours(hour, 0, 0, 0);
    return date;
  };

  const appointments = [
    {
      date: futureDate(1, 9),
      reason: "Consulta de rotina - check-up cardiológico",
      doctorId: doctors[0].id,
      patientId: patients[0].id,
      status: "SCHEDULED" as const,
    },
    {
      date: futureDate(2, 10),
      reason: "Avaliação dermatológica - manchas na pele",
      doctorId: doctors[1].id,
      patientId: patients[1].id,
      status: "SCHEDULED" as const,
    },
    {
      date: futureDate(3, 14),
      reason: "Dor no joelho direito - possível lesão",
      doctorId: doctors[2].id,
      patientId: patients[2].id,
      status: "SCHEDULED" as const,
    },
    {
      date: futureDate(4, 8),
      reason: "Consulta pediátrica - vacinação",
      doctorId: doctors[3].id,
      patientId: patients[3].id,
      status: "SCHEDULED" as const,
    },
    {
      date: futureDate(5, 11),
      reason: "Cefaleia recorrente - investigação neurológica",
      doctorId: doctors[4].id,
      patientId: patients[4].id,
      status: "SCHEDULED" as const,
    },
    {
      date: pastDate(5, 9),
      reason: "Exame ginecológico de rotina",
      doctorId: doctors[5].id,
      patientId: patients[5].id,
      status: "COMPLETED" as const,
    },
    {
      date: pastDate(3, 15),
      reason: "Exame oftalmológico - dificuldade de visão",
      doctorId: doctors[6].id,
      patientId: patients[6].id,
      status: "COMPLETED" as const,
    },
    {
      date: pastDate(1, 10),
      reason: "Avaliação psiquiátrica - ansiedade",
      doctorId: doctors[7].id,
      patientId: patients[7].id,
      status: "CANCELED" as const,
    },
  ];

  const created = [];

  for (const appt of appointments) {
    const result = await prisma.appointment.create({ data: appt });
    created.push(result);
  }

  console.log(`  -> ${created.length} appointments created`);
  return created;
}
