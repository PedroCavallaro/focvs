import { useRestTimer } from "@/src/hooks/restTimer";
import { View } from "react-native";
import { RestTimerConfig } from "./rest-timer-config";
import { RestTimerClock } from "./rest-timer-clock";

export function RestTimer() {
  const { restTimer } = useRestTimer();

  return (
    <View className="mt-6 flex-col justify-center gap-10">
      {restTimer.isTimerRunning ? <RestTimerClock /> : <RestTimerConfig />}
    </View>
  );
}
