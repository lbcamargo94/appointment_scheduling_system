import { z } from "zod";

export const createDoctorSchema = z.object({
  name: z
    .string({ error: "Nome é obrigatório" })
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string({ error: "Email é obrigatório" }).email("Email inválido"),
  password: z
    .string({ error: "Senha é obrigatória" })
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  specialties: z
    .array(z.string().min(2, "Cada especialidade deve ter pelo menos 2 caracteres"), {
      error: "Especialidades são obrigatórias",
    })
    .min(1, "Pelo menos uma especialidade é obrigatória"),
});

export type CreateDoctorDto = z.infer<typeof createDoctorSchema>;
