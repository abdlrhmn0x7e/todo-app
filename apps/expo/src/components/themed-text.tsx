import { Text, TextProps } from "react-native";

import { useTheme } from "~/components/providers/theme-provider";

export default function ThemedText({ children, ...props }: TextProps) {
  const { theme } = useTheme();
  return (
    <Text style={{ color: theme.foreground }} {...props}>
      {children}
    </Text>
  );
}
