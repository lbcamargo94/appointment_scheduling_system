import { z } from "zod";

export const updateStatusSchema = z.object({
  status: z.enum(["COMPLETED", "CANCELED"], {
    error: "Status deve ser COMPLETED ou CANCELED",
  }),
});

export type UpdateStatusDto = z.infer<typeof updateStatusSchema>;
