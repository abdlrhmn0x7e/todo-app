import type { Dispatch, SetStateAction } from "react";
import type { ModalProps } from "react-native";
import { Modal as RNModal, View } from "react-native";

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
      {...props}
      onRequestClose={() => setIsOpen(false)}
    >
      <View className="flex-1 items-center justify-center bg-zinc-950/40">
        {children}
      </View>
    </RNModal>
  );
}
