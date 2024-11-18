import { api } from "@/src/api";
import { UpdateWorkoutDTO, WorkoutDetails } from "@/src/api/dtos";
import { BaseModal } from "@/src/components/baseModal";
import { Toast } from "@/src/components/toast/toast";
import { useModal } from "@/src/providers/modalProvider";
import { useToast } from "@/src/providers/toastProvider";
import { Clipboard } from "@/src/services";
import { colors } from "@/src/style";
import { plural } from "@/src/utils/plural";
import { useMutation } from "@tanstack/react-query";
import {
  CircleCheck,
  Eye,
  EyeOff,
  Pencil,
  Share,
  X,
} from "lucide-react-native";
import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

export function WorkoutActionsModal({
  workout,
  onSucces,
  close,
}: {
  workout: WorkoutDetails;
  onSucces: () => void;
  close: () => void;
}) {
  const router = useRouter();

  const { mutate: delteWorkout } = useMutation({
    mutationFn: (id: string) => api.workout.deleteWorkout(id),
    onSuccess: () => onSucces(),
  });

  const { mutate: updateWorkout } = useMutation({
    mutationFn: (data: UpdateWorkoutDTO) => api.workout.updateWorkout(data),
    onSuccess: () => onSucces(),
  });

  const {
    openModal: openDeleteWarningModal,
    closeModal: closeDeleteWarningModal,
  } = useModal(
    () => (
      <BaseModal
        positionVariant="center"
        sizeVariant="medium"
        title="Tem certeza que quer apagar esse treino?"
        subtitle="Essa ação é irreversível"
        onClose={() => closeDeleteWarningModal()}
      >
        <BaseModal.BaseButtons
          onClose={() => closeDeleteWarningModal()}
          onOk={() => delteWorkout(workout.id)}
        />
      </BaseModal>
    ),
    [],
  );

  const goToUpdate = useCallback(() => {
    router.push(`/update-workout/${workout.id}`);
    close();
  }, []);

  const { showToast } = useToast(() => (
    <Toast variant="top-right">
      <Toast.Content
        prefixIcon={<CircleCheck size={18} color={colors.orange[500]} />}
        title="Link Copiado"
      />
    </Toast>
  ));

  const getCopyLink = useCallback(async () => {
    await Clipboard.copyToClipboard(`/workout/link/${workout?.signature}`);

    showToast();
  }, [showToast]);

  return (
    <View className="flex-col gap-6">
      <View className="h-20 flex-row gap-3">
        <View className="h-20 w-20 overflow-hidden rounded-lg">
          <Image
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#FFFF",
            }}
            source={{ uri: workout.picture_url }}
          />
        </View>
        <View className="flex-col gap-1">
          <Text className="font-regular text-lg text-white">
            {workout.name}
          </Text>
          <Text className="font-regular text-white/70">
            {workout.exerciseAmount}{" "}
            {plural("exercicíco", workout.exerciseAmount)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={goToUpdate}
        className="flex-row items-center gap-2 opacity-70"
      >
        <Pencil color={"#fff"} size={20} />
        <Text className="font-regular text-lg text-white">
          Atualizar treino
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openDeleteWarningModal}
        className="flex-row items-center gap-2 opacity-70"
      >
        <X color={"#fff"} size={20} />
        <Text className="font-regular text-lg text-white">Apagar treino</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          updateWorkout({
            id: workout.id,
            public: !workout.public,
          })
        }
        className="flex-row items-center gap-2 opacity-70"
      >
        {workout.public ? (
          <EyeOff color={"#fff"} size={20} />
        ) : (
          <Eye color={"#fff"} size={20} />
        )}
        <Text className="font-regular text-lg text-white">
          Mudar visibilidade para {workout.public ? "privado" : "publíco"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={getCopyLink}
        className="flex-row items-center gap-2 opacity-70"
      >
        <Share color={"#fff"} size={20} />
        <Text className="font-regular text-lg text-white">
          Compartilhar treino
        </Text>
      </TouchableOpacity>
    </View>
  );
}
