import z from "zod/v4";

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullish(),
  isCompleted: z.boolean(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  dueDate: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type Task = z.infer<typeof taskSchema>;

export const createTaskSchema = taskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isCompleted: true,
});

export const updateTaskSchema = taskSchema.partial();
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
