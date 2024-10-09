import { ReactNode } from "react";
import { JotaiProvider } from "./jotaiProvider";
import { DrawerProvider } from "./drawerProvider";
import { ModalProvider } from "./modalProvider";
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
