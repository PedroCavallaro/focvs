import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, atomWithStorage } from "jotai/utils";

export const atomWithAsyncStorage = <T>(key: string, initialValue: T) => {
  const storage = createJSONStorage<T>(() => AsyncStorage);

  const { getItem, setItem } = storage;

  storage.setItem = async (_, value) => {
    return await setItem(key, value);
  };

  storage.getItem = async () => {
    const value = await getItem(key, initialValue);

    return value;
  };

  return atomWithStorage(key, initialValue, storage);
};
