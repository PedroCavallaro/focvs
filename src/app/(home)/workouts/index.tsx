import { api } from "@/src/api";
import { WorkoutDetails } from "@/src/api/dtos";
import { BaseModal } from "@/src/components/baseModal";
import { WorkoutActionsModal } from "@/src/components/home/workoutActionsModal";
import { WorkoutDetailsCard } from "@/src/components/workoutDetailsCard";
import { useModal } from "@/src/providers/ModalProvider";
import { colors } from "@/src/style";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ArrowUpDown, Plus } from "lucide-react-native";
import { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Workouts() {
  const router = useRouter();
  const { data: workouts, refetch } = useQuery({
    queryKey: ["user-workouts"],
    queryFn: () => api.workout.getUserWokouts(),
  });

  const refreshWorkouts = useCallback(async () => {
    await refetch();
    closeModal();
  }, [refetch]);

  const { closeModal, openModal } = useModal(
    (workout: WorkoutDetails) => (
      <BaseModal
        showTitleAndClose={false}
        title=""
        onClose={() => closeModal()}
      >
        <WorkoutActionsModal
          onSucces={() => {
            refreshWorkouts();
            closeModal();
          }}
          workout={workout}
        />
      </BaseModal>
    ),
    [],
  );

  return (
    <View className="flex-col gap-8">
      <View className="flex-row justify-between">
        <Text className="font-regular text-2xl text-white">Meus Treinos</Text>
        <TouchableOpacity
          onPress={() => router.push("/new")}
          className="border-b-[0.7px] border-orange-500 text-white"
        >
          <Plus color={"#FFF"} size={25} />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between">
        <TouchableOpacity className="flex-row items-center gap-2">
          <ArrowUpDown size={15} color={colors.zincBlur[700]} />
          <Text className="font-regular text-white/70">Ordenar</Text>
        </TouchableOpacity>
        <View></View>
      </View>
      <View className="flex flex-col gap-4">
        {workouts?.map((workout) => {
          return (
            <TouchableOpacity
              key={workout.id}
              onLongPress={() => openModal(workout)}
              onPress={() => router.push(`/workout/${workout.id}`)}
            >
              <WorkoutDetailsCard workout={workout} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
