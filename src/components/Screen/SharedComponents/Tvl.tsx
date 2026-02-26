import React from "react";
import { getTVL, roundValue } from "../../../utilities";
import MainComponent from "./MainComponent";

interface TVLProps {
  totalStaking: number;
  usdPrice: number;
}

export default function Tvl({ totalStaking, usdPrice }: TVLProps): JSX.Element {
  return (
    <div>
      <MainComponent
        title="TVL"
        tippyContent="Total value locked in this staking pool."
        associatedValue={`$${roundValue(getTVL(totalStaking, usdPrice), 2)}`}
      />
    </div>
  );
}
