import { ReactNode } from "react";
import { JotaiProvider } from "./jotaiProvider";
import { DrawerProvider } from "./drawerProvider";
import { ModalProvider } from "./modalProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { WorkoutProvider } from "./workoutProvider";
import { RestTimerProvider } from "./restTimerProvider";
import { ToastProvider } from "./toastProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <WorkoutProvider>
            <RestTimerProvider>
              <ModalProvider>
                <DrawerProvider>{children}</DrawerProvider>
              </ModalProvider>
            </RestTimerProvider>
          </WorkoutProvider>
        </ToastProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
}
