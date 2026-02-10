import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    role: z.enum(["ADMIN", "RECEPTIONIST", "DOCTOR", "PATIENT"]),
    specialties: z
      .array(z.string().min(2, "Cada especialidade deve ter pelo menos 2 caracteres"))
      .min(1, "Pelo menos uma especialidade é obrigatória")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.role === "DOCTOR") return !!data.specialties && data.specialties.length > 0;
      return true;
    },
    {
      message: "Especialidades são obrigatórias para médicos",
      path: ["specialties"],
    },
  );

export type RegisterDto = z.infer<typeof registerSchema>;
