import { ReactNode } from "react";
import { JotaiProvider } from "./JotaiProvider";
import { DrawerProvider } from "./DrawerProvider";
import { ModalProvider } from "./ModalProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <JotaiProvider>
      <ModalProvider>
        <DrawerProvider>{children}</DrawerProvider>
      </ModalProvider>
    </JotaiProvider>
  );
}
