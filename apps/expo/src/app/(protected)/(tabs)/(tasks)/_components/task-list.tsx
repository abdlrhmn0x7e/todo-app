import { View } from "react-native";
import { PackageOpenIcon } from "lucide-react-native";

import type { Task } from "@repo/validators";

import { useTheme } from "~/components/providers/theme-provider";
import ThemedText from "~/components/themed-text";
import { TaskItem } from "./task-item";

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return <TaskListEmptyState />;
  }

  return (
    <View>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </View>
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
