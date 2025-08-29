import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Task, UpdateTaskDto } from "@repo/validators";

import type { TaskFormValues } from "~/app/(protected)/(tabs)/(tasks)/_components/task-form";
import { API } from "~/api";
import { tasksKeys } from "../queries/tasks";

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TaskFormValues) => {
      return API.tasks.mutations.create(data);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: tasksKeys.all });
    },
  });
}

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskDto }) => {
      return API.tasks.mutations.update(id, data);
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: tasksKeys.all });

      const previousData = queryClient.getQueryData(tasksKeys.all);

      queryClient.setQueryData(
        tasksKeys.all,
        (old: { ok: boolean; data: Task[] }) => {
          const newData = old.data.map((task) =>
            task.id === id ? { ...task, ...data } : task,
          );

          return { ok: true, data: newData };
        },
      );

      console.log("previousData", previousData);

      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(tasksKeys.all, context?.previousData);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: tasksKeys.all });
    },
  });
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return API.tasks.mutations.delete(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: tasksKeys.all });

      const previousData = queryClient.getQueryData(tasksKeys.all);

      queryClient.setQueryData(
        tasksKeys.all,
        (old: { ok: boolean; data: Task[] }) => {
          const newData = old.data.filter((task) => task.id !== id);

          return { ok: true, data: newData };
        },
      );

      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(tasksKeys.all, context?.previousData);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: tasksKeys.all });
    },
  });
}
