import { z } from "zod";

export const appointmentFiltersSchema = z.object({
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELED"]).optional(),
  doctorId: z.string().uuid("ID do médico deve ser um UUID válido").optional(),
  patientId: z
    .string()
    .uuid("ID do paciente deve ser um UUID válido")
    .optional(),
  startDate: z
    .string()
    .datetime("Data inicial deve estar no formato ISO 8601")
    .optional(),
  endDate: z
    .string()
    .datetime("Data final deve estar no formato ISO 8601")
    .optional(),
});

export type AppointmentFiltersDto = z.infer<typeof appointmentFiltersSchema>;
