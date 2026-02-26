import React from "react";
import { getTVL, roundValue, usdCurrencyFormat } from "../../../utilities";
import { StyledValueContainer } from "./Apy";
import ListItemWithToolTip from "./ListItemWithToolTip";

export interface TotalValueLockedProps {
  totalStaking: number;
  usdPrice: number;
}

export default function TotalValueLocked({
  totalStaking,
  usdPrice,
}: TotalValueLockedProps) {
  const usdTotalValueLocked = roundValue(getTVL(totalStaking, usdPrice), 2);

  return (
    <ListItemWithToolTip
      title="TVL"
      tippyContent="Total value locked in this staking pool"
    >
      <StyledValueContainer>
        {usdCurrencyFormat(usdTotalValueLocked)}
      </StyledValueContainer>
    </ListItemWithToolTip>
  );
}
