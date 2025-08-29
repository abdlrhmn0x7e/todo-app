import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useQueryClient } from "@tanstack/react-query";

import { Container } from "~/components/container";
import { useTheme } from "~/components/providers/theme-provider";
import ThemedText from "~/components/themed-text";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { tasksKeys, useTasksQuery } from "~/hooks/queries/tasks";
import { AddTask } from "./_components/add-task";
import { TaskList } from "./_components/task-list";

export default function Home() {
  const { data: tasks, isPending, isError } = useTasksQuery();
  const { theme } = useTheme();

  const queryClient = useQueryClient();

  if (isPending) {
    return (
      <Container className="gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full" />
        ))}
      </Container>
    );
  }

  if (isError || !tasks.ok) {
    return (
      <Container>
        <Button
          onPress={() => {
            void queryClient.invalidateQueries({ queryKey: tasksKeys.all });
          }}
        >
          <Button.Text>Retry</Button.Text>
        </Button>
        <ThemedText>Error</ThemedText>
      </Container>
    );
  }

  return (
    <Container>
      <GestureHandlerRootView>
        <View className="gap-4">
          <TaskList tasks={tasks.data} />
          <Text style={{ color: theme.mutedForeground, textAlign: "center" }}>
            Swipe tasks to left to delete
          </Text>
        </View>

        <AddTask className="absolute bottom-4 right-4" />
      </GestureHandlerRootView>
    </Container>
  );
}
