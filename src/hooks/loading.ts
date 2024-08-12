import { useAtom } from "jotai";
import { atomWithReset } from "jotai/utils";

type LoadingAtom = Record<string, boolean>;

const loadingAtom = atomWithReset<LoadingAtom>({});

export function useLoading(id?: string) {
  const [loading, setLoading] = useAtom(loadingAtom);

  const handleLoading = (id: string, state: boolean) => {
    setLoading((prev) => (prev = { ...prev, [id]: state }));
  };

  const resetLoading = () => {
    setLoading({});
  };

  return {
    handleLoading,
    resetLoading,
    loading: id ? loading[id] : false,
  };
}
