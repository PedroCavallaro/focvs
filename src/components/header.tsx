import { Menu, UserCircle } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { colors } from "../style/colors";
import { useDrawer } from "../providers/drawerProvider";
import { NavigationDrawer } from "../features/navigationDrawer";
import { Drawer } from "./drawer";

export function Header() {
  const { openDrawer, closeDrawer } = useDrawer(() => (
    <Drawer title="" onClose={() => closeDrawer()}>
      <NavigationDrawer close={closeDrawer} />
    </Drawer>
  ));

  return (
    <View className="mb-2 w-full flex-row items-center justify-between px-2 py-5">
      <TouchableOpacity onPress={openDrawer}>
        <Menu size={28} color={colors.orange[500]} />
      </TouchableOpacity>
      <UserCircle size={28} color={colors.orange[500]} />
    </View>
  );
}
