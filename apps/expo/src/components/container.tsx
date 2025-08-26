import { PropsWithChildren } from "react";
import { View } from "react-native";

import { useTheme } from "./providers/theme-provider";

export function Container({ children }: PropsWithChildren) {
  const { theme } = useTheme();
  return (
    <View
      className="flex-1 px-8 py-12"
      style={{
        backgroundColor: theme.background,
      }}
    >
      {children}
    </View>
  );
}
