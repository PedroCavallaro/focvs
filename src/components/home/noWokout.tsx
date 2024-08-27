import { View, Text } from "react-native";
import { Button } from "../button";
import { useRouter } from "expo-router";

export function NoWorkout({
  openSwitchModal,
}: {
  openSwitchModal: () => void;
}) {
  const router = useRouter();

  return (
    <View className="h-[45rem] flex-col items-center justify-center gap-6">
      <Text className="text-center font-regular text-lg text-white">
        Parece que não há nenhum treino para hoje
      </Text>
      <Button onPress={() => router.push("/home/new")}>
        <Button.Title>Criar Treino</Button.Title>
      </Button>
      <Text className="text-center font-regular text-lg text-white">Ou</Text>
      <Button onPress={openSwitchModal}>
        <Button.Title>Escolher outro treino</Button.Title>
      </Button>
    </View>
  );
}
