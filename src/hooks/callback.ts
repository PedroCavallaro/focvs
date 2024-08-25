import { useCallback } from "react";
import { useLoading } from "./loading";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";

export function useCallbackPlus<T, U = unknown>(
  callback: (...args: U[]) => Promise<T> | T,
  deps: React.DependencyList,
  id?: string,
) {
  const { handleLoading } = useLoading();
  const router = useRouter();

  const handleAxiosErrors = useCallback((error: AxiosError) => {
    if (error.status === 401) {
      router.push("/");
    }
  }, []);

  return useCallback(
    async (...args: U[]) => {
      try {
        if (id) {
          handleLoading(id, true);
        }

        const val = await callback(...(args ?? []));

        if (id) {
          handleLoading(id, false);
        }

        return val;
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          handleAxiosErrors(error);
        }

        // do some error handling
      }
    },
    [handleAxiosErrors, ...deps],
  );
}
