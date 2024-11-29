import { Text, View } from "react-native";
import { useCallback, useMemo } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { Storage } from "../services";
import { STORAGE_KEYS } from "../utils/keys";
import { Drawer, DrawerItemProps } from "../components/drawer";
import {
  BicepsFlexed,
  ChartLine,
  CircleHelp,
  Headset,
  LogOut,
  Wallet,
} from "lucide-react-native";
import { colors } from "../style";
import { ScrollView } from "react-native";
import { UserSummary } from "./userSummary";
import { useWorkout } from "../providers/workoutProvider";
import { Workout } from "../api/dtos";

export function NavigationDrawer({ close }: { close: () => void }) {
  const router = useRouter();
  const { setWorkout } = useWorkout();

  const routes = useMemo(
    () =>
      [
        {
          prefixIcon: <ChartLine size={20} color={colors.orange[500]} />,
          title: "Estatísticas",
          onPress: () => close(),
        },
        {
          prefixIcon: <BicepsFlexed size={20} color={colors.orange[500]} />,
          title: "Meus Treinos",

          onPress: () => close(),
        },
        {
          prefixIcon: <Wallet size={20} color={colors.orange[500]} />,
          title: "Planos",
          disabled: true,
          onPress: () => close(),
        },
      ] as Array<DrawerItemProps>,
    [close],
  );

  const exit = useCallback(async () => {
    setWorkout({ currentSets: {} } as Workout);

    await Promise.all([
      SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN),
      Storage.removeItem(STORAGE_KEYS.WORKOUT_OF_THE_DAY),
    ]);

    router.replace("/");
    close();
  }, [router, close]);

  return (
    <ScrollView>
      <View className="flex-col justify-between gap-6">
        <View className="flex-col gap-8">
          <UserSummary />
          <View className="flex-col gap-4">
            {routes.map(({ onPress, prefixIcon, title, disabled }, i) => (
              <Drawer.Item
                key={i}
                disabled={disabled}
                onPress={onPress}
                prefixIcon={prefixIcon}
                title={title}
              />
            ))}
          </View>
        </View>
        <View className="flex-col justify-start">
          <Drawer.Item
            containerVariant="no-border"
            onPress={() => console.log("IMPLEMNT")}
            prefixIcon={<Headset size={18} color={colors.zincBlur[700]} />}
            title="Suporte"
          />
          <Drawer.Item
            containerVariant="no-border"
            onPress={() => console.log("IMPLEMNT")}
            prefixIcon={<CircleHelp size={18} color={colors.zincBlur[700]} />}
            title="Termos e condições"
          />
          <Drawer.Item
            containerVariant="no-border"
            hasRightIcon={false}
            onPress={exit}
            prefixIcon={<LogOut size={18} color={colors.red[500]} />}
            title="Sair"
          />
        </View>
        <Text className="text-white/70">Versão 0.0.1</Text>
      </View>
    </ScrollView>
  );
}
