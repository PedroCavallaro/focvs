import { X } from "lucide-react-native";
import {
  View,
  Text,
  ModalProps,
  ScrollView,
  Modal as RNModal,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import { colors } from "../style";

type Props = ModalProps & {
  title: string;
  subtitle?: string;
  onClose?: () => void;
  showTitleAndClose?: boolean;
};

export function BaseModal({
  title,
  subtitle = "",
  onClose,
  children,
  showTitleAndClose = true,
  ...rest
}: Props) {
  return (
    <>
      <RNModal transparent animationType="fade" visible {...rest}>
        <View className="fixed bottom-0 flex-1 justify-end bg-black/60">
          <BlurView
            className="flex-1"
            intensity={7}
            tint="dark"
            onTouchStart={onClose}
            experimentalBlurMethod="dimezisBlurView"
          ></BlurView>
          <View className="border-t border-zinc-700 bg-zinc-950 px-6 pb-10 pt-5">
            <ScrollView showsVerticalScrollIndicator={false}>
              {showTitleAndClose && (
                <>
                  <View className="flex-row items-center justify-between pt-5">
                    <Text className="font-medium text-xl text-white">
                      {title}
                    </Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
                      <X color={colors.zinc[200]} size={20} />
                    </TouchableOpacity>
                  </View>
                  {subtitle.trim().length > 0 && (
                    <Text className="my-2 font-regular leading-6 text-zinc-400">
                      {subtitle}
                    </Text>
                  )}
                </>
              )}
              {children}
            </ScrollView>
          </View>
        </View>
      </RNModal>
    </>
  );
}
