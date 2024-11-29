import { Slot, usePathname } from "expo-router";
import { StatusBar, View } from "react-native";
import "react-native-reanimated";
import "./global.css";
import {
  Mulish_300Light,
  Mulish_500Medium,
  Mulish_400Regular,
  useFonts,
} from "@expo-google-fonts/mulish";
import { Providers } from "../providers";
import { useState } from "react";
import { Clipboard } from "../services";
import { BaseModal } from "../components/baseModal";
import { api } from "../api";
import { WorkoutDetailsCard } from "../features/home/workoutDetailsCard";
import { WorkoutDetails } from "../api/dtos";
import { Toast } from "../components/toast/toast";
export { ErrorBoundary } from "expo-router";

interface ClipboardInfo {
  showCopyWorkoutModal: boolean;
  lastClipText: string;
  copyError: boolean;
  copySuccess: boolean;
  workout: WorkoutDetails;
}

export default function RootLayout() {
  const [loaded, _] = useFonts({
    Mulish_300Light,
    Mulish_500Medium,
    Mulish_400Regular,
  });
  const [clipBoardInfo, setClipBoardInfo] = useState({
    copySuccess: false,
    copyError: false,
  } as ClipboardInfo);
  const route = usePathname();

  if (!loaded) {
    return;
  }

  const fetchClipBoardWorkoutInfo = async (link: string) => {
    const workout = await api.workout.getWorkoutByLink(link);

    return workout;
  };

  const checkForWorkoutLinkOnClipboard = async () => {
    const clipText = await Clipboard.fetchCopiedText();

    console.log(clipText);
    if (
      !clipText?.includes("/workout/link") ||
      clipText === clipBoardInfo?.lastClipText
    ) {
      return await Clipboard.copyToClipboard("");
    }

    const workout = await fetchClipBoardWorkoutInfo(clipText);

    return setClipBoardInfo((prev) => ({
      ...prev,
      showCopyWorkoutModal: !workout.isFromSameUser,
      lastClipText: clipText,
      workout: workout as WorkoutDetails,
    }));
  };

  const copyWorkout = async () => {
    try {
      const workoutLink = clipBoardInfo.lastClipText.split("/");

      const workoutSignature = workoutLink[workoutLink.length - 1];

      await api.workout.copyWorkoutToAccount(
        clipBoardInfo.lastClipText,
        workoutSignature,
      );

      setClipBoardInfo((prev) => ({
        ...prev,
        showCopyWorkoutModal: false,
        copySuccess: true,
      }));

      return await Clipboard.copyToClipboard("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setClipBoardInfo((prev) => ({
        ...prev,
        copySuccess: false,
        copyError: true,
      }));
    }
  };

  checkForWorkoutLinkOnClipboard();

  return (
    <Providers>
      <StatusBar barStyle="light-content" backgroundColor={"#000"} />
      <View className="flex-1 bg-black">
        <Slot />
        {route !== "/" && clipBoardInfo.showCopyWorkoutModal && (
          <BaseModal
            title="Link de treino encontrado"
            subtitle="Deseja importar para sua conta? (Pesos e repetições deveram ser configurados)"
          >
            <WorkoutDetailsCard workout={clipBoardInfo.workout} showUser />
            <BaseModal.BaseButtons
              onClose={() =>
                setClipBoardInfo((prev) => ({
                  ...prev,
                  showCopyWorkoutModal: false,
                }))
              }
              onOk={() => copyWorkout()}
            />
          </BaseModal>
        )}
        {clipBoardInfo.copyError && (
          <Toast variant="top-right">
            <Toast.Content title="Erro ao importar treino" />
          </Toast>
        )}
      </View>
    </Providers>
  );
}
