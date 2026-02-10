import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedUsers } from "./users.seed.js";
import { seedDoctors } from "./doctors.seed.js";
import { seedPatients } from "./patients.seed.js";
import { seedAppointments } from "./appointments.seed.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Cleaning database...");
  await prisma.appointment.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding database...");
  await seedUsers(prisma);
  const doctors = await seedDoctors(prisma);
  const patients = await seedPatients(prisma);
  await seedAppointments(prisma, doctors, patients);

  console.log("Seed completed successfully!");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
