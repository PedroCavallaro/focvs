import { useRef, useCallback } from "react";
import {
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

export function useFooter() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = event.nativeEvent.contentOffset.y;

      Animated.timing(scrollY, {
        toValue: currentOffset > 0 ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    },
    [],
  );

  const animation = {
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [0, 0.5],
          outputRange: [0, 100],
        }),
      },
    ],
  };

  return {
    animation,
    handleScroll,
  };
}
