import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    role: z.enum(["ADMIN", "RECEPTIONIST", "DOCTOR", "PATIENT"]),
    specialty: z.string().min(2, "Especialidade deve ter pelo menos 2 caracteres").optional(),
  })
  .refine(
    (data) => {
      if (data.role === "DOCTOR") return !!data.specialty;
      return true;
    },
    { message: "Especialidade é obrigatória para médicos", path: ["specialty"] },
  );

export type RegisterDto = z.infer<typeof registerSchema>;
