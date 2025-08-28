import type { PropsWithChildren } from "react";
import { View } from "react-native";

import { cn } from "~/utils";
import { useTheme } from "./providers/theme-provider";

export function Container({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const { theme } = useTheme();
  return (
    <View
      className={cn("flex-1 px-4 py-2", className)}
      style={{
        backgroundColor: theme.background,
      }}
    >
      {children}
    </View>
  );
}
