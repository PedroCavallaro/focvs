import {
  View,
  Text,
  ModalProps,
  ScrollView,
  Modal as RNModal,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import clsx from "clsx";

type Variants = "center" | "end";
type SizeVariants = "large" | "medium";

type Props = ModalProps & {
  title: string;
  subtitle?: string;
  onClose?: () => void;
  showTitleAndClose?: boolean;
  positionVariant?: Variants;
  sizeVariant?: SizeVariants;
};

export function BaseModal({
  title,
  subtitle = "",
  onClose,
  positionVariant = "end",
  sizeVariant = "large",
  children,
  showTitleAndClose = true,
  ...rest
}: Props) {
  return (
    <>
      <RNModal transparent animationType="fade" visible {...rest}>
        <View
          className={clsx("flex-1 bg-black/60", {
            "justify-end": positionVariant === "end",
            "items-center justify-center": positionVariant === "center",
          })}
        >
          <BlurView
            className="absolute h-full w-full"
            intensity={7}
            tint="dark"
            onTouchStart={onClose}
            experimentalBlurMethod="dimezisBlurView"
          ></BlurView>
          <View
            className={clsx("bg-zinc-950 px-6 pb-10 pt-5", {
              "w-10/12 rounded-lg": sizeVariant === "medium",
              "w-full": sizeVariant === "large",
              "border-t border-zinc-700": positionVariant === "end",
            })}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex-col gap-6">
                {showTitleAndClose && (
                  <>
                    <View className="g flex-co">
                      <View className="flex-row items-center justify-between pt-5">
                        <Text className="font-medium text-xl text-white">
                          {title}
                        </Text>
                      </View>
                      {subtitle.trim().length > 0 && (
                        <Text className="my-2 font-regular leading-6 text-zinc-400">
                          {subtitle}
                        </Text>
                      )}
                    </View>
                  </>
                )}
                {children}
              </View>
            </ScrollView>
          </View>
        </View>
      </RNModal>
    </>
  );
}

const ModalBaseButtons = ({
  onOk,
  onClose,
  closeText,
  okText,
}: {
  okText?: string;
  closeText?: string;
  onClose: () => void;
  onOk: () => void;
}) => {
  return (
    <View className="flex-row gap-10">
      <TouchableOpacity
        onPress={onClose}
        className="h-9 w-32 items-center justify-center rounded-md bg-orange-500"
      >
        <Text className="text-md text-center text-black">
          {closeText ?? "Não"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onOk}
        className="h-9 w-32 items-center justify-center rounded-md bg-orange-500"
      >
        <Text className="text-md text-center text-black">
          {okText ?? "Sim"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

BaseModal.BaseButton = ModalBaseButtons;
