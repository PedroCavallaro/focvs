import { ReactNode } from "react";
import { JotaiProvider } from "./JotaiProvider";
import { DrawerProvider } from "./DrawerProvider";
import { ModalProvider } from "./ModalProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <DrawerProvider>{children}</DrawerProvider>
        </ModalProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
}
