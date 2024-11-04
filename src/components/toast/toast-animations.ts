import { useRef, useMemo } from "react";
import { Animated, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export type ToastVariants = "bottom-right" | "top-right";

const outputRanges = (output: number) => {
  return {
    "bottom-right": [+output, 0],
    "top-right": [-output, 0],
  };
};

const animations = ({
  output,
  toastAnimations,
  variant,
}: {
  output: number;
  toastAnimations: Animated.Value;
  variant: ToastVariants;
}) => {
  const outputRange = outputRanges(output);

  return {
    "bottom-right": {
      transform: [
        {
          translateX: toastAnimations.interpolate({
            inputRange: [0, 1],
            outputRange: outputRange[variant],
          }),
        },
      ],
    },
    "top-right": {
      transform: [
        {
          translateY: toastAnimations.interpolate({
            inputRange: [0, 1],
            outputRange: outputRange[variant],
          }),
        },
      ],
    },
  };
};

export function useToastAnimations({ variant }: { variant: ToastVariants }) {
  const toastAnimations = useRef(new Animated.Value(0)).current;
  const viewWidth = useRef(new Animated.Value(0)).current;

  const output = variant === "bottom-right" ? width : height;

  const animation = useMemo(() => {
    const currAnimation = animations({ output, toastAnimations, variant });

    return currAnimation[variant];
  }, [toastAnimations, output, variant]);

  const viewWidthAnimation = {
    width: viewWidth.interpolate({
      inputRange: [0, 100],
      outputRange: ["100%", "0%"],
    }),
  };

  return {
    animation,
    toastAnimations,
    viewWidth,
    viewWidthAnimation,
  };
}
