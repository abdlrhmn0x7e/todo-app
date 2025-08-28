import { Tabs } from "expo-router";
import { ListTodoIcon, SettingsIcon } from "lucide-react-native";

import { useTheme } from "~/components/providers/theme-provider";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.background,
          borderColor: theme.border,
          paddingTop: 10,
          paddingBottom: 10,
          paddingHorizontal: 20,
          height: 80,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="(tasks)/index"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <ListTodoIcon size={size} color={color} />
          ),
          tabBarActiveTintColor: theme.danger,
          headerStyle: {
            backgroundColor: theme.background,
            borderBottomColor: theme.border,
            borderBottomWidth: 0,
            height: 128,
          },
          headerTitleStyle: {
            color: theme.foreground,
            fontSize: 24,
          },
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: theme.background,
            borderBottomColor: theme.border,
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: theme.foreground,
          },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
