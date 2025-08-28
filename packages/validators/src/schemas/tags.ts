import z from "zod/v4";

export const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
