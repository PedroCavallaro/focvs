import { BaseModal } from "@/src/components/baseModal";
import { Button } from "@/src/components/button";
import { useModal } from "@/src/providers/modalProvider";
import { Hourglass } from "lucide-react-native";
import { Animated, View } from "react-native";
import { RestTimer } from "./restTimer";
import { useRef, useEffect } from "react";

export function RestTimerIndicator() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const { openModal: openTimerModal, closeModal: closeTimerModal } = useModal(
    () => (
      <BaseModal title="Tempo de descanso" onClose={() => closeTimerModal()}>
        <RestTimer />
      </BaseModal>
    ),
    [],
  );

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ).start();
    };

    startRotation();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="relative left-2 flex h-10 w-12 items-center justify-center overflow-hidden rounded-bl-lg rounded-tl-lg bg-orange-500">
      <Button onPress={openTimerModal}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Hourglass color="#000" size={12} />
        </Animated.View>
      </Button>
    </View>
  );
}
