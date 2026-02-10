import { z } from "zod";

export const updateUserSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
    role: z
      .enum(["ADMIN", "RECEPTIONIST", "DOCTOR", "PATIENT"], {
        error: "Role inválida",
      })
      .optional(),
  })
  .refine((data) => data.name || data.role, {
    message: "Pelo menos um campo deve ser informado (name ou role)",
  });

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
