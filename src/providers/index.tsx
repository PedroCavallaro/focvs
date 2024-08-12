import { ReactNode } from "react";
import { JotaiProvider } from "./JotaiProvider";

export function Providers({ children }: { children: ReactNode }) {
  return <JotaiProvider>{children}</JotaiProvider>;
}
