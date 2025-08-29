import type { z } from "zod";
import { createTaskSchema } from "@repo/validators";

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
