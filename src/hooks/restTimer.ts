import { useAtom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { useState, useCallback } from "react";
import { STORAGE_KEYS } from "../utils/keys";
import { Storage } from "../services";

const restTimerAtom = atomWithReset(false);

export function useRestTimer() {
  const [timer, setTimer] = useState([0, 0, 0, 0]);
  const [isTimerRunning, setIsTimerRunning] = useAtom(restTimerAtom);

  const handleTimer = useCallback(() => {
    setIsTimerRunning((prev) => !prev);
  }, [setIsTimerRunning]);

  const getPreviousTimer = useCallback(async () => {
    const timerConfig = await Storage.getItem(STORAGE_KEYS.USER_TIMER_CONFIG);

    setTimer(timerConfig as Array<number>);
  }, [setTimer]);

  const handleStart = useCallback(async () => {
    await Storage.setItem(STORAGE_KEYS.USER_TIMER_CONFIG, timer);

    handleTimer();
  }, []);

  const handleTimerConfig = useCallback(
    (index: number, v: number) => {
      const newTimer = timer;

      newTimer[index] = v;

      setTimer(newTimer);
    },
    [setTimer, timer],
  );

  return {
    isTimerRunning,
    timer,
    handleTimer,
    setTimer,
    getPreviousTimer,
    handleStart,
    handleTimerConfig,
  };
}
