import React from "react";
import style from "styled-components";
import styled from "styled-components";

import Divider from "@mui/material/Divider";
import ClaimRewards from "../InspectClaim";

const TransactionWrapper = style.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px;

margin-top:12px;
width: 697px;
height:300px;
margin-left:1rem;
background:white;
border: 1px solid #D5D5D5;
box-sizing: border-box;
border-radius: 10px;
@media (max-width: 425px) {
  width: 100%;
  margin-left: 0px;
  overflow: hidden;
}
`;
const WrapRewards = style.div`
display:flex;
flex-flow:wrap;
justify-content:space-between;
margin-left:1rem;
margin-right:1rem;
overflow-y: scroll;
::-webkit-scrollbar {
  display: none;
}
`;

const DividerLine = styled(Divider)`
  position: relative;
  top: -20px;
  width: 695px;
  left: -20px;
`;

const Header = style.h2`
position:relative;
top:-20px;
left:15px;
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
@media (max-width: 425px) {
  left: 0px;
}
`;
const RewardButtonWrapper = style.div`
display:flex;
justify-content:space-between;
width:100%;
position: relative;
`;
interface Reward {
  rewardTokenIcon: string;
  rewardTokenName: string;
  rewardTokenTicker: string;
  expectedReward: number;
}
interface Props {
  rewards: Reward[];
}
const StakeReward = ({ rewards }: Props) => {
  return (
    <>
      <TransactionWrapper>
        <RewardButtonWrapper>
          <Header>Confirmed Rewards</Header>
          <ClaimRewards unStake={false} setIsModalOpen={() => {}} />
        </RewardButtonWrapper>

        <DividerLine />
        <WrapRewards>
          {rewards.map((reward, id) => (
            <ExpectedRewardItem
              key={id}
              symbol={reward.rewardTokenIcon}
              title={reward.rewardTokenName}
              tickerName={reward.rewardTokenTicker}
              // Bg="rgba(80, 175, 149, 0.1);"
              price={reward.expectedReward}
            />
          ))}
        </WrapRewards>
      </TransactionWrapper>
    </>
  );
};
export default StakeReward;

import getAverageColor from "get-average-color";

const TokenWrapper = style.div`
display:flex;
flex-direction:column;
align-items:center;
`;
const ImageWrapper = style.img`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 18px;
width: 102px;
height: 102px;
left: 59px;
top: 10px;
border-radius: 70px;
@media (max-width: 425px) {

  width: 85px;
  height: 85px;
  }
`;
const TextWrapper = style.span`

height: 22px;
left: 35px;
top: 151px;

/* heading 2 */

font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 50px;
/* identical to box height */

display: flex;
align-items: center;
text-align: center;

/* font/header */

color: #212121;
`;
interface IsRewards {
  symbol: any;
  title: any;
  tickerName: any;
  price: number;
}
const ExpectedRewardItem = ({
  symbol,
  title,
  tickerName,
  price,
}: IsRewards) => {
  const [color, setColor] = React.useState("");

  getAverageColor(Symbol).then((rgb) =>
    setColor(`rgba(${rgb.r},${rgb.g},${rgb.b},0.1)`)
  );

  const RewardWrapper = style.div`
display: flex;
flex-direction: row;
align-items: flex-start;
justify-content:center;
padding: 0px 35px;
width: 190px;
height: 180px;
left: 30px;
top: 30px;
margin:5px;
background: ${color};
border: 1px solid rgba(80, 175, 149, 0.6);
box-sizing: border-box;
border-radius: 8px;
@media (max-width: 425px) {
  width: 145px;
  margin: 5px;
  height: 150px;
}
`;

  return (
    <RewardWrapper>
      <TokenWrapper>
        <ImageWrapper src={symbol} height="102" width="102" />
        <TextWrapper>{price}</TextWrapper>
        <TextWrapper>
          {title}({tickerName})
        </TextWrapper>
      </TokenWrapper>
    </RewardWrapper>
  );
};
