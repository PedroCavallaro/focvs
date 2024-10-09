import { ReactNode } from "react";
import { View, Text } from "react-native";
import { Button } from "../../components/button";
import { PickerSkeleton } from "../skeletons/pickerCardSkeleton";

export function MusclePicker({
  children,
  loading,
  openDrawer,
}: {
  openDrawer: () => void;
  children: ReactNode;
  loading: boolean;
}) {
  return (
    <View className="flex-col gap-4">
      {loading ? <PickerSkeleton /> : children}
    </View>
  );
}
