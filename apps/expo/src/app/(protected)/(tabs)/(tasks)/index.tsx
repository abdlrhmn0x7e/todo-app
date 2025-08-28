import { View } from "react-native";

import { Container } from "~/components/container";
import { useTheme } from "~/components/providers/theme-provider";
import ThemedText from "~/components/themed-text";
import { Skeleton } from "~/components/ui/skeleton";
import { useTasksQuery } from "~/hooks/queries/tasks";
import { AddTask } from "./_components/add-task";
import { TaskList } from "./_components/task-list";

export default function Home() {
  const { theme } = useTheme();
  const { data: tasks, isPending, isError } = useTasksQuery();
  console.log("tasks", tasks);

  if (isPending) {
    return (
      <Container>
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-full" />
      </Container>
    );
  }

  if (isError || !tasks.ok) {
    return (
      <Container>
        <ThemedText>Error</ThemedText>
      </Container>
    );
  }

  return (
    <Container>
      <View className="rounded-3xl" style={{ backgroundColor: theme.muted }}>
        <View className="flex-row items-center justify-between px-6 py-4">
          <ThemedText
            className="text-xl font-medium"
            style={{ color: theme.foreground }}
          >
            Active Tasks
          </ThemedText>
        </View>

        <TaskList tasks={tasks.data} />
      </View>

      <AddTask className="absolute bottom-4 right-4" />
    </Container>
  );
}
