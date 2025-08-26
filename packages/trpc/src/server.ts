import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  taskRouter: t.router({
    findAll: publicProcedure.output(z.array(z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      status: z.enum(["PENDING", "IN_PROGRESS", "DONE", "ARCHIVED"]),
      priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
      dueDate: z.date().optional(),
      items: z.array(z.object({
        id: z.number(),
        text: z.string().min(1),
        done: z.boolean().optional(),
        position: z.number().optional(),
        createdAt: z.coerce.date(),
        updatedAt: z.coerce.date(),
      })),
      tags: z.array(z.string()),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createTask: publicProcedure.input(z.object({
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
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

