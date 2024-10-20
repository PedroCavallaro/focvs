import { Menu, UserCircle } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { colors } from "../style/colors";
import { useDrawer } from "../providers/drawerProvider";
import { Drawer } from "./drawer";
import { NavigationDrawer } from "../features/navigationDrawer";

export function Header() {
  const { openDrawer, closeDrawer } = useDrawer(() => (
    <Drawer title="" onClose={() => closeDrawer()}>
      <NavigationDrawer close={closeDrawer} />
    </Drawer>
  ));

  return (
    <View className="mt-6 h-16 w-full flex-row items-center justify-between px-2 py-4">
      <TouchableOpacity onPress={openDrawer}>
        <Menu size={28} color={colors.orange[500]} />
      </TouchableOpacity>
      <UserCircle size={28} color={colors.orange[500]} />
    </View>
  );
}
