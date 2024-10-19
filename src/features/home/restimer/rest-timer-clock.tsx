import { Button } from "@/src/components/button";
import { useRestTimer } from "@/src/hooks/restTimer";
import { StopCircle } from "lucide-react-native";
import { Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export function RestTimerClock() {
  const { handleTimer } = useRestTimer();

  return (
    <View className="flex-col items-center justify-center gap-10 py-4">
      <CountdownCircleTimer
        isPlaying
        onComplete={handleTimer}
        duration={120}
        colors={"#F97316"}
      >
        {({ remainingTime }) => (
          <Text className="text-lg text-white">{remainingTime}</Text>
        )}
      </CountdownCircleTimer>
      <View className="flex-row gap-4">
        <View className="h-14 w-28 overflow-hidden rounded-2xl">
          <Button onPress={handleTimer}>
            <StopCircle color={"#000"} />
          </Button>
        </View>
      </View>
    </View>
  );
}
