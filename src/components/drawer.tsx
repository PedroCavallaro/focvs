import {
  DRAWER_ANIMATION_TIMING,
  useDrawer,
} from "@/src/providers/drawerProvider";
import { colors } from "@/src/style";
import clsx from "clsx";
import { ChevronRight, X } from "lucide-react-native";
import { ReactNode, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");

export interface DrawerItemProps {
  prefixIcon: ReactNode;
  title: string;
  disabled?: boolean;
  onPress: () => void;
}

export type DrawerItemVariants = "primary" | "no-border";

export function Drawer({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const { drawerAnimation, hasDrawer } = useDrawer();
  const animation = useMemo(() => {
    return {
      transform: [
        {
          translateX: drawerAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [-width, 0],
          }),
        },
      ],
    };
  }, [drawerAnimation]);

  useEffect(() => {
    if (hasDrawer) {
      Animated.timing(drawerAnimation, {
        toValue: 1,
        duration: DRAWER_ANIMATION_TIMING,
        useNativeDriver: true,
      }).start(() => {});
    }
  }, []);

  return (
    <View className="absolute top-0 z-50 h-full w-full">
      <Animated.View style={animation}>
        <View className="h-full w-full flex-col gap-8 bg-black px-5">
          <View className="mt-14 flex-row justify-between">
            <Text className="font-regular text-2xl text-white">{title}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
              <X color={colors.zinc[200]} size={20} />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

const Item = ({
  prefixIcon,
  title,
  onPress,
  hasRightIcon = true,
  containerVariant = "primary",
  disabled,
}: DrawerItemProps & {
  hasRightIcon?: boolean;
  containerVariant?: DrawerItemVariants;
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      onPress={onPress}
      className={clsx("h-24 w-full flex-row items-center justify-between", {
        "border-b-[0.2px] border-white/70": containerVariant === "primary",
        "opacity-45": disabled,
      })}
    >
      <View className="flex-row items-center gap-4">
        {prefixIcon}
        <Text className="font-regular text-lg text-white">{title}</Text>
      </View>
      {hasRightIcon && <ChevronRight size={20} color={colors.zincBlur[200]} />}
    </TouchableOpacity>
  );
};

Drawer.Item = Item;
