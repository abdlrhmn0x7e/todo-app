import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

import { CreateTaskDto } from "./schemas/task.schema";

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        ownerId: userId,
      },
      omit: {
        ownerId: true,
      },
      include: {
        items: {
          orderBy: {
            position: "asc",
          },
          omit: {
            taskId: true,
          },
        },
        tags: true,
      },
    });
  }

  async createTaskWithItems(values: CreateTaskDto, userId: number) {
    const { items, ...taskValues } = values;

    const task = await this.prisma.task.create({
      data: {
        ...taskValues,
        owner: {
          connect: {
            id: userId,
          },
        },
        tags: {
          connectOrCreate: taskValues.tags?.map((tag) => ({
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })),
        },
        items: {
          create: items,
        },
      },
    });

    return task;
  }
}
