import { Menu, UserCircle } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { colors } from "../style/colors";
import { useDrawer } from "../providers/DrawerProvider";
import { Drawer } from "./drawer";
import { NavigationDrawer } from "./navigationDrawer";

export function Header() {
  const { openDrawer, closeDrawer } = useDrawer(() => (
    <Drawer title="" onClose={() => closeDrawer()}>
      <NavigationDrawer close={closeDrawer} />
    </Drawer>
  ));

  return (
    <View className="mt-6 h-24 w-full flex-row items-center justify-between px-2">
      <TouchableOpacity onPress={openDrawer}>
        <Menu size={25} color={colors.orange[500]} />
      </TouchableOpacity>
      <UserCircle size={25} color={colors.orange[500]} />
    </View>
  );
}
