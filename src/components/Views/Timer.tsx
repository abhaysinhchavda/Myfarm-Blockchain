import React from "react";
import { useCountDown } from "../../hooks/useMiscellaneous";
import styled from "styled-components";

interface IsTimer {
  endTime: number;
  Status: boolean;
}

export const TimeWrapper = styled.div<{ isEnded: boolean }>`
  background: ${(props) => (props.isEnded ? "#0ac90ad6" : "#FEDEDE")};
  width: 100%;
  margin-bottom: 0.3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 5px;
  font-size: 15px;
`;

export const Timer = ({ endTime, Status }: IsTimer) => {
  const timer = useCountDown(endTime);

  return timer.isRunning ? (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TimeWrapper isEnded={Status}>
        <span style={{ marginRight: "0.3rem" }}>{timer.days}D</span>
        <span style={{ marginRight: "0.3rem" }}>{timer.hours}H</span>
        <span>{timer.minutes}M</span>
      </TimeWrapper>
    </div>
  ) : (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          background: Status ? "#0ac90ad6" : "#FEDEDE",
          marginBottom: "0.3rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          borderRadius: 5,
          fontSize: "10px",
          fontWeight: 700,
          width: 95,
          height: 22,
          paddingTop: 5,
        }}
      >
        Pool Ended
      </div>
    </div>
  );
};
