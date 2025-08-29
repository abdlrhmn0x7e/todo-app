import type { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        ownerId: userId,
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
}
