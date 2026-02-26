import React, { Fragment, useContext } from "react";
import { Farm } from "../store/farms/reducer";
import { RewardToken } from "../utilities";

interface StakeDetails {
  stakeId: number | null;
  stakedAmount: number;
  APY: number;
  time: number;
  rewards: RewardToken[];
  transactionHash: string | null;
}

export type DataType = {
  farm: Farm;
  stakeDetails: StakeDetails | null;
};

interface ContextInterface {
  data: DataType;
}

interface ScreenContextProps extends ContextInterface {
  children: React.ReactNode;
}

const Context = React.createContext<ContextInterface | null>(null);

export const useScreenContext = () => {
  return useContext(Context).data;
};

export default function ScreenContext({
  data,
  children,
}: ScreenContextProps): JSX.Element {
  return (
    <Fragment>
      <Context.Provider value={{ data }}>{children}</Context.Provider>
    </Fragment>
  );
}
