import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated } from "react-native";

interface IDrawerContext {
  openDrawer: (drawer: ReactNode) => void;
  closeDrawer: () => void;
  animation: {
    transform: {
      translateX: Animated.AnimatedInterpolation<string | number>;
    }[];
  };
}

const DrawerContext = createContext({} as IDrawerContext);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [currentDrawer, setCurrentDrawer] = useState<React.ReactNode>();
  const drawerAnimation = useRef(new Animated.Value(0)).current;

  const openDrawer = (drawer: ReactNode) => {
    setCurrentDrawer(drawer);
    Animated.timing(drawerAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    setCurrentDrawer(null);
  };

  //todo: this animation
  const animation = useMemo(() => {
    return {
      transform: [
        {
          translateX: drawerAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      ],
    };
  }, [drawerAnimation]);

  return (
    <DrawerContext.Provider value={{ closeDrawer, openDrawer, animation }}>
      {children}
      {currentDrawer}
    </DrawerContext.Provider>
  );
}

export function useDrawer<T extends unknown[]>(
  drawer?: (...args: T) => ReactNode,
  deps?: React.DependencyList,
) {
  const { openDrawer, closeDrawer, animation } = useContext(DrawerContext);

  const overrideOpenDrawer = useCallback(
    (...args: T) => {
      const el = drawer?.(...args);
      openDrawer(el);
    },
    [openDrawer, ...(deps ?? [])],
  );

  return {
    openDrawer: overrideOpenDrawer,
    closeDrawer,
    animation,
  };
}
