import { z } from "zod";

export const updateDoctorSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
    specialties: z
      .array(z.string().min(2, "Cada especialidade deve ter pelo menos 2 caracteres"))
      .min(1, "Pelo menos uma especialidade é obrigatória")
      .optional(),
  })
  .refine((data) => data.name || data.specialties, {
    message: "Pelo menos um campo deve ser informado (name ou specialties)",
  });

export type UpdateDoctorDto = z.infer<typeof updateDoctorSchema>;
