import { ReactNode, useEffect } from "react";
import { Animated, Text, View } from "react-native";
import { useToast } from "../../providers/toastProvider";
import clsx from "clsx";
import { ToastVariants, useToastAnimations } from "./toast-animations";

export function Toast({
  children,
  onClick,
  variant = "bottom-right",
}: {
  variant?: ToastVariants;
  children: ReactNode;
  onClick?: () => void;
}) {
  const { setCurrentToast } = useToast();
  const { toastAnimations, viewWidth, viewWidthAnimation, animation } =
    useToastAnimations({ variant });

  useEffect(() => {
    Animated.timing(toastAnimations, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(viewWidth, {
        toValue: 100,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => {});
    });

    const timeout = setTimeout(() => {
      Animated.timing(toastAnimations, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        setCurrentToast(null);
      });
    }, 2390);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View
      className={clsx("absolute min-w-64 overflow-hidden rounded-2xl", {
        "bottom-24 right-0": variant === "bottom-right",
        "right-0 top-24": variant === "top-right",
      })}
    >
      <Animated.View
        className="h-16 flex-col justify-between gap-2 rounded-lg bg-black"
        style={animation}
        onTouchStart={onClick}
      >
        {children}
        <Animated.View
          style={viewWidthAnimation}
          className="h-1 rounded-full bg-orange-500"
        ></Animated.View>
      </Animated.View>
    </View>
  );
}

const Content = ({
  prefixIcon,
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  prefixIcon?: ReactNode;
}) => {
  return (
    <View className="bg-black p-3">
      <View className="flex-row items-center gap-2">
        {prefixIcon}
        <Text className="font-regular text-lg text-white">{title} </Text>
      </View>
      {subtitle && <Text className="text-white">{subtitle} </Text>}
    </View>
  );
};

Toast.Content = Content;
