import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useState, useMemo, useCallback } from "react";
import { api } from "../api";
import { useFooter } from "./footer";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export function useSearch() {
  const { animation, handleScroll } = useFooter();

  const [query, setQuery] = useState({
    q: "",
    page: 1,
    limit: 10,
  });

  const { data: workouts, refetch } = useQuery({
    queryKey: ["search-workouts"],
    queryFn: () => api.workout.searchWorkouts(query),
  });

  const fetchWorkouts = useMemo(() => debounce(() => refetch(), 400), [query]);

  const isCloseToBottom = useCallback(
    ({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }: NativeSyntheticEvent<NativeScrollEvent>["nativeEvent"]) => {
      const paddingToBottom = 20;

      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    },
    [],
  );

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isCloseToBottom(e.nativeEvent)) {
        setQuery((prev) => ({
          ...prev,
          limit: prev.limit + 10,
        }));
      }

      handleScroll(e);
    },
    [setQuery, handleScroll, isCloseToBottom],
  );

  return {
    query,
    workouts,
    animation,
    fetchWorkouts,
    setQuery,
    handleScroll: onScroll,
  };
}
