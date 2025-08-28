import { taskSchema } from "@repo/validators";
import { z } from "zod/v4";

import { fetchWrapper } from "~/utils/api/fetch-wrapper";

export const _tasks = {
  queries: {
    findAll() {
      return fetchWrapper("/api/task", {
        schema: z.array(taskSchema),
      });
    },
  },
};
