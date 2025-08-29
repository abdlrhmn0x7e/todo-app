import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  LinearTransition,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Checkbox from "expo-checkbox";
import { TrashIcon } from "lucide-react-native";

import type { Task } from "@repo/validators";

import { useTheme } from "~/components/providers/theme-provider";
import ThemedText from "~/components/themed-text";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "~/hooks/mutations/tasks";

const END_TRANSLATE_X = -150;

export function TaskItem({ task }: { task: Task }) {
  const { theme } = useTheme();
  const translateX = useSharedValue(0);
  const trashIconOpacity = useSharedValue(0);
  const { mutate: updateTask } = useUpdateTaskMutation();
  const { mutate: deleteTask } = useDeleteTaskMutation();

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX > 0) return;

      trashIconOpacity.value = withTiming(1, {
        duration: 100,
      });

      translateX.value = event.translationX;
    })
    .onEnd(() => {
      trashIconOpacity.value = withTiming(0, {
        duration: 100,
      });

      if (translateX.value < END_TRANSLATE_X) {
        deleteTask(task.id);
        translateX.value = withSpring(800 * -1, {
          damping: 10,
          stiffness: 100,
          mass: 2,
        });
        return;
      }

      translateX.value = withSpring(0, {
        damping: 15,
        stiffness: 100,
        mass: 1,
      });
    })
    .runOnJS(true);

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
    <GestureDetector gesture={panGesture}>
      <Animated.View
        className="relative flex-row items-center gap-6"
        style={{ transform: [{ translateX }] }}
        layout={LinearTransition.springify().damping(15).stiffness(150).mass(1)}
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

        <View
          style={{
            position: "absolute",
            right: END_TRANSLATE_X + 20,
            top: 0,
          }}
        >
          <Animated.View style={{ opacity: trashIconOpacity }}>
            <TrashIcon size={24} color={theme.danger} />
          </Animated.View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
