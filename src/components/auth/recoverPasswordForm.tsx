import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { RECOVER_PASSWORD_STATE } from "@/src/app/auth/auth.types";
import { useMemo } from "react";
import { GetRecoverCode } from "./recover-steps/getRecoverCodeForm";
import { TypeCodeForm } from "./recover-steps/typeCodeForm";
import { ChangePasswordForm } from "./recover-steps/changePassowordForm";

export function RecoverPasswordForm({
  state,
  handleState,
}: {
  state: RECOVER_PASSWORD_STATE;
  handleState: (state: RECOVER_PASSWORD_STATE) => void;
}) {
  const router = useRouter();

  const currentForm = useMemo(() => {
    switch (state) {
      case RECOVER_PASSWORD_STATE.GET_CODE:
        return <GetRecoverCode handleState={handleState} />;
      case RECOVER_PASSWORD_STATE.TYPE_CODE:
        return <TypeCodeForm handleState={handleState} />;
      case RECOVER_PASSWORD_STATE.CHANGE_PASSWORD:
        return <ChangePasswordForm handleState={handleState} />;
    }
  }, [handleState, state]);
  return (
    <View className="w-full flex-col gap-10">
      <View className="w-full items-end px-4">
        <TouchableOpacity
          className="flex-col gap-2"
          onPress={() => router.replace("/")}
        >
          <Text className="text-right font-regular text-lg text-white">
            Voltar para login
          </Text>
          <View className="h-[0.9px] bg-orange-500"></View>
        </TouchableOpacity>
      </View>
      {currentForm}
    </View>
  );
}
