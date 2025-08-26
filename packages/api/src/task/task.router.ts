import type { UserSession } from "@thallesp/nestjs-better-auth";
import { UseGuards } from "@nestjs/common";
import { AuthGuard, Session } from "@thallesp/nestjs-better-auth";
import { Input, Mutation, Query, Router } from "nestjs-trpc";
import z from "zod";

import type { CreateTaskDto } from "./schemas/task.schema";
import { createTaskSchema, taskSchema } from "./schemas/task.schema";
import { TaskService } from "./task.service";

@Router()
@UseGuards(AuthGuard)
export class TaskRouter {
  constructor(private taskService: TaskService) {}

  @Query({ output: z.array(taskSchema) })
  findAll(@Session() session: UserSession) {
    return this.taskService.findAll(Number(session.session.userId));
  }

  @Mutation({ input: createTaskSchema })
  createTask(@Input() input: CreateTaskDto, @Session() session: UserSession) {
    return this.taskService.createTaskWithItems(
      input,
      Number(session.session.userId),
    );
  }
}
