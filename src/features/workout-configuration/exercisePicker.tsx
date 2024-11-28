import { View } from "react-native";
import { ReactNode } from "react";
import { PickerSkeleton } from "../../components/skeletons/pickerCardSkeleton";

export function ExercisePicker({
  children,
  loading,
}: {
  children: ReactNode;
  loading: boolean;
}) {
  return (
    <View className="w-11/12 flex-col gap-4">
      {loading ? <PickerSkeleton /> : children}
    </View>
  );
}
