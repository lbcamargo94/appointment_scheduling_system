import { z } from "zod";

export const createPatientSchema = z.object({
  name: z
    .string({ error: "Nome é obrigatório" })
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string({ error: "Email é obrigatório" }).email("Email inválido"),
  password: z
    .string({ error: "Senha é obrigatória" })
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type CreatePatientDto = z.infer<typeof createPatientSchema>;
