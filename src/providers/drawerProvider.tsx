import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Animated } from "react-native";

interface IDrawerContext {
  openDrawer: (drawer: ReactNode) => void;
  closeDrawer: () => void;
  drawerAnimation: Animated.Value;
  hasDrawer: boolean;
}

const DrawerContext = createContext({} as IDrawerContext);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const drawerAnimation = useRef(new Animated.Value(0)).current;
  const [currentDrawer, setCurrentDrawer] = useState<React.ReactNode>();

  const openDrawer = (drawer: ReactNode) => {
    setCurrentDrawer(drawer);
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentDrawer(null);
    });
  };

  return (
    <DrawerContext.Provider
      value={{
        closeDrawer,
        openDrawer,
        drawerAnimation,
        hasDrawer: currentDrawer !== null,
      }}
    >
      {children}
      {currentDrawer}
    </DrawerContext.Provider>
  );
}

export function useDrawer<T extends unknown[]>(
  drawer?: (...args: T) => ReactNode,
  deps?: React.DependencyList,
) {
  const { openDrawer, closeDrawer, drawerAnimation, hasDrawer } =
    useContext(DrawerContext);

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
    drawerAnimation,
    hasDrawer,
  };
}
