import { z } from "zod";

export const createAppointmentSchema = z.object({
  date: z
    .string({ error: "Data é obrigatória" })
    .datetime("Data deve estar no formato ISO 8601"),
  reason: z
    .string({ error: "Motivo é obrigatório" })
    .min(3, "Motivo deve ter pelo menos 3 caracteres"),
  doctorId: z
    .string({ error: "ID do médico é obrigatório" })
    .uuid("ID do médico deve ser um UUID válido"),
  patientId: z
    .string({ error: "ID do paciente é obrigatório" })
    .uuid("ID do paciente deve ser um UUID válido"),
});

export type CreateAppointmentDto = z.infer<typeof createAppointmentSchema>;
