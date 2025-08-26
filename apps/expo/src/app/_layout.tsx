import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { queryClient } from "~/utils/api";

import "../styles.css";

import { QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "~/components/providers/theme-provider";
import { authClient } from "~/utils/auth";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const { data: session } = authClient.useSession();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
        <Stack>
          <Stack.Protected guard={!!session}>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, navigationBarHidden: true }}
            />
          </Stack.Protected>

          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
        <StatusBar />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
