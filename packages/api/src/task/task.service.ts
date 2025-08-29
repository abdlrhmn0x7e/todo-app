import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

import type { UpdateTaskDto } from "@repo/validators";

import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        dueDate: "asc",
      },
    });
  }

  create(data: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        ...data,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  update(id: number, data: UpdateTaskDto, userId: number) {
    return this.prisma.task.update({
      where: { id, ownerId: userId },
      data,
    });
  }
}
