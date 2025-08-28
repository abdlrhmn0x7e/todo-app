import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { Redirect } from "expo-router";
import { GithubIcon } from "lucide-react-native";

import { useTheme } from "~/components/providers/theme-provider";
import ThemedText from "~/components/themed-text";
import { Button } from "~/components/ui/button";
import { authClient, signIn } from "~/utils/auth";

export default function Auth() {
  const { theme } = useTheme();

  useEffect(() => {
    // this is a hack to get the session after the sign in
    // if the deep link event from the OAuth redirect is missed (due to timing or app state),
    // the signIn.social() promise hangs and only resolves after an app restart
    // see: https://github.com/better-auth/better-auth/issues/3711
    void authClient.getSession();
  }, []);

  const { data, isPending } = authClient.useSession();

  // additional check to see if the user is already signed in
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

  if (data?.user) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{
          backgroundColor: theme.background,
        }}
      >
        <Redirect href="/" />
      </View>
    );
  }

  return (
    <View
      className="flex flex-1 justify-center"
      style={{
        backgroundColor: theme.background,
      }}
    >
      <View className="relative flex-1">
        <View className="relative z-10 flex flex-col items-center gap-4 py-24">
          <ThemedText className="line-clamp-2 max-w-64 text-center text-4xl font-medium tracking-widest">
            Welcome to{" "}
            <ThemedText className="text-4xl" style={{ color: theme.primary }}>
              Todoist
            </ThemedText>
          </ThemedText>
          <ThemedText
            className="max-w-80 text-center"
            style={{ color: theme.mutedForeground }}
          >
            Get started with Todoist by signing in to your account.
          </ThemedText>

          <View className="size-full pb-64">
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
              source={require("../../assets/illustration.png")}
              style={{
                width: "100%",
                height: "100%",
                zIndex: 10,
                objectFit: "contain",
              }}
            />
          </View>
        </View>

        <View className="absolute inset-0 flex flex-1">
          <View
            className="size-full flex-1"
            style={{
              backgroundColor: theme.card,
            }}
          />
          <View
            className="size-full flex-1 rounded-b-full"
            style={{
              backgroundColor: theme.card,
            }}
          />
        </View>
      </View>

      <View className="relative flex items-center justify-end px-8 py-4 pb-12">
        <Button onPress={signIn} className="relative z-10 w-full">
          <Button.Icon Icon={GithubIcon} />
          <Button.Text>Sign in with GitHub</Button.Text>
        </Button>

        <View className="absolute -inset-x-24 -inset-y-24 flex flex-1">
          <View
            className="size-full flex-1 rounded-t-full"
            style={{
              backgroundColor: theme.muted,
            }}
          />
        </View>
      </View>
    </View>
  );
}
