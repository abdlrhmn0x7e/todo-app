import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useQueryClient } from "@tanstack/react-query";

import { Container } from "~/components/container";
import ThemedText from "~/components/themed-text";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { tasksKeys, useTasksQuery } from "~/hooks/queries/tasks";
import { AddTask } from "./_components/add-task";
import { TaskList } from "./_components/task-list";

export default function Home() {
  const { data: tasks, isPending, isError } = useTasksQuery();

  const queryClient = useQueryClient();

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
        <TaskList tasks={tasks.data} />

        <AddTask className="absolute bottom-4 right-4" />
      </GestureHandlerRootView>
    </Container>
  );
}
