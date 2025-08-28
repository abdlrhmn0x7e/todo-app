import { useState } from "react";
import { PlusIcon } from "lucide-react-native";

import { useTheme } from "~/components/providers/theme-provider";
import { Button } from "~/components/ui/button";
import { Modal } from "~/components/ui/modal";
import { cn } from "~/utils";
import { TaskForm } from "./task-form";

export function AddTask({ className }: { className?: string }) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className={cn(className, "size-16 rounded-2xl")}
        variant="outline"
        onPress={() => setIsOpen(true)}
      >
        <Button.Icon
          Icon={PlusIcon}
          size={24}
          strokeWidth={2}
          color={theme.foreground}
        />
      </Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <TaskForm />
      </Modal>
    </>
  );
}
