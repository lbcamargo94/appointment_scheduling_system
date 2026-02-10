import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string({ error: "Nome é obrigatório" })
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string({ error: "Email é obrigatório" }).email("Email inválido"),
  password: z
    .string({ error: "Senha é obrigatória" })
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  role: z.enum(["ADMIN", "RECEPTIONIST", "DOCTOR", "PATIENT"], {
    error: "Role inválida",
  }),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
