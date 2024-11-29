import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { STORAGE_KEYS } from "../utils";
import { Storage } from "../services";
import { Toast } from "../components/toast/toast";
import { useToast } from "./toastProvider";
import { AlarmClock } from "../features/home/restimer/alarmClock";

interface TimerState {
  timerConfig: Array<number>;
  isTimerRunning: boolean;
}

interface IRestTimerContext {
  handleTimer: () => void;
  getPreviousTimer: () => void;
  handleStart: () => void;
  handleTimerConfig: (index: number, v: number) => void;
  restTimer: TimerState;
  setRestTimer: React.Dispatch<React.SetStateAction<TimerState>>;
  arrayToSeconds: (timeArray: Array<number>) => number;
}

const RestTimerContext = createContext({} as IRestTimerContext);

export function RestTimerProvider({ children }: { children: ReactNode }) {
  const [restTimer, setRestTimer] = useState(
    () =>
      ({
        timerConfig: [0, 0, 0, 0],
      }) as TimerState,
  );
  const [currentTimer, setCurrentTimer] = useState(0);

  function arrayToSeconds(timeArray: Array<number>) {
    const totalMinutes = String(timeArray[0]) + String(timeArray[1]);
    const totalSeconds = String(timeArray[2]) + String(timeArray[3]);

    const minutesToSeconds = Number(totalMinutes) * 60;
    const seconds = Number(totalSeconds);

    return minutesToSeconds + seconds;
  }

  const { showToast } = useToast(() => (
    <Toast>
      <Toast.Content
        prefixIcon={<AlarmClock />}
        title="Tempo de descanso finalizado"
      />
    </Toast>
  ));

  const handleTimer = useCallback(() => {
    setRestTimer((prev) => ({
      ...prev,
      isTimerRunning: !prev.isTimerRunning,
    }));
  }, [setRestTimer]);

  const getPreviousTimer = useCallback(async () => {
    const timerConfig = await Storage.getItem(STORAGE_KEYS.USER_TIMER_CONFIG);

    setRestTimer((prev) => ({
      ...prev,
      timerConfig: timerConfig as Array<number>,
    }));
  }, [setRestTimer]);

  const handleStart = useCallback(async () => {
    await Storage.setItem(
      STORAGE_KEYS.USER_TIMER_CONFIG,
      restTimer.timerConfig,
    );

    handleTimer();
  }, [restTimer]);

  const handleTimerConfig = useCallback(
    (index: number, v: number) => {
      const newTimer = restTimer?.timerConfig ?? [0, 0, 0, 0];

      newTimer[index] = v;

      setRestTimer((prev) => ({ ...prev, timerConfig: newTimer }));
    },
    [setRestTimer, restTimer],
  );

  useEffect(() => {
    getPreviousTimer();
  }, [getPreviousTimer]);

  useEffect(() => {
    let timerId: Timer;

    if (restTimer.isTimerRunning) {
      timerId = setTimeout(
        () => {
          handleTimer();
          setRestTimer((prev) => ({
            ...prev,
            timerConfig: [0, 0, 0, 0],
          }));
          showToast();
        },

        arrayToSeconds(restTimer.timerConfig) * 1000,
      );
    }

    return () => clearTimeout(timerId);
  }, [restTimer, showToast]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        console.log("oi");
      },
      arrayToSeconds(restTimer.timerConfig) * 1000,
    );

    return () => clearInterval(interval);
  }, [restTimer]);

  return (
    <RestTimerContext.Provider
      value={{
        getPreviousTimer,
        handleStart,
        handleTimer,
        handleTimerConfig,
        setRestTimer,
        arrayToSeconds,
        restTimer,
      }}
    >
      {children}
    </RestTimerContext.Provider>
  );
}

export const useRestTimer = () => useContext(RestTimerContext);
