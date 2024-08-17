import { colors } from "@/src/style";
import { Undo2, X } from "lucide-react-native";
import { View, TouchableOpacity, Text } from "react-native";
import { Input } from "../../input";
import { Set } from "./addExerciseModal";
import clsx from "clsx";

export function SetRow({
  i,
  deleteMode,
  set,
  handleDelete,
  handleValueChange,
}: {
  deleteMode: boolean;
  i: number;
  set: Set;
  handleDelete: (i: number) => void;
  handleValueChange: (i: number, value: number, key: keyof Set) => void;
}) {
  return (
    <View className="flex flex-row gap-6">
      {deleteMode ? (
        <TouchableOpacity
          onPress={() => handleDelete(i)}
          className="w-[2%] justify-center px-1"
        >
          {set.onDelete ? (
            <Undo2 color={colors.orange[500]} />
          ) : (
            <X color={colors.orange[500]} />
          )}
        </TouchableOpacity>
      ) : (
        <View className="w-[2%]"></View>
      )}
      <View className="w-2/12 px-2">
        <Input>
          <Input.Field
            keyboardType="numeric"
            editable={false}
            className="text-center text-white"
            value={String(set.set_number)}
          />
        </Input>
      </View>
      <View className="w-2/6">
        <Input>
          <Input.Field
            keyboardType="numeric"
            className="text-center font-regular text-white"
            onChangeText={(v) => handleValueChange(i, Number(v), "reps")}
            value={String(set.reps)}
          />
        </Input>
      </View>
      <View className="w-3/12 flex-row">
        <Input>
          <Input.Field
            keyboardType="numeric"
            className="flex-1 text-center text-white"
            onChangeText={(v) => handleValueChange(i, Number(v), "weight")}
            value={String(set.weight)}
          />
          <Text className="text-white opacity-70">KG</Text>
        </Input>
      </View>
      <View
        className={clsx("w-3", {
          "bg-red-800": set.onDelete,
        })}
      ></View>
    </View>
  );
}
