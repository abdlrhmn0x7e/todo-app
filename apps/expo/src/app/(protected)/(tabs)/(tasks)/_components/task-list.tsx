import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import Animated, { Easing, LinearTransition } from "react-native-reanimated";
import { isFuture, isSameDay } from "date-fns";
import {
  ClockIcon,
  ListCheckIcon,
  ListIcon,
  PackageOpenIcon,
} from "lucide-react-native";

import type { Task } from "@repo/validators";

import { useTheme } from "~/components/providers/theme-provider";
import ThemedText from "~/components/themed-text";
import { TaskItem } from "./task-item";

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return <TaskListEmptyState />;
  }

  const unCompletedTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <ScrollView contentContainerClassName="gap-8">
      <UnCompletedTasks tasks={unCompletedTasks} />
      <CompletedTasks tasks={completedTasks} />
    </ScrollView>
  );
}

function CompletedTasks({ tasks }: { tasks: Task[] }) {
  const { theme } = useTheme();

  if (tasks.length === 0) {
    return null;
  }

  return (
    <Animated.View
      className="rounded-3xl"
      style={{ backgroundColor: theme.card }}
      layout={LinearTransition.easing(Easing.bezier(0.25, 0.1, 0.25, 1.0))}
    >
      <View className="flex-row items-center justify-between px-4 py-6">
        <View className="flex-row items-center gap-2">
          <ListCheckIcon size={24} color={theme.mutedForeground} />
          <ThemedText className="text-xl font-medium">
            Completed Tasks
          </ThemedText>
        </View>
        <ThemedText
          className="text-lg"
          style={{ color: theme.mutedForeground }}
        >
          ({tasks.length} Completed)
        </ThemedText>
      </View>

      <Animated.View
        className="gap-4 rounded-lg px-4 pb-6 pt-3"
        layout={LinearTransition.easing(Easing.bezier(0.25, 0.1, 0.25, 1.0))}
      >
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </Animated.View>
    </Animated.View>
  );
}

function UnCompletedTasks({ tasks }: { tasks: Task[] }) {
  const { theme } = useTheme();

  const taskGroups = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        if (!task.dueDate) {
          acc.noDueDate = [...(acc.noDueDate ?? []), task];
          return acc;
        }

        if (isSameDay(task.dueDate, new Date())) {
          acc.today = [...(acc.today ?? []), task];
          return acc;
        }

        if (isFuture(task.dueDate)) {
          acc.future = [...(acc.future ?? []), task];
          return acc;
        }

        acc.past = [...(acc.past ?? []), task];
        return acc;
      },
      {} as Record<string, Task[]>,
    );
  }, [tasks]);

  if (tasks.length === 0) {
    return null;
  }

  return (
    <Animated.View
      className="gap-1 rounded-3xl"
      style={{ overflow: "hidden" }}
      layout={LinearTransition.easing(Easing.bezier(0.25, 0.1, 0.25, 1.0))}
    >
      <View
        className="flex-row items-center justify-between px-4 py-6"
        style={{ backgroundColor: theme.card }}
      >
        <View className="flex-row items-center gap-2">
          <ListIcon size={24} color={theme.mutedForeground} />
          <ThemedText className="text-xl font-medium">My Tasks</ThemedText>
        </View>
        <ThemedText
          className="text-lg"
          style={{ color: theme.mutedForeground }}
        >
          ({tasks.length} Uncompleted)
        </ThemedText>
      </View>

      {Object.entries(taskGroups).map(([key, tasks]) => (
        <Animated.View
          key={key}
          className="gap-4 rounded-lg px-4 pb-6 pt-3"
          style={{ backgroundColor: theme.card }}
          layout={LinearTransition.easing(Easing.bezier(0.25, 0.1, 0.25, 1.0))}
        >
          <View className="flex-row items-center gap-2 py-2">
            <ClockIcon size={20} color={theme.mutedForeground} />
            <ThemedText
              className="text-lg"
              style={{ color: theme.mutedForeground }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </ThemedText>
          </View>

          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Animated.View>
      ))}
    </Animated.View>
  );
}

function TaskListEmptyState() {
  const { theme } = useTheme();

  return (
    <View className="flex items-center justify-center gap-6 py-32">
      <PackageOpenIcon size={48} color={theme.mutedForeground} />

      <ThemedText
        className="text-center text-lg"
        style={{ color: theme.mutedForeground }}
      >
        No tasks found
      </ThemedText>
    </View>
  );
}
