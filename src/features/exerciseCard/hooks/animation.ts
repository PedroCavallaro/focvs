import { useRef, useCallback, useEffect, useState } from "react";
import { Animated } from "react-native";
import { useExerciseCard } from "../exerciseCard.provider";

export function useExerciseCardAnimation() {
  const { visible, handleActions } = useExerciseCard();

  const [isVisible, setIsVisible] = useState(visible);

  const translateY1 = useRef(new Animated.Value(-100)).current;
  const translateY2 = useRef(new Animated.Value(-100)).current;
  const translateY3 = useRef(new Animated.Value(-100)).current;

  const animateButtons = useCallback((direction: "in" | "out") => {
    const toValue = direction === "in" ? 0 : -100;
    Animated.stagger(100, [
      Animated.timing(translateY1, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY2, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY3, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    animateButtons("in");
  }, []);

  const toggleAnimation = () => {
    animateButtons(isVisible ? "out" : "in");
    setIsVisible(!isVisible);

    if (isVisible) {
      setTimeout(() => handleActions(), 300);
    }
  };

  return {
    translateY1,
    translateY2,
    translateY3,
    animateButtons,
    toggleAnimation,
  };
}
