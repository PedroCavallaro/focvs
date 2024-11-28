import * as AsyncStorage from "expo-secure-store";

export class Storage {
  static async setItem<T>(key: string, value: T) {
    try {
      return await AsyncStorage.setItemAsync(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  static async getItem<T>(key: string) {
    try {
      const value = await AsyncStorage.getItemAsync(key);

      if (value) {
        return JSON.parse(value) as T;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async removeItem(key: string) {
    try {
      return await AsyncStorage.deleteItemAsync(key);
    } catch (error) {
      console.log(error);
    }
  }
}
