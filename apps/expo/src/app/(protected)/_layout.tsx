import { ActivityIndicator, View } from "react-native";
import { Redirect, Stack } from "expo-router";

import { useTheme } from "~/components/providers/theme-provider";
import { authClient } from "~/utils/auth";

export const unstable_settings = {
  initialRouteName: "(tabs)", // anchor
};

export default function ProtectedLayout() {
  const { data, isPending } = authClient.useSession();
  const { theme } = useTheme();

  if (isPending) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!data?.user) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{
          backgroundColor: theme.background,
        }}
      >
        <Redirect href="/auth" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          navigationBarHidden: true,
        }}
      />
    </Stack>
  );
}
