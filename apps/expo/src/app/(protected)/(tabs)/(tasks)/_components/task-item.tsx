import { View } from "react-native";

import type { Task } from "@repo/validators";

import ThemedText from "~/components/themed-text";

export function TaskItem({ task }: { task: Task }) {
  return (
    <View>
      <ThemedText>{task.title}</ThemedText>
    </View>
  );
}
