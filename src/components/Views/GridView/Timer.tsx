import React from "react";
import styled from "styled-components";
import { useCountDown } from "../../../hooks/useMiscellaneous";

const TimerWrapper = styled.div`
  text-align: center;
  margin-left: 1rem;
  color: black;
  margin-bottom: 50px;
`;

const RewardText = styled.div`
  position: relative;
  width: 66px;
  height: 19px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  top: 22px;
  left: 5px;
`;

const TimerText = styled.div`
  position: relative;
  top: 2px;
  right: -185px;
  width: 112px;
  height: 18px;
  margin-bottom: 10px;
  background: #FEDEDE;
  color: #5a5858;
  padding-bottom: 10px;
  padding-right: 5px;
  text-align: center;
  border-radius: 5px;
  font-size:13px;
`;

const PoolEndedText = styled.div`
  position:relative;
  left:205px;
  background: #FEDEDE;
  width: 30%;
  margin-bottom: 0.3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 5px;
  font-size: 10px;
  height:20px;
  font-weight: 800;
  padding-top:3px;
  padding-left:12px;
  padding-bottom:10px;
  align-items:center;
  white-space:nowrap;
  color:grey;
`;

interface TimerProps {
  endTime: number;
}

export default function Timer({ endTime }: TimerProps): JSX.Element {
  const timer = useCountDown(endTime);

  return !timer.days ? (
    <TimerWrapper>
      <RewardText>Rewards</RewardText>
      <PoolEndedText>Pool Ended</PoolEndedText>
    </TimerWrapper>
  ) : (
    <TimerWrapper>
      <RewardText>Rewards</RewardText>
      <TimerText>
        &nbsp;{timer.days}D&nbsp;&nbsp;
        {timer.hours}H&nbsp;&nbsp;
        {timer.minutes}M
      </TimerText>
    </TimerWrapper>
  );
}
