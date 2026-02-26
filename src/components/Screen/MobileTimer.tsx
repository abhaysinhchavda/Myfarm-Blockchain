import React from "react";
import styled from "styled-components";
import { useCountDown } from "../../hooks/useMiscellaneous";

const StyledMobileTimer = styled.div`
  background: #ff000057;
  margin-left: 9px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 5px;
`;

export default function MobileTimer({ endTime }: { endTime: number }) {
  const timer = useCountDown(endTime);
  return (
    <StyledMobileTimer>
      {timer.isRunning ? (
        <>
          {timer.days}D {timer.hours}H {timer.minutes}M
        </>
      ) : (
        "Pool Ended"
      )}
    </StyledMobileTimer>
  );
}
