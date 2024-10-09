import { View, Text } from "react-native";
import { Input } from "../../../components/input";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { daysOfWeek } from "@/src/utils";
import { colors } from "@/src/style";
import { ChangeWorkoutInfo } from "@/src/app/home/new";

export function NewWorkoutForm({
  changeValue,
}: {
  changeValue: ({ key, value }: ChangeWorkoutInfo) => void;
}) {
  const [day, setDay] = useState(-1);

  return (
    <View className="flex-row items-center justify-between gap-2">
      <View className="mt-2 w-2/4 flex-col">
        <Text className="relative -top-3 font-light text-lg text-white opacity-70">
          Nome
        </Text>
        <Input>
          <Input.Field
            onChangeText={(value) => changeValue({ key: "name", value })}
            placeholder="Nome do treino"
          />
        </Input>
      </View>
      <View className="w-2/4 flex-col">
        <Text className="font-light text-lg text-white opacity-70">Dia</Text>
        <View className="border-b-[1px] border-zinc-200">
          <Picker
            enabled={true}
            mode="dropdown"
            style={{
              height: "auto",
              backgroundColor: "#000",
              color: "#fff",
              padding: 0,
            }}
            itemStyle={{
              backgroundColor: "#000",
              color: colors.zinc[200],
            }}
            selectedValue={day}
            onValueChange={(value) => {
              setDay(value);
              changeValue({ key: "day", value: Number(value) });
            }}
          >
            <Picker.Item
              style={{
                backgroundColor: "#000",
                color: "#fff",
              }}
              label={"Selecionar dia"}
              value={-1}
            />
            {Object.entries(daysOfWeek).map(([key, val], i) => {
              return (
                <Picker.Item
                  key={i}
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                  }}
                  label={val}
                  value={key}
                />
              );
            })}
          </Picker>
        </View>
      </View>
    </View>
  );
}
