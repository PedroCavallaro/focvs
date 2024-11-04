import { Image, Text, View } from "react-native";
import { useAuth } from "../hooks";

export function UserSummary() {
  const { user } = useAuth();

  return (
    <View className="w-full flex-col items-center justify-center gap-5">
      <View className="h-24 w-24 overflow-hidden rounded-full">
        <Image
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          source={require("../../assets/images/user-icon.png")}
          className="h-24 w-24"
        />
      </View>
      <View className="flex-col items-center justify-center gap-2">
        <Text className="font-regular text-2xl text-white">{user?.name}</Text>
        <Text className="text-md font-regular text-white/80">
          {user?.email}
        </Text>
      </View>
    </View>
  );
}
