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
};

export function BaseModal({
  title,
  subtitle = "",
  onClose,
  children,
  ...rest
}: Props) {
  return (
    <RNModal transparent animationType="fade" visible {...rest}>
      <BlurView
        className="flex-1"
        intensity={7}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
      >
        <View className="fixed bottom-0 flex-1 justify-end bg-black/60">
          <View className="border-t border-zinc-700 bg-zinc-950 px-6 pb-10 pt-5">
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex-row items-center justify-between pt-5">
                <Text className="font-medium text-xl text-white">{title}</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
                  <X color={colors.zinc[200]} size={20} />
                </TouchableOpacity>
              </View>
              {subtitle.trim().length > 0 && (
                <Text className="my-2 font-regular leading-6 text-zinc-400">
                  {subtitle}
                </Text>
              )}
              {children}
            </ScrollView>
          </View>
        </View>
      </BlurView>
    </RNModal>
  );
}
