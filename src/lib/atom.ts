import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, atomWithStorage } from "jotai/utils";
import { add, formatISO } from "date-fns";

export const atomWithAsyncStorage = <T>(key: string, initialValue: T) => {
  const storage = createJSONStorage<T>(() => AsyncStorage);

  const { getItem, setItem } = storage;

  storage.setItem = (_, value, expireInHours = 24) => {
    const expireAt = add(new Date(), { hours: expireInHours });
    const updatedValue = { ...value, expireAt: formatISO(expireAt) };

    return setItem(key, updatedValue);
  };

  storage.getItem = async () => {
    const value = await getItem(key, initialValue);

    return value;
  };

  return atomWithStorage(key, initialValue, storage);
};
