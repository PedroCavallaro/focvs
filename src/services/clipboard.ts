import * as ExpoClipboard from "expo-clipboard";

export class Clipboard {
  static async copyToClipboard(text: string) {
    try {
      await ExpoClipboard.setStringAsync(text);
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchCopiedText() {
    return await ExpoClipboard.getStringAsync();
  }
}
