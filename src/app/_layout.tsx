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
import { ClipboardWorkoutLink } from "../services/clipboard";
export { ErrorBoundary } from "expo-router";

interface ClipboardInfo {
  showCopyWorkoutModal: boolean;
  lastClipText: string;
}

export default function RootLayout() {
  const [clipBoardInfo, setClipBoardInfo] = useState({} as ClipboardInfo);
  const route = usePathname();

  const [loaded, _] = useFonts({
    Mulish_300Light,
    Mulish_500Medium,
    Mulish_400Regular,
  });

  if (!loaded) {
    return;
  }

  const fetchClipBoardWorkoutInfo = async () => {};

  const hasWorkoutOnClipboard = async () => {
    const clipText = await Clipboard.fetchCopiedText();

    if (
      clipText.includes(process.env.EXPO_PUBLIC_API_URL) &&
      clipText !== clipBoardInfo?.lastClipText
    )
      return setClipBoardInfo({
        showCopyWorkoutModal: true,
        lastClipText: clipText,
      });

    await Clipboard.copyToClipboard("");
  };

  hasWorkoutOnClipboard();

  return (
    <Providers>
      <StatusBar
        barStyle="light-content"
        backgroundColor={"#000"}
        translucent
      />
      <View className="flex-1 bg-black">
        <Slot />
        {route !== "/" && clipBoardInfo.showCopyWorkoutModal && (
          <BaseModal
            title="Link de treino encontrado"
            subtitle="Deseja copiar para sua conta?"
          >
            <BaseModal.BaseButton
              onOk={() => console.log("asd")}
              onClose={() =>
                setClipBoardInfo((prev) => ({
                  ...prev,
                  showCopyWorkoutModal: false,
                }))
              }
            />
          </BaseModal>
        )}
      </View>
    </Providers>
  );
}
