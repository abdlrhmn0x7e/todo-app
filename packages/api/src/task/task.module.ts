import { PrismaModule } from "@/prisma/prisma.module";
import { Module } from "@nestjs/common";

import { TaskRouter } from "./task.router";
import { TaskService } from "./task.service";

@Module({
  imports: [PrismaModule],
  providers: [TaskService, TaskRouter],
})
export class TaskModule {}
