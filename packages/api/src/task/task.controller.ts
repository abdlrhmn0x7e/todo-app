import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard, Session } from "@thallesp/nestjs-better-auth";

import type { CreateTaskDto } from "./dto/create-task.dto";
import { TaskService } from "./task.service";

@Controller("task")
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(@Session() session: UserSession) {
    return this.taskService.findAll(+session.user.id);
  }

  @Post()
  create(@Body() data: CreateTaskDto, @Session() session: UserSession) {
    return this.taskService.create(data, +session.user.id);
  }
}
