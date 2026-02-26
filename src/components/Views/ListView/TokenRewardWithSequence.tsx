import React, { Fragment } from "react";
import styled from "styled-components";
import { TokenMetaData } from "../../../store/lists/reducer";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { getNumberOfRemainingToken } from "../../../utilities";

const TokenRewardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
`;

const TokenRewardFlexBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const RewardTokenIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const StyledRewardToken = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  line-height: 15px;
  font-size: 10px;
  color: #1a1a1a;
`;

const StyledFlexBox = styled.div`
  display: flex;
`;

const RewardTokenIterationBox = styled.div`
  margin-right: 8px;
`;

const StyledOtherRewardTokenIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right:8px;
`;

const StyledOtherRewardTokenName = styled.span`
  position: relative;
  top: -7px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 15px;
  color: #1b1b1b;
`;

const RemainingReward = styled.div`
  cursor: pointer;
`;

export interface TokenRewardWithSequenceProps {
  rewardsWithSequence: TokenMetaData[];
}

function TokenRewardIcon({
  tokenIcon,
  rewardToken,
}: {
  tokenIcon: string;
  rewardToken: string;
}) {
  return (
    <Fragment>
      <RewardTokenIcon src={tokenIcon} alt={rewardToken} />
      <StyledRewardToken>{rewardToken}</StyledRewardToken>
    </Fragment>
  );
}

export default function TokenRewardWithSequence({
  rewardsWithSequence,
}: TokenRewardWithSequenceProps) {
  const numberRemainingToken = getNumberOfRemainingToken(
    rewardsWithSequence?.length
  );

  return (
    <TokenRewardWrapper>
      <TokenRewardFlexBox>
        <StyledFlexBox>
          {rewardsWithSequence !== null &&
            rewardsWithSequence.slice(0, 3).map((items, index) => {
              return (
                <RewardTokenIterationBox key={index}>
                  <TokenRewardIcon
                    tokenIcon={items?.icon}
                    rewardToken={items?.symbol}
                  />
                </RewardTokenIterationBox>
              );
            })}
        </StyledFlexBox>

        <Tippy
          theme="light"
          placement="bottom"
          content={rewardsWithSequence
            ?.slice(3, rewardsWithSequence?.length)
            .map((items,index) => {
              return (
                  <div key={index} style={{marginTop:'5px'}}>
                      <StyledOtherRewardTokenIcon src={items.icon} />
                      <StyledOtherRewardTokenName>
                        {items.symbol}
                      </StyledOtherRewardTokenName>
                    </div>
                
              );
            })}
        >
          {numberRemainingToken && (
            <RemainingReward>+{numberRemainingToken}</RemainingReward>
          )}
        </Tippy>
      </TokenRewardFlexBox>
    </TokenRewardWrapper>
  );
}
