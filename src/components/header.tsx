import { Menu, UserCircle } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { colors } from "../style/colors";

export function Header() {
  return (
    <View className="mt-6 h-24 w-full flex-row items-center justify-between px-2">
      <TouchableOpacity>
        <Menu size={25} color={colors.orange[500]} />
      </TouchableOpacity>
      <UserCircle size={25} color={colors.orange[500]} />
    </View>
  );
}
