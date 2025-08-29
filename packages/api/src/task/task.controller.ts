import type { UserSession } from "@thallesp/nestjs-better-auth";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard, Session } from "@thallesp/nestjs-better-auth";

import type { UpdateTaskDto } from "@repo/validators";

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

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() data: UpdateTaskDto,
    @Session() session: UserSession,
  ) {
    return this.taskService.update(+id, data, +session.user.id);
  }

  @Delete(":id")
  delete(@Param("id") id: string, @Session() session: UserSession) {
    return this.taskService.delete(+id, +session.user.id);
  }
}
