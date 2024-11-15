import { Text, View } from "react-native";
import { Button } from "@/src/components/button";
import { Input } from "@/src/components/input";
import { useEffect } from "react";
import { useRestTimer } from "@/src/providers/restTimerProvider";

export function RestTimerConfig() {
  const { getPreviousTimer, handleTimerConfig, handleStart, restTimer } =
    useRestTimer();

  useEffect(() => {
    getPreviousTimer();
  }, []);

  return (
    <View className="mt-6 flex-col justify-center gap-10">
      <View className="flex-row items-center justify-between gap-4">
        {[...Array(4)].map((_, i) => {
          return (
            <View
              key={i}
              className="flex-row items-center justify-center gap-2"
            >
              <View className="h-20 w-20 rounded-lg bg-zinc-900">
                <Input variant="no-border">
                  <Input.Field
                    onChangeText={(v) => {
                      const value = v ? Number(v) : 0;

                      handleTimerConfig(i, Number(value));
                    }}
                    className="mt-4 h-full w-full items-center justify-center text-center font-regular text-lg text-zinc-200"
                    keyboardType="numeric"
                    placeholder={restTimer.timerConfig[i].toString()}
                    placeholderTextColor={"#FFF"}
                  ></Input.Field>
                </Input>
              </View>
              {i == 1 && <Text className="ml-3 text-2xl text-white">:</Text>}
            </View>
          );
        })}
      </View>
      <Button onPress={handleStart}>
        <Text>Iniciar</Text>
      </Button>
    </View>
  );
}
