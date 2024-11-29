import { useWorkout } from "@/src/providers/workoutProvider";
import { colors } from "@/src/style";
import { ArrowDownUpIcon, Plus, ChevronUp } from "lucide-react-native";
import { Animated, View } from "react-native";
import { Button } from "@/src/components/button";
import { useExerciseCard } from "../exerciseCard.provider";
import { useExerciseCardAnimation } from "../hooks/animation";

export function MidWorkoutActions() {
  const { exercise } = useExerciseCard();
  const { addSetOnExercise } = useWorkout();

  const { toggleAnimation, translateY1, translateY2, translateY3 } =
    useExerciseCardAnimation();

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
          <Button
            onPress={() => addSetOnExercise(exercise.id)}
            variant="tertiary"
            sizeVariant="medium"
          >
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
