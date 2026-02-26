import { useState } from "react";
import { useCallback } from "react";

export const useSortingHandlers = () => {
  const [sortingValue, setSortingValue] = useState<string>("New Pools");
  const sortHandler = useCallback((newSortingValue: string) => {
    setSortingValue(newSortingValue);
  }, []);
  return { sortingValue, sortHandler };
};
