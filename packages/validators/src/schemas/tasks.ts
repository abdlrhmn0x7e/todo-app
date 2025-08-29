import z from "zod/v4";

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE", "ARCHIVED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  dueDate: z.date().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createTaskSchema = taskSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    items: true,
    tags: true,
    status: true,
    userId: true,
  })
  .extend({
    description: z.string().optional(),
    dueDate: z.date().optional(),
  });
