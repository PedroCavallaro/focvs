import AsyncStorage from "@react-native-async-storage/async-storage";

export class Storage {
  static async set<T>(key: string, value: T) {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  static async get<T>(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value) {
        return JSON.parse(value) as T;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async remove(key: string) {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }
}
