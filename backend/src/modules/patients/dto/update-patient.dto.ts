import { z } from "zod";

export const updatePatientSchema = z.object({
  name: z.string({ error: "Nome é obrigatório" }).min(2, "Nome deve ter pelo menos 2 caracteres"),
});

export type UpdatePatientDto = z.infer<typeof updatePatientSchema>;
