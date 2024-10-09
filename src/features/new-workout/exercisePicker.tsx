import { View, Text } from "react-native";
import { ReactNode } from "react";
import { Button } from "../../components/button";
import { PickerSkeleton } from "../skeletons/pickerCardSkeleton";

export function ExercisePicker({
  children,
  loading,
  muscleName,
  openDrawer,
}: {
  children: ReactNode;
  loading: boolean;
  muscleName: string;
  openDrawer: () => void;
}) {
  return (
    <View className="w-11/12 flex-col gap-4">
      {loading ? <PickerSkeleton /> : children}
    </View>
  );
}
