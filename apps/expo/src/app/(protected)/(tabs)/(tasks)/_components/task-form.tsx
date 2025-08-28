import type { z } from "zod/v4";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@repo/validators";
import {
  AlignLeftIcon,
  CalendarIcon,
  ChevronRightIcon,
  CircleDashedIcon,
  SaveIcon,
} from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";

import { useTheme } from "~/components/providers/theme-provider";
import { Button } from "~/components/ui/button";

const taskFormSchema = taskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  items: true,
  tags: true,
  userId: true,
});
export type TaskFormValues = z.infer<typeof taskFormSchema>;

export function TaskForm() {
  const { theme } = useTheme();
  const [isDescriptionShown, setIsDescriptionShown] = useState(false);
  const taskPriorities = useMemo(
    () => [
      {
        label: "Low",
        value: "LOW" as const,
        color: "green",
      },
      {
        label: "Medium",
        value: "MEDIUM" as const,
        color: "yellow",
      },
      {
        label: "High",
        value: "HIGH" as const,
        color: "red",
      },
    ],
    [],
  );
  const [priorityIdx, setPriorityIdx] = useState<number>(0);
  const [showDueDate, setShowDueDate] = useState(false);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "PENDING",
      priority: taskPriorities[priorityIdx]?.value,
      dueDate: new Date(),
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      void form.setFocus("title");
    }, 100);

    return () => clearTimeout(timer);
  }, [form]);

  function handleSubmit(values: TaskFormValues) {
    console.log("values", values);
  }

  function handlePriorityChange() {
    setPriorityIdx((prev) => (prev + 1) % taskPriorities.length);
  }

  return (
    <View>
      <Controller
        control={form.control}
        name="title"
        render={({ field }) => (
          <TextInput
            className="text-xl"
            placeholder="New Task"
            style={{
              color: theme.foreground,
            }}
            {...field}
          />
        )}
      />

      {isDescriptionShown && (
        <Controller
          control={form.control}
          name="description"
          render={({ field }) => (
            <TextInput
              placeholder="Add details"
              className="text-lg"
              style={{
                color: theme.foreground,
              }}
              {...field}
            />
          )}
        />
      )}

      <View className="flex-row justify-between">
        <View className="relative flex-1">
          <ScrollView horizontal className="mr-4 flex-row gap-2">
            <Button
              variant="ghost"
              onPress={() => setIsDescriptionShown(!isDescriptionShown)}
            >
              <Button.Icon
                Icon={AlignLeftIcon}
                color={theme.mutedForeground}
                size={24}
              />
              <Button.Text style={{ color: theme.mutedForeground }}>
                Add details
              </Button.Text>
            </Button>

            <Button variant="ghost" onPress={handlePriorityChange}>
              <Button.Icon
                Icon={CircleDashedIcon}
                color={taskPriorities[priorityIdx]?.color}
                size={24}
              />
              <Button.Text
                style={{ color: taskPriorities[priorityIdx]?.color }}
              >
                {taskPriorities[priorityIdx]?.label}
              </Button.Text>
            </Button>

            <Button variant="ghost" onPress={() => setShowDueDate(true)}>
              <Button.Icon
                Icon={CalendarIcon}
                size={24}
                color={theme.primary}
              />
              <Button.Text style={{ color: theme.primary }}>
                Due date
              </Button.Text>
            </Button>
          </ScrollView>

          <View className="absolute right-0 top-1/2 -translate-y-1/2">
            <ChevronRightIcon color={theme.primary} size={16} />
          </View>
        </View>

        <Button
          variant="ghost"
          onPress={form.handleSubmit(handleSubmit)}
          disabled={!form.formState.isSubmitting}
        >
          <Button.Icon Icon={SaveIcon} color={theme.foreground} />
          <Button.Text style={{ color: theme.foreground }}>Save</Button.Text>
        </Button>
      </View>

      {showDueDate && <Calendar />}
    </View>
  );
}
