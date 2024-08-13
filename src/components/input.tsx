import { ReactNode } from "react";
import { Platform, TextInput, TextInputProps, View } from "react-native";
import clsx from "clsx";
import { colors } from "../style";

type Variants = "primary" | "secondary" | "bordered";

type InputProps = {
  children: ReactNode;
  error?: string;
  variant?: Variants;
};

function Input({ children, variant = "primary" }: InputProps) {
  return (
    <View
      className={clsx(
        "h-14 w-full flex-row items-center justify-center gap-2 rounded-lg border-b-[1px] border-zinc-300 px-2",
        {
          "bg-black": variant === "secondary",
          "border-2": variant === "bordered",
        },
      )}
    >
      {children}
    </View>
  );
}
function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      cursorColor={colors.orange[500]}
      selectionColor={Platform.OS === "ios" ? colors.orange[500] : undefined}
      placeholderTextColor={colors.zincBlur[200]}
      className="flex-1 font-regular text-lg text-zinc-200"
      {...rest}
    />
  );
}

Input.Field = Field;

export { Input };
