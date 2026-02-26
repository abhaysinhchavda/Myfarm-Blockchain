import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TokenRewardWithSequenceProps } from "../ListView/TokenRewardWithSequence";
import styled from "styled-components";
import _ from "loadsh";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const RewardTokenName = styled.span`
  color: black;
`;

const useStyles = makeStyles(() => ({
  imageDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },
  MainDiv: {
    textAlign: "center",
    marginBottom: "0.8rem",
    marginTop: "0.8rem",
    fontWeight: 600,
    color: "#787878",
  },
}));

export default function TokenRewardWithSequence({
  rewardsWithSequence,
}: TokenRewardWithSequenceProps): JSX.Element {
  const classes = useStyles();

  function RewardToken({
    tokenIcon,
    rewardToken,
  }: {
    tokenIcon: string;
    rewardToken: string;
  }): JSX.Element {
    return (
      <div className={classes.imageDiv}>
        <img src={tokenIcon} alt={rewardToken} width={25} />
        <RewardTokenName>{rewardToken}</RewardTokenName>
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.MainDiv}>Rewards</div>
      <FlexWrapper>
        {!_.isEmpty(rewardsWithSequence) &&
          rewardsWithSequence.map((items, index) => {
            return (
              <RewardToken
                key={index}
                tokenIcon={items.icon}
                rewardToken={items.symbol}
              />
            );
          })}
      </FlexWrapper>
    </Fragment>
  );
}
