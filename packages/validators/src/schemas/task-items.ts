import z from "zod/v4";

export const taskItemSchema = z.object({
  id: z.number(),
  text: z.string().min(1),
  done: z.boolean().optional(),
  position: z.number().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
