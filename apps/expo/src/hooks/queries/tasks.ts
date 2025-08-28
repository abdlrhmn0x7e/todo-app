import { useQuery } from "@tanstack/react-query";

import { API } from "~/api";

export const tasksKeys = {
  all: ["tasks"] as const,
};

export function useTasksQuery() {
  return useQuery({
    queryKey: tasksKeys.all,
    queryFn: () => API.tasks.queries.findAll(),
  });
}
