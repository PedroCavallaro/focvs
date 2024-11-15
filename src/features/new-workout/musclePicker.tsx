import { ReactNode } from "react";
import { View } from "react-native";
import { PickerSkeleton } from "../../components/skeletons/pickerCardSkeleton";

export function MusclePicker({
  children,
  loading,
}: {
  children: ReactNode;
  loading: boolean;
}) {
  return (
    <View className="flex-col gap-4">
      {loading ? <PickerSkeleton /> : children}
    </View>
  );
}
