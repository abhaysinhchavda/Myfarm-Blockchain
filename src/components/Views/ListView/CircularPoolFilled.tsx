import React from "react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import ListItemWithToolTip from "./ListItemWithToolTip";
import styled from "styled-components";
import { roundValue } from "../../../utilities";

const CircularPoolFilledWrapper = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 14px;
  margin-top: 0.3rem;
`;

export interface CircularPoolFilledProps {
  poolFilled: number;
}

export default function CircularPoolFilled({
  poolFilled,
}: CircularPoolFilledProps) {
  return (
    <ListItemWithToolTip
      title="Pool Filled"
      tippyContent="This number tells what percentage of maximum staking limit has been reached"
    >
      <CircularPoolFilledWrapper>
        <CircularProgressbar
          value={poolFilled}
          text={`${roundValue(poolFilled,0)}%`}
          styles={buildStyles({
            pathColor: "#45DA54",
            textColor: "black",
            textSize: "28px",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
      </CircularPoolFilledWrapper>
    </ListItemWithToolTip>
  );
}
