import React from "react";
import ListItemWithToolTip from "./ListItemWithToolTip";
import { StyledValueContainer } from "./Apy";

interface StakeProps {
  title: string;
  stakedAmount: number;
}

const Stake = ({ title, stakedAmount }: StakeProps) => {
  return (
    <ListItemWithToolTip title={title} tippyContent="User Staked Amount">
      <StyledValueContainer>{stakedAmount}</StyledValueContainer>
    </ListItemWithToolTip>
  );
};

export default Stake;
