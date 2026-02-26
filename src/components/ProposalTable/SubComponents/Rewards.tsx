import React from "react";

interface RewardProps {
  rewards: any;
}

const Rewards = (props: RewardProps) => {
  return (
    <div>
      <img src={props.rewards} />
    </div>
  );
};

export default Rewards;
