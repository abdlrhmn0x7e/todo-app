import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard, Session } from "@thallesp/nestjs-better-auth";

import { TaskService } from "./task.service";

@Controller("task")
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(@Session() session: UserSession) {
    console.log(session);
    return this.taskService.findAll();
  }
}
