import { useState } from "react";
import { PlusIcon } from "lucide-react-native";

import { Button } from "~/components/ui/button";
import { Modal } from "~/components/ui/modal";
import { cn } from "~/utils";
import { TaskForm } from "./task-form";

export function AddTask({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className={cn(className, "size-16 rounded-2xl")}
        variant="default"
        onPress={() => setIsOpen(true)}
      >
        <Button.Icon Icon={PlusIcon} size={24} strokeWidth={2} />
      </Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <TaskForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
