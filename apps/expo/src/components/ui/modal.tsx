import type { Dispatch, SetStateAction } from "react";
import type { ModalProps } from "react-native";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  Modal as RNModal,
} from "react-native";

import { useTheme } from "~/components/providers/theme-provider";

interface UIModalProps extends ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  withInput?: boolean;
  children: React.ReactNode;
}

export function Modal({ isOpen, setIsOpen, children, ...props }: UIModalProps) {
  const { theme } = useTheme();

  const translateY = useRef(new Animated.Value(40)).current;

  const backdropOpacity = translateY.interpolate({
    inputRange: [0, 40, 300],
    outputRange: [0.4, 0.4, 0],
    extrapolate: "clamp",
  });

  const contentOpacity = translateY.interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const performClose = useCallback(() => {
    translateY.stopAnimation();
    Animated.timing(translateY, {
      toValue: 300,
      duration: 160,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => setIsOpen(false), 0);
    });
  }, [setIsOpen, translateY]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gestureState) =>
          gestureState.dy > 5 &&
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx),
        onPanResponderTerminationRequest: () => false,
        onShouldBlockNativeResponder: () => true,
        onPanResponderGrant: () => {
          translateY.stopAnimation();
        },
        onPanResponderMove: (_, gestureState) => {
          const dragY = Math.max(0, gestureState.dy);
          translateY.setValue(dragY);
        },
        onPanResponderRelease: (_, gestureState) => {
          const closeDistanceThreshold = 100;
          const closeVelocityThreshold = 1.2;
          const shouldClose =
            gestureState.vy > closeVelocityThreshold ||
            gestureState.dy > closeDistanceThreshold;
          if (shouldClose) {
            performClose();
          } else {
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
        onPanResponderTerminate: () => {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        },
      }),
    [performClose, translateY],
  );

  useLayoutEffect(() => {
    if (!isOpen) return;
    translateY.setValue(40);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen, translateY]);

  return (
    <RNModal
      animationType="none"
      visible={isOpen}
      transparent
      className="relative"
      {...props}
      onRequestClose={performClose}
    >
      <KeyboardAvoidingView
        className="flex-1 justify-end"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Animated.View
          {...panResponder.panHandlers}
          className="relative z-10 p-8 pb-12"
          style={{
            backgroundColor: theme.background,
            transform: [{ translateY }],
            opacity: contentOpacity,
            borderTopStartRadius: 40,
            borderTopEndRadius: 40,
          }}
        >
          {children}

          <Animated.View
            className="absolute inset-x-48 top-4 h-1 flex-1 justify-end rounded-full"
            style={{
              opacity: backdropOpacity,
              backgroundColor: theme.foreground,
            }}
            onTouchStart={performClose}
          />
        </Animated.View>
      </KeyboardAvoidingView>

      <Animated.View
        className="absolute inset-0 flex-1 justify-end bg-zinc-950"
        style={{ opacity: backdropOpacity }}
        onTouchStart={performClose}
      />
    </RNModal>
  );
}
