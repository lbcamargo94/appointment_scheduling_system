import { z } from "zod";

export const patientFiltersSchema = z.object({
  name: z.string().optional(),
});

export type PatientFiltersDto = z.infer<typeof patientFiltersSchema>;
