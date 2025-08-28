import type { LucideIcon, LucideProps } from "lucide-react-native";
import type { PressableProps, TextProps } from "react-native";
import { Pressable, Text } from "react-native";
import { cva } from "class-variance-authority";

import { cn } from "~/utils";

const buttonVariants = cva(
  "flex h-12 flex-row items-center justify-center gap-2 rounded-xl px-4 py-2 active:opacity-90",
  {
    variants: {
      variant: {
        default: "bg-sky-950 dark:bg-white", // TODO: change this later on
        outline: "border border-foreground",
        ghost: "bg-transparent active:bg-sky-950/90",
      },
      size: {
        default: "h-12",
        sm: "h-10",
        lg: "h-14",
        icon: "size-14 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonTextVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "text-foreground",
    },
  },
});

export function Button({
  className,
  children,
  variant,
  size,
  ...props
}: PressableProps & {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}) {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Pressable>
  );
}

function ButtonText({
  children,
  className,
  ...props
}: TextProps & { children: React.ReactNode; className?: string }) {
  return (
    <Text className={cn(buttonTextVariants({ className }))} {...props}>
      {children}
    </Text>
  );
}

function ButtonIcon({ Icon, ...props }: LucideProps & { Icon: LucideIcon }) {
  return <Icon {...props} size={20} />;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;
