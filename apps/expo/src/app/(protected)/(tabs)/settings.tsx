import { Switch, View } from "react-native";
import { LogOutIcon, MoonIcon, SunIcon, UserIcon } from "lucide-react-native";

import { Container } from "~/components/container";
import { useTheme } from "~/components/providers/theme-provider";
import ThemedText from "~/components/themed-text";
import { Button } from "~/components/ui/button";
import { authClient } from "~/utils/auth";

export default function Settings() {
  const { data } = authClient.useSession();
  const { theme, themeName, changeTheme } = useTheme();

  const isDarkMode = themeName === "dark";

  const toggleTheme = () => {
    changeTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <Container>
      <View className="flex gap-6">
        {/* Dark Mode Toggle Section */}
        <View
          className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
          style={{ backgroundColor: theme.card }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              {isDarkMode ? (
                <MoonIcon size={24} color={theme.primary} />
              ) : (
                <SunIcon size={24} color={theme.primary} />
              )}
              <View>
                <ThemedText className="text-base font-medium">
                  Dark Mode
                </ThemedText>
                <ThemedText className="text-sm opacity-70">
                  {isDarkMode ? "Dark theme enabled" : "Light theme enabled"}
                </ThemedText>
              </View>
            </View>

            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{
                false: theme.muted,
                true: theme.primary + "40",
              }}
              thumbColor={isDarkMode ? theme.primary : theme.background}
            />
          </View>
        </View>

        {/* User Information Section */}
        {data?.user && (
          <View
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
            style={{ backgroundColor: theme.card }}
          >
            <View className="mb-3 flex-row items-center gap-3">
              <UserIcon size={24} color={theme.primary} />
              <ThemedText className="text-lg font-semibold">
                User Information
              </ThemedText>
            </View>

            <View className="gap-2">
              <View>
                <ThemedText className="text-sm opacity-70">Name</ThemedText>
                <ThemedText className="text-base font-medium">
                  {data.user.name || "Not provided"}
                </ThemedText>
              </View>

              <View>
                <ThemedText className="text-sm opacity-70">Email</ThemedText>
                <ThemedText className="text-base font-medium">
                  {data.user.email || "Not provided"}
                </ThemedText>
              </View>
            </View>
          </View>
        )}

        {/* Logout Section */}
        <View className="mt-4">
          <Button onPress={() => authClient.signOut()}>
            <Button.Icon Icon={LogOutIcon} />
            <Button.Text>Logout</Button.Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}
