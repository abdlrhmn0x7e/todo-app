import type { Dispatch, SetStateAction } from "react";
import type { ModalProps } from "react-native";
import { Modal as RNModal, View } from "react-native";
import { XIcon } from "lucide-react-native";

import { useTheme } from "../providers/theme-provider";
import ThemedText from "../themed-text";
import { Button } from "./button";

interface UIDialogProps extends ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

export function Dialog({
  isOpen,
  setIsOpen,
  children,
  ...props
}: UIDialogProps) {
  return (
    <RNModal
      animationType="slide"
      visible={isOpen}
      transparent
      onRequestClose={() => setIsOpen(false)}
      {...props}
    >
      <View className="flex-1 items-center justify-center bg-zinc-950/40">
        {children}
      </View>
    </RNModal>
  );
}

function DialogContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <View
      className="w-full max-w-md rounded-xl px-6 py-3"
      style={{ backgroundColor: theme.background }}
    >
      {children}
    </View>
  );
}

function DialogHeader({
  children,
  closeDialog,
}: {
  children: React.ReactNode;
  closeDialog: () => void;
}) {
  const { theme } = useTheme();

  return (
    <View className="mb-4 flex-row items-center justify-between">
      <ThemedText className="text-xl font-medium">{children}</ThemedText>
      <Button variant="ghost" size="icon" onPress={closeDialog}>
        <Button.Icon Icon={XIcon} color={theme.mutedForeground} />
      </Button>
    </View>
  );
}

function DialogFooter({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-row items-center justify-end gap-2 pb-4">
      {children}
    </View>
  );
}

Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
