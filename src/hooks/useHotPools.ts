import { isEmpty } from "lodash";
import { useMemo } from "react";
import { Farm } from "../store/farms/reducer";
import { useApplicationUserState } from "../store/user/hooks";
import { PoolsTabPosition } from "../store/user/reducer";
import { useExcludedFarms } from "./useMiscellaneous";

export const useExactFarms = (): Farm[] => {
  const farms = useExcludedFarms();
  const { poolTabPosition } = useApplicationUserState();
  return useMemo(() => {
    if (isEmpty(farms)) return null;
    if (poolTabPosition === PoolsTabPosition.POOLS) {
      return farms;
    } else if (poolTabPosition === PoolsTabPosition.HOT_POOLS) {
      return farms.filter((e) => {
        return e.isHotpool === true;
      });
    }
    return farms;
  }, [farms, poolTabPosition]);
};
