import React from "react";
import ListItemWithToolTip from "./ListItemWithToolTip";
import styled from "styled-components";
import { useApy } from "../../../hooks/useCohortHooks";
import { roundValue } from "../../../utilities";

export const StyledValueContainer = styled.span`
  font-size: 18px;
  margin-top: 0.3rem;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  line-height: 25px;
  color: #1a1a1a;
`;

export interface APYProps {
  action: "STAKE" | "UNSTAKE";
  APY: number;
  apyRange: number[];
}

export default function Apy({ action, APY, apyRange }: APYProps): JSX.Element {
  const apy = useApy(action, APY, apyRange);
  return (
    <ListItemWithToolTip
      title="APY"
      tippyContent="Estimated APY Rewards you would potentially earn if you stake $100 worth of tokens"
    >
      <StyledValueContainer>{roundValue(apy, 2)}%</StyledValueContainer>
    </ListItemWithToolTip>
  );
}
