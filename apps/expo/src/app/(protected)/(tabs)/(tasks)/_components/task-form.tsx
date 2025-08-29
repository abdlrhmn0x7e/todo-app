import type { z } from "zod/v4";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@repo/validators";
import {
  AlignLeftIcon,
  CalendarIcon,
  ChevronRightIcon,
  CircleDashedIcon,
  ClockIcon,
  SaveIcon,
  XIcon,
} from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";

import { useTheme } from "~/components/providers/theme-provider";
import ThemedText from "~/components/themed-text";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";

const taskFormSchema = createTaskSchema;
export type TaskFormValues = z.infer<typeof taskFormSchema>;

export function TaskForm() {
  const { theme } = useTheme();
  const defaultStyles = useDefaultStyles();
  const [isDescriptionShown, setIsDescriptionShown] = useState(false);
  const [showDueDate, setShowDueDate] = useState(false);
  const [priorityIdx, setPriorityIdx] = useState<number>(0);
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

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: taskPriorities[priorityIdx]?.value,
      dueDate: new Date(),
    },
  });
  const dueDate = form.watch("dueDate");

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
    <View className="gap-3">
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
                autoFocus
                style={{
                  color: theme.foreground,
                }}
                {...field}
              />
            )}
          />
        )}
      </View>

      <View className="flex-row gap-3">
        {dueDate && (
          <View
            className="flex-row items-center gap-2 rounded-lg border border-zinc-200 pl-2"
            style={{ borderColor: theme.border }}
          >
            <ClockIcon color={theme.primary} size={16} />
            <ThemedText>{dueDate.toLocaleDateString()}</ThemedText>
            <Pressable
              onPress={() => {
                form.setValue("dueDate", undefined);
              }}
              className="p-2"
            >
              <XIcon color={theme.mutedForeground} size={16} />
            </Pressable>
          </View>
        )}
      </View>

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

      <Dialog isOpen={showDueDate} setIsOpen={setShowDueDate}>
        <Dialog.Content>
          <Dialog.Header closeDialog={() => setShowDueDate(false)}>
            Due date
          </Dialog.Header>
          <Controller
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <DateTimePicker
                mode="single"
                date={field.value}
                onChange={({ date }) => {
                  field.onChange(date);
                }}
                styles={defaultStyles}
              />
            )}
          />

          <Dialog.Footer>
            <Button className="w-full" onPress={() => setShowDueDate(false)}>
              <Button.Text>Done</Button.Text>
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </View>
  );
}
