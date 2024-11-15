import clsx from "clsx";
import { Check } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../style";

export function CheckBox({
  onCheck,
  onUnCheck,
  disabled,
}: {
  onCheck?: () => void;
  onUnCheck?: () => void;
  disabled?: boolean;
}) {
  const [checked, setChecked] = useState(false);

  const handleChecked = useCallback(() => {
    if (!checked) {
      onCheck?.();

      return setChecked(true);
    }

    onUnCheck?.();

    return setChecked(false);
  }, [checked]);

  return (
    <View className="w-[6%] flex-row items-center justify-center">
      <TouchableOpacity
        disabled={disabled}
        onPress={handleChecked}
        className={clsx(
          "mt-1 flex h-10 w-10 items-center justify-center rounded-md",
          {
            "bg-zinc-800": !checked,
            "bg-zinc-900": checked,
          },
        )}
      >
        <Text>{checked && <Check size={15} color={colors.orange[500]} />}</Text>
      </TouchableOpacity>
    </View>
  );
}
