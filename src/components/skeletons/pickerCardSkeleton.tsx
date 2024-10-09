import { ScrollView, FlatList, View } from "react-native";

export function PickerSkeleton() {
  return (
    <ScrollView horizontal className="flex-row flex-wrap gap-8">
      <FlatList
        data={Array(6).fill(0)}
        numColumns={2}
        keyExtractor={() => String(Math.random() * 100)}
        renderItem={() => (
          <View className="mx-1 mt-2 h-52 min-w-52 animate-pulse gap-10 rounded-md bg-zinc-400 py-4 opacity-10 delay-1000"></View>
        )}
      />
    </ScrollView>
  );
}
