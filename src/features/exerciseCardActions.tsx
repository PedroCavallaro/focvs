import { ArrowDownUpIcon, Plus, ChevronUp } from "lucide-react-native";
import { useRef, useState, useCallback, useEffect } from "react";
import { Animated, View } from "react-native";
import { colors } from "../style";
import { Button } from "../components/button";

export function ExerciseCardActions({
  handleActions,
}: {
  handleActions: () => void;
}) {
  const translateY1 = useRef(new Animated.Value(-100)).current;
  const translateY2 = useRef(new Animated.Value(-100)).current;
  const translateY3 = useRef(new Animated.Value(-100)).current;

  const [isVisible, setIsVisible] = useState(true);

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

  return (
    <View className="flex items-center justify-center">
      <View className="flex-row items-center justify-center gap-2">
        <Animated.View
          style={{
            transform: [{ translateY: translateY1 }],
            height: 40,
            width: "32%",
          }}
        >
          <Button variant="tertiary" sizeVariant="medium">
            <ArrowDownUpIcon color={colors.orange[500]} size={18} />
          </Button>
        </Animated.View>

        <Animated.View
          style={{
            transform: [{ translateY: translateY2 }],
            height: 40,
            width: "32%",
          }}
        >
          <Button variant="tertiary" sizeVariant="medium">
            <Plus color={colors.orange[500]} size={18} />
          </Button>
        </Animated.View>

        <Animated.View
          style={{
            transform: [{ translateY: translateY3 }],
            height: 40,
            width: "32%",
          }}
        >
          <Button
            onPress={toggleAnimation}
            variant="tertiary"
            sizeVariant="medium"
          >
            <ChevronUp color={colors.orange[500]} size={18} />
          </Button>
        </Animated.View>
      </View>
    </View>
  );
}
