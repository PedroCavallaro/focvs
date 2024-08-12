import { Menu, UserCircle } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { colors } from "../style/colors";

export function Header() {
  return (
    <View className="w-full items-center h-24 px-2  justify-between flex-row">
      <TouchableOpacity>
        <Menu size={25} color={colors.orange[500]} />
      </TouchableOpacity>
      <UserCircle size={25} color={colors.orange[500]} />
    </View>
  );
}
