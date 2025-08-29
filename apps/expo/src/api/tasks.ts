import { taskSchema, UpdateTaskDto } from "@repo/validators";
import { z } from "zod/v4";

import type { TaskFormValues } from "~/app/(protected)/(tabs)/(tasks)/_components/task-form";
import { fetchWrapper } from "~/utils/api/fetch-wrapper";

export const _tasks = {
  queries: {
    findAll() {
      return fetchWrapper("/api/task", {
        schema: z.array(taskSchema),
      });
    },
  },

  mutations: {
    create(data: TaskFormValues) {
      return fetchWrapper("/api/task", {
        method: "POST",
        schema: z.any(),
        body: data,
      });
    },

    update(id: number, data: UpdateTaskDto) {
      return fetchWrapper(`/api/task/${id}`, {
        method: "PATCH",
        schema: z.any(),
        body: data,
      });
    },
  },
};
