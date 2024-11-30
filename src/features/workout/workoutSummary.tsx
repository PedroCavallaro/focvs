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
import { CircleCheck, Copy, Pencil, Share2, Trash2 } from "lucide-react-native";
import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

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

  const { mutate: copyWorkout } = useMutation({
    mutationFn: (id: string) => api.workout.copyWorkoutById(id),
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
            onOk={() => {
              copyWorkout(workout.id);
              closeCopyWorkoutModal();
            }}
          />
        </BaseModal>
      ),
      [workout],
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
    <View className="flex-col gap-6">
      <View className="w-full items-center justify-center">
        <View className="h-64 w-64 items-center overflow-hidden rounded-2xl">
          <Image
            style={{
              height: 220,
              width: 230,
              backgroundColor: "#FFFF",
            }}
            source={{ uri: workout.picture_url }}
          />
        </View>
      </View>
      <View className="flex-col gap-6">
        <View className="flex-col gap-4">
          <View className="flex-row gap-4">
            <Text className="font- text-2xl text-white">{workout.name}</Text>
          </View>
          <View className="flex-row gap-3">
            <View className="overflow-hidden rounded-full">
              <Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                source={require("../../../assets/images/user-icon.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
              {/* <UserCircle size={24} color={colors.orange[500]} /> */}
            </View>
            <Text className="text-white opacity-70">{workout?.user?.name}</Text>
          </View>
        </View>
        <View className="flex-row gap-4">
          {user?.id !== workout.user.id && (
            <TouchableOpacity onPress={openCopyWorkoutModal}>
              <Copy size={20} color={colors.orange[500]} />
            </TouchableOpacity>
          )}

          {user?.id === workout.user.id && (
            <TouchableOpacity onPress={openDeleteWarningModal}>
              <Trash2 size={20} color={colors.orange[500]} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={getCopyLink}>
            <Share2 size={20} color={colors.orange[500]} />
          </TouchableOpacity>

          {user?.id === workout.user.id && (
            <TouchableOpacity
              onPress={() => router.push(`/update-workout/${workout.id}`)}
            >
              <Pencil size={20} color={colors.orange[500]} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
