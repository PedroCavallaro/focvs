import { X } from "lucide-react-native";
import { ReactNode, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { colors } from "../style";
import { useDrawer } from "../providers/drawerProvider";
const { width } = Dimensions.get("window");

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
        duration: 300,
        useNativeDriver: true,
      }).start(() => {});
    }
  }, []);

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
