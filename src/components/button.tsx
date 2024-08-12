import { createContext, useContext } from "react";
import {
  TextProps,
  TouchableOpacityProps,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import clsx from "clsx";

type Variants = "primary" | "secondary";

type ButtonProps = TouchableOpacityProps & {
  variant?: Variants;
  isLoading?: boolean;
};

function Button({
  children,
  isLoading,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.7}
      className={clsx(
        "min-h-14 w-full flex-row items-center justify-center gap-2 rounded-lg",
        {
          "bg-orange-500": variant === "primary",
          "bg-orange-700": variant === "secondary",
        },
      )}
      {...rest}
    >
      {isLoading ? <ActivityIndicator className="text-black" /> : children}
    </TouchableOpacity>
  );
}
function Title({ children, ...rest }: TextProps) {
  return (
    <Text className={"font-regular text-lg text-black"} {...rest}>
      {children}
    </Text>
  );
}

Button.Title = Title;

export { Button };
