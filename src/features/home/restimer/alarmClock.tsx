import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { colors } from "@/src/style";
import { AlarmClock as LucideAlarmClock } from "lucide-react-native";

export function AlarmClock() {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotation, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(rotation, {
            toValue: -1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(rotation, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 6 },
      ).start();
    };

    startAnimation();
  }, [rotation]);

  const animatedStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [-1, 1],
          outputRange: ["-10deg", "10deg"],
        }),
      },
    ],
  };

  return (
    <Animated.View style={animatedStyle}>
      <LucideAlarmClock size={18} color={colors.orange[500]} />
    </Animated.View>
  );
}
