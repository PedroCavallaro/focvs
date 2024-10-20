import { Button } from "@/src/components/button";
import { useRestTimer } from "@/src/hooks/rest-timer";
import { StopCircle } from "lucide-react-native";
import { useRef } from "react";
import { Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export function RestTimerClock() {
  // const { closeModal, openModal } = useModal(
  //   () => (
  //     <BaseModal title="Tempo de descanso finalizado">
  //       <RestTimerEndedModal close={() => closeModal()} />
  //     </BaseModal>
  //   ),
  //   [],
  // );

  const { handleTimer, restTimer, arrayToSeconds, setRestTimer } =
    useRestTimer();

  const timeRef = useRef(arrayToSeconds(restTimer.timerConfig));

  return (
    <View className="flex-col items-center justify-center gap-10 py-4">
      <CountdownCircleTimer
        isPlaying
        onComplete={() =>
          setRestTimer((prev) => ({
            ...prev,
            isTimerRunning: false,
          }))
        }
        duration={timeRef.current}
        colors={"#F97316"}
      >
        {({ remainingTime }) => {
          const minutes = Math.floor(remainingTime / 60);

          timeRef.current = remainingTime;
          const text =
            remainingTime > 60
              ? `${String(minutes).padStart(2, "0")} : ${String(remainingTime % 60).padStart(2, "0")}`
              : `${String(remainingTime % 60).padStart(2, "0")}`;

          return <Text className="text-lg text-white">{text}</Text>;
        }}
      </CountdownCircleTimer>
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
