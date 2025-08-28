import React, { useEffect } from "react";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "~/components/providers/theme-provider";
import { cn } from "~/utils";

export function Skeleton({ className }: { className?: string }) {
  const { theme } = useTheme();
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.5, { duration: 700 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    backgroundColor: theme.muted,
  }));

  return (
    <Animated.View
      entering={FadeIn}
      className={cn("h-4 w-full rounded-xl", className)}
      style={animatedStyle}
    />
  );
}
