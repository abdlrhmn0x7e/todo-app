import { View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import Checkbox from "expo-checkbox";

import type { Task } from "@repo/validators";

import { useTheme } from "~/components/providers/theme-provider";
import ThemedText from "~/components/themed-text";
import { useUpdateTaskMutation } from "~/hooks/mutations/tasks";

export function TaskItem({ task }: { task: Task }) {
  const { theme } = useTheme();
  const translateX = useSharedValue(0);
  const { mutate: updateTask } = useUpdateTaskMutation();

  function handleCheckboxChange() {
    translateX.value = withSpring(800 * (task.isCompleted ? -1 : 1), {
      damping: 10,
      stiffness: 100,
      mass: 2,
    });

    updateTask({
      id: task.id,
      data: { isCompleted: !task.isCompleted },
    });
  }

  return (
    <Animated.View
      className="flex-row items-center gap-6"
      style={{ transform: [{ translateX }] }}
    >
      <Checkbox
        value={task.isCompleted}
        onValueChange={handleCheckboxChange}
        style={{
          width: 24,
          height: 24,
          borderRadius: 100,
        }}
        color={task.isCompleted ? "transparent" : theme.mutedForeground}
      />

      <View className="flex-1">
        <View className="flex-row justify-between">
          <ThemedText className="text-xl">{task.title}</ThemedText>
          <ThemedText style={{ color: theme.mutedForeground }}>
            {task.dueDate?.toDateString()}
          </ThemedText>
        </View>

        {task.description && (
          <ThemedText style={{ color: theme.mutedForeground }}>
            {task.description}
          </ThemedText>
        )}
      </View>
    </Animated.View>
  );
}
