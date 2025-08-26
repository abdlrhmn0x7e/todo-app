import z from "zod";

export const taskItemSchema = z.object({
  id: z.number(),
  text: z.string().min(1),
  done: z.boolean().optional(),
  position: z.number().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE", "ARCHIVED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  dueDate: z.date().optional(),
  items: z.array(taskItemSchema),
  tags: z.array(z.string()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  dueDate: z.date().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE", "ARCHIVED"]),
  tags: z.array(z.string()).optional(),
  items: z
    .array(
      z.object({
        text: z.string().min(1),
      }),
    )
    .optional(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type CreateTaskItemDto = z.infer<typeof taskItemSchema>;
