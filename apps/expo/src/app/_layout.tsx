import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../styles.css";

import { QueryProvider } from "~/components/providers/query-client.provider";
import { ThemeProvider } from "~/components/providers/theme-provider";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryProvider>
        {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
        <Stack screenOptions={{ animation: "none" }}>
          <Stack.Screen
            name="(protected)"
            options={{ headerShown: false, navigationBarHidden: true }}
          />

          <Stack.Screen
            name="auth"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
        </Stack>
        <StatusBar />
      </QueryProvider>
    </ThemeProvider>
  );
}
