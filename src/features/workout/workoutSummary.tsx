import { api } from "@/src/api";
import { Workout, WorkoutDetails } from "@/src/api/dtos";
import { BaseModal } from "@/src/components/baseModal";
import { Toast } from "@/src/components/toast/toast";
import { useAuth } from "@/src/hooks";
import { useModal } from "@/src/providers/modalProvider";
import { useToast } from "@/src/providers/toastProvider";
import { Clipboard } from "@/src/services";
import { colors } from "@/src/style";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { CircleCheck, Copy, Share2, Trash2 } from "lucide-react-native";
import { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function WorkoutSumary({
  workout,
}: {
  workout: Workout & WorkoutDetails;
}) {
  const router = useRouter();
  const { user } = useAuth();

  const { mutate: delteWorkout } = useMutation({
    mutationFn: (id: string) => api.workout.deleteWorkout(id),
  });
  const { showToast } = useToast(() => (
    <Toast>
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

  const { openModal: openCopyWorkoutModal, closeModal: closeCopyWorkoutModal } =
    useModal(
      () => (
        <BaseModal
          title="Copiar esse treino para sua conta?"
          sizeVariant="medium"
          positionVariant="center"
          subtitle="As séries terão que ser editadas depois"
          onClose={() => closeCopyWorkoutModal()}
        >
          <BaseModal.BaseButtons
            okText="Copiar"
            closeText="Cancelar"
            onClose={() => closeCopyWorkoutModal()}
            onOk={() => console.log("IMPLEMENT THIS")}
          />
        </BaseModal>
      ),
      [],
    );

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
          onOk={() => {
            delteWorkout(workout.id);
            router.push("/home");
            closeDeleteWarningModal();
          }}
        />
      </BaseModal>
    ),
    [],
  );

  return (
    <View className="flex-row gap-4">
      <Image
        source={{ uri: workout.picture_url }}
        className="h-48 w-52 bg-white"
      />
      <View className="flex-col gap-8">
        <View className="flex-col gap-4">
          <Text className="font-medium text-white">{workout.name}</Text>
          <Text className="text-white opacity-70">
            De: {workout?.user?.name}
          </Text>
        </View>
        <View className="flex-row gap-4">
          {user?.id !== workout.user.id && (
            <TouchableOpacity onPress={openCopyWorkoutModal}>
              <Copy size={20} color={colors.orange[500]} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={getCopyLink}>
            <Share2 size={20} color={colors.orange[500]} />
          </TouchableOpacity>

          {user?.id === workout.user.id && (
            <TouchableOpacity onPress={openDeleteWarningModal}>
              <Trash2 size={20} color={colors.orange[500]} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
