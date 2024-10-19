/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Vibration,
  StatusBar,
  Easing,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
const { height } = Dimensions.get("window");

import { useRef } from "react";

const timers = [...Array(26).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = height * 0.03;

// THIS COMPONENT WOULD BE AWESOME TO HAVE ON THE APP
// BUT, DUE TO THE DEADLINE I WILL IMPLEMENTE A SIMPLE ONE
export default function TimeConfig() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <ScrollView
      horizontal={true}
      style={{
        position: "absolute",
        height: 400,
      }}
    >
      <Animated.FlatList
        data={timers}
        style={{
          backgroundColor: "#FF0000",
        }}
        bounces={false}
        onMomentumScrollEnd={(ev) => {
          const index = Math.floor(ev.nativeEvent.contentOffset.y / ITEM_SIZE);

          console.log(timers[index + 1]);
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollY },
              },
            },
          ],
          { useNativeDriver: true },
        )}
        horizontal={false}
        decelerationRate="fast"
        keyExtractor={(item) => item.toString()}
        renderItem={({ item, index }) => {
          console.log(index);
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];

          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: "clamp",
          });

          return (
            <View className="w-32 items-center justify-center">
              <Animated.Text
                style={[
                  {
                    height: ITEM_SIZE,
                  },
                  {
                    opacity,
                    transform: [{ scale }],
                  },
                ]}
                className="font-medium text-3xl text-white"
              >
                {item}
              </Animated.Text>
            </View>
          );
        }}
      />
    </ScrollView>
  );
}
