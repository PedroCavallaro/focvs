import { Button } from "@/src/components/button";
import { useRestTimer } from "@/src/providers/restTimerProvider";
import { StopCircle } from "lucide-react-native";
import { useMemo, useRef } from "react";
import { Text, View } from "react-native";

export function RestTimerClock() {
  const { handleTimer, restTimer, currentTimer, arrayToSeconds, setRestTimer } =
    useRestTimer();

  const timeRef = useRef(arrayToSeconds(restTimer.timerConfig));

  const time = useMemo(() => {
    const minutes = Math.floor(currentTimer / 60);

    timeRef.current = currentTimer;

    return currentTimer >= 60
      ? `${String(minutes).padStart(2, "0")} : ${String(currentTimer % 60).padStart(2, "0")}`
      : `${String(currentTimer % 60).padStart(2, "0")}`;
  }, [currentTimer]);

  return (
    <View className="flex-col items-center justify-center gap-10 py-4">
      <Text className="text-2xl text-white">{time}</Text>
      <View className="flex-row gap-4">
        <View className="h-14 w-28 overflow-hidden rounded-2xl">
          <Button
            onPress={() => {
              handleTimer();
              setRestTimer((prev) => ({ ...prev, timerConfig: [0, 0, 0, 0] }));
            }}
          >
            <StopCircle color={"#000"} />
          </Button>
        </View>
      </View>
    </View>
  );
}
