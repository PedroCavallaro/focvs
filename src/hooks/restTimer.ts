import { useAtom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { useCallback, useEffect } from "react";
import { STORAGE_KEYS } from "../utils/keys";
import { Storage } from "../services";

interface TimerAtom {
  timerConfig: Array<number>;
  isTimerRunning: boolean;
}

const restTimerAtom = atomWithReset<TimerAtom>({} as TimerAtom);

export function useRestTimer() {
  const [restTimer, setRestTimer] = useAtom(restTimerAtom);

  function arrayToSeconds(timeArray: Array<number>) {
    const totalMinutes = String(timeArray[0]) + String(timeArray[1]);
    const totalSeconds = String(timeArray[2]) + String(timeArray[3]);

    const minutesToSeconds = Number(totalMinutes) * 60;
    const seconds = Number(totalSeconds);

    return minutesToSeconds + seconds;
  }

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
  }, []);

  const handleTimerConfig = useCallback(
    (index: number, v: number) => {
      const newTimer = restTimer.timerConfig;

      newTimer[index] = v;

      setRestTimer((prev) => ({ ...prev, timerConfig: newTimer }));
    },
    [setRestTimer, restTimer],
  );

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
        },
        arrayToSeconds(restTimer.timerConfig) * 1000,
      );
    }

    return () => clearTimeout(timerId);
  }, [restTimer]);

  return {
    restTimer,
    handleTimer,
    setRestTimer,
    getPreviousTimer,
    handleStart,
    arrayToSeconds,
    handleTimerConfig,
  };
}
