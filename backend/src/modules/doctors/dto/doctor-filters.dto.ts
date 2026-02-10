import { z } from "zod";

export const doctorFiltersSchema = z.object({
  specialty: z.string().optional(),
  name: z.string().optional(),
});

export type DoctorFiltersDto = z.infer<typeof doctorFiltersSchema>;
