import { WorkoutExercise } from "@/src/api/dtos";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export function OverwriteExerciseModal({
  exerciseDto,
  onYes,
  close,
}: {
  exerciseDto: WorkoutExercise;
  onYes: (exercise: WorkoutExercise) => void;
  close: () => void;
}) {
  return (
    <Modal className="w-10/12 flex-col gap-10 bg-zinc-900">
      <Text className="text-2xl font-bold text-white">
        Exercícios já adicionado
      </Text>
      <Text className="text-white">Deseja sobreescrever?</Text>
      <View className="flex-row justify-end gap-10">
        <TouchableOpacity onPress={close} className="bg-orange-500">
          <Text className="text-2xl font-bold text-white">Não</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onYes(exerciseDto)}
          className="bg-orange-500"
        >
          <Text className="text-2xl font-bold text-white">Sim</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
