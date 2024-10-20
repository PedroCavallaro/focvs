import { useAtom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { useRef, useCallback, useEffect } from "react";
import {
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Keyboard,
} from "react-native";

const footerAtom = atomWithReset(true);

export function useFooter() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showFooter, setShowFooter] = useAtom(footerAtom);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setShowFooter(false);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setShowFooter(true);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = event.nativeEvent.contentOffset.y;

      Animated.timing(scrollY, {
        toValue: currentOffset > 0 ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() =>
        currentOffset > 0 ? setShowFooter(false) : setShowFooter(true),
      );
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
    showFooter,
  };
}
