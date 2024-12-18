import {
  TextProps,
  TouchableOpacityProps,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import clsx from "clsx";
import { createContext, useContext } from "react";

type Variants = "primary" | "secondary" | "tertiary";
type SizeVariants = "small" | "medium" | "large";

type ButtonProps = TouchableOpacityProps & {
  variant?: Variants;
  isLoading?: boolean;
  sizeVariant?: SizeVariants;
};

type ButtonContext = {
  variant: Variants;
};
const ButtonContext = createContext({} as ButtonContext);

function Button({
  children,
  isLoading,
  variant = "primary",
  sizeVariant = "large",
  ...rest
}: ButtonProps) {
  return (
    <ButtonContext.Provider value={{ variant }}>
      <TouchableOpacity
        disabled={isLoading}
        activeOpacity={0.7}
        className={clsx(
          "w-full flex-row items-center justify-center gap-2 rounded-lg",
          {
            "border-[1px] border-orange-500 bg-black": variant === "tertiary",
            "bg-orange-500": variant === "primary",
            "bg-orange-700": variant === "secondary",
            "min-h-10": sizeVariant === "small",
            "min-h-12": sizeVariant === "medium",
            "min-h-14": sizeVariant === "large",
          },
        )}
        {...rest}
      >
        {isLoading ? <ActivityIndicator className="text-black" /> : children}
      </TouchableOpacity>
    </ButtonContext.Provider>
  );
}
function Title({ children, ...rest }: TextProps) {
  const { variant } = useContext(ButtonContext);

  return (
    <Text
      className={clsx("font-regular text-lg text-black", {
        "text-orange-500": variant === "tertiary",
      })}
      {...rest}
    >
      {children}
    </Text>
  );
}

Button.Title = Title;

export { Button };
