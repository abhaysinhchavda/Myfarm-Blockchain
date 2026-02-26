import React from "react";
import style from "styled-components";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import InfoIcon from '@material-ui/icons/Info';
const TransactionWrapper = style.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px;
overflow: hidden;
margin-top:12px;
width: 697px;
height:515px;
margin-left:1.3rem;
background:white;
border: 1px solid #D5D5D5;
box-sizing: border-box;
border-radius: 10px;


@media (max-width: 425px) {
  width: 100%;
  margin-left:0px;


}

`;
const WrapRewards = style.div`
display:flex;
flex-flow:wrap;
justify-content:flex-start;
column-gap:2px;
margin-left:1rem;
margin-right:1rem;
::-webkit-scrollbar {
  display: none;
}
overflow-y: scroll;


@media (max-width: 425px) {
  justify-content: flex-start;
  column-gap: 10px;
  margin:0;

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
left:0px;
  

}
`;

interface Reward {
  rewardTokenIcon: string;
  rewardTokenName: string;
  rewardTokenTicker: string;
  expectedReward: number;
}
interface Props {
  isClaimed: boolean;
  rewards: Reward[];
}

const ExpectedReward = ({ isClaimed, rewards }: Props) => {
  return (
    <>
      <TransactionWrapper
        style={isClaimed ? { height: "385px" } : { height: "515px" }}
      >
        <Header>{isClaimed ? "Rewards Claimed" : "Expected Rewards"}</Header>
        <DividerLine />

        <WrapRewards>
          {rewards.map((reward, id) => (
            <ExpectedRewardItem
              key={id}
              symbol={reward.rewardTokenIcon}
              name={reward.rewardTokenName}
              tickerName={reward.rewardTokenTicker}
              rewardValue={reward.expectedReward}
            />
          ))}
        </WrapRewards>
      </TransactionWrapper>
    </>
  );
};
export default ExpectedReward;

import Style from "styled-components";
import getAverageColor from "get-average-color";

const TokenWrapper = Style.div`
display:flex;
flex-direction:column;
align-items:center;
`;
const ImageWrapper = Style.img`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 18px;


width: 102px;
height: 102px;
left: 59px;
top: 10px;


border-radius: 70px;
`;
const TextWrapper = Style.span`


height: 22px;
left: 35px;
top: 151px;

/* heading 2 */

font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 50px;
margin-top:0.5rem;
/* identical to box height */

display: flex;
align-items: center;
text-align: center;
justify-content:center;
/* font/header */

color: #212121;
`;
interface IsRewards {
  symbol: string;
  name: string;
  tickerName: string;
  rewardValue: number;
}

const ExpectedRewardItem = ({ symbol, name, tickerName, rewardValue }: IsRewards) => {
  const [color, setColor] = React.useState("");

  getAverageColor(symbol).then((rgb) =>
    setColor(`rgba(${rgb.r},${rgb.g},${rgb.b},0.1)`)
  );

  const RewardWrapper = Style.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content:center;
  padding: 20px 35px;
  width: 190px;
  height: 190px;
  left: 30px;
  top: 30px;
  margin-bottom:1rem;
  background: ${color};
  border: 1px solid rgba(80, 175, 149, 0.6);
  box-sizing: border-box;
  border-radius: 8px;
  @media (max-width: 425px) {
    width: 48%;
  }
`;
  const PriceWrapper = Style.h3`
margin:0
`;
  return (
    <RewardWrapper>
      <TokenWrapper>
        <ImageWrapper src={symbol} height="102" width="102" />
        <PriceWrapper>{rewardValue}</PriceWrapper>
        <TextWrapper>
        {name?.toString().slice(0, 5)}
            {name?.toString().length > 5 ? (
              <>
                ...
                <Tippy theme="light" placement="top" content={name ?? name}>
                  <InfoIcon
                    style={{
                      fontSize: '13px',
                      color: '#C4C4C4',
                    }}
                  />
                </Tippy>
              </>
            ) : null}
           
          ({tickerName})
        </TextWrapper>
      </TokenWrapper>
    </RewardWrapper>
  );
};
