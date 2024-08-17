import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface IModalContext {
  openModal: (modal: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext({} as IModalContext);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [currentModal, setCurrentModal] = useState<React.ReactNode>();

  const openModal = (modal: ReactNode) => {
    setCurrentModal(modal);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  return (
    <ModalContext.Provider value={{ closeModal, openModal }}>
      {children}
      {currentModal}
    </ModalContext.Provider>
  );
}

export function useModal<T extends unknown[]>(
  modal: (...args: T) => ReactNode,
  deps: React.DependencyList,
) {
  const { openModal, closeModal } = useContext(ModalContext);

  const overrideOpenModal = useCallback(
    (...args: T) => {
      const el = modal(...args);
      openModal(el);
    },
    [openModal, ...deps],
  );

  return {
    openModal: overrideOpenModal,
    closeModal,
  };
}
