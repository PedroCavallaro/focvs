import { RecoverPasswordForm } from "@/src/features/auth/recoverPasswordForm";
import { useCallback, useState } from "react";
import { RECOVER_PASSWORD_STATE } from "./auth.types";

export default function RecoverPassword() {
  const [formState, setFormState] = useState(RECOVER_PASSWORD_STATE.GET_CODE);

  const handleState = useCallback(
    (state: RECOVER_PASSWORD_STATE) => {
      setFormState(state);
    },
    [setImmediate],
  );

  return <RecoverPasswordForm state={formState} handleState={handleState} />;
}
