import {
  View,
  Text,
  ModalProps,
  ScrollView,
  Modal as RNModal,
} from "react-native";
// import { BlurView } from "expo-blur";
import clsx from "clsx";
import { Button } from "./button";

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
          {/* THIS is cool, but it beaks a lot of other cool features */}
          {/* <BlurView
            className="absolute h-full w-full"
            intensity={7}
            tint="dark"
            experimentalBlurMethod="dimezisBlurView"
          ></BlurView> */}
          <View
            onTouchStart={onClose}
            className="absolute top-0 h-full w-full"
          ></View>
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
  closeText,
  okText,
  onOk,
  onClose,
}: {
  okText?: string;
  closeText?: string;
  onClose?: () => void;
  onOk?: () => void;
}) => {
  return (
    <View className="mt-2 flex-col items-center gap-4">
      <Button variant="tertiary" onPress={onClose}>
        <Button.Title> {closeText ?? "Não"}</Button.Title>
      </Button>

      <Button onPress={onOk}>
        <Button.Title> {okText ?? "Sim"}</Button.Title>
      </Button>
    </View>
  );
};

BaseModal.BaseButtons = ModalBaseButtons;
