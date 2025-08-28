import { taskSchema } from "@repo/validators";
import { z } from "zod";

export const createTaskSchema = taskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
