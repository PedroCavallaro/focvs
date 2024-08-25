import { useCallbackPlus } from "./callback";
import { CreateAccountDTO, LoginDTO, UserDTO } from "../api/dtos";
import { api } from "../api";
import { atomWithReset } from "jotai/utils";
import { useAtom } from "jotai";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "expo-router";
import { STORAGE_KEYS } from "../constants";

const userAtom = atomWithReset<UserDTO | null>(null);

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);

  const login = useCallbackPlus(async (data: LoginDTO) => {
    const { token } = await api.auth.login(data);

    await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, token);

    const parsed = jwtDecode<UserDTO>(token);

    setUser(parsed);

    router.push("/home");

    return token;
  }, []);

  const createAccount = useCallbackPlus(async (data: CreateAccountDTO) => {
    const { token } = await api.auth.createAccount(data);

    await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, token);

    const parsed = jwtDecode<UserDTO>(token);

    setUser(parsed);

    router.push("/home");

    return token;
  }, []);

  return {
    login,
    createAccount,
    user,
    setUser,
  };
}
