import { View } from "react-native";
import { RestTimerConfig } from "./restTimerConfig";
import { RestTimerClock } from "./restTimerClock";
import { useRestTimer } from "@/src/providers/restTimerProvider";

export function RestTimer() {
  const { restTimer } = useRestTimer();

  return (
    <View className="flex-col justify-center gap-10">
      {restTimer.isTimerRunning ? <RestTimerClock /> : <RestTimerConfig />}
    </View>
  );
}
