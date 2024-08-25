import clsx from "clsx";
import { Check } from "lucide-react-native";
import { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";

export function CheckBox({
  onCheck,
  onUnCheck,
}: {
  onCheck?: () => void;
  onUnCheck?: () => void;
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
        onPress={handleChecked}
        className={clsx(
          "mt-1 flex h-10 w-10 items-center justify-center rounded-md",
          {
            "bg-orange-500": checked,
            "bg-zinc-900": !checked,
          },
        )}
      >
        {checked && <Check size={15} color={"#000"} />}
      </TouchableOpacity>
    </View>
  );
}
