import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface IToastContext {
  showToast: (Toast: ReactNode) => void;
  setCurrentToast: React.Dispatch<React.SetStateAction<ReactNode>>;
}

const ToastContext = createContext({} as IToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [currentToast, setCurrentToast] = useState<React.ReactNode>();

  const showToast = (toast: ReactNode) => {
    setCurrentToast(toast);
  };

  return (
    <ToastContext.Provider value={{ showToast, setCurrentToast }}>
      {children}
      {currentToast}
    </ToastContext.Provider>
  );
}

export function useToast<T extends unknown[]>(
  toast?: (...args: T) => ReactNode,
  deps?: React.DependencyList,
) {
  const { showToast, setCurrentToast } = useContext(ToastContext);

  const overrideShowToast = useCallback(
    (...args: T) => {
      const el = toast?.(...args);
      showToast(el);
    },
    [showToast, ...(deps ?? [])],
  );

  return {
    showToast: overrideShowToast,
    setCurrentToast,
  };
}
