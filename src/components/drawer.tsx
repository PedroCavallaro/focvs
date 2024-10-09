import { X } from "lucide-react-native";
import { ReactNode } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { colors } from "../style";
import { useDrawer } from "../providers/DrawerProvider";

export function Drawer({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const { animation } = useDrawer();

  return (
    <View className="absolute top-0 z-50 h-full w-full">
      <Animated.View style={animation}>
        <View className="h-full w-full flex-col gap-8 bg-black px-5">
          <View className="mt-16 flex-row justify-between">
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
