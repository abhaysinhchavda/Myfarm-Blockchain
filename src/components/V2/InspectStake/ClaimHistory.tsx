import React, { useState } from "react";
import style from "styled-components";
import styled from "styled-components";

import Divider from "@mui/material/Divider";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import BTC from "../../../assets/V2/Images/Btc.png";
import Eth from "../../../assets/V2/Images/Eth.png";
import Poly from "../../../assets/V2/Images/poly.png";
import Styled from "styled-components";
import { useAppView } from "store/V2/dapp/hooks";
import emptyImage from "../../../assets/V2/Images/empty.png";

const HistoryItemCont = style.div`
display: flex;
width: 100%;
align-items: center;
margin: 15px 0px;

`;

const ClaimedOn = style.p`
margin-left: 50px;
    font-size: 14px;
    font-weight: 400;
    color: #616161;
    line-height: 24px;
    display: flex;
align-items: center;

`;

const ViewOn = style.p`
margin-left: 50px;
    font-size: 14px;
    font-weight: 400;
    color: #616161;
    line-height: 24px;
    display: flex;
align-items: center;
cursor: pointer;
`;
const TransactionWrapper = style.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px;

margin-top:12px;
width: 697px;
height:285px;
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
padding: 6px 0px;
cursor: pointer;
`;
const HistoryItemColumnCont = style.div`

display: flex;
width: 100%;
align-items: center;
`;

const RewardColumn = style.p`
    font-size: 14px;
    color: #673AB7;
    line-height: 24px;
    display: flex;
align-items: center;
font-weight: 600;
    margin: 0px;
    margin-left: 20px;
    text-transform: uppercase;
`;
const EmptyCont = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const EmptyIcon = styled.img`
  width: 66px;
  height: 66px;
`;
const EmptyText = styled.h2`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: #212121;
`;
const ClaimedOnColumn = style.p`
margin: 0px;
color: #673AB7;
line-height: 24px;
display: flex;
align-items: center;
font-weight: 600;
margin-left: 85px;
text-transform: uppercase;
`;
const ClaimHistory = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  return (
    <>
      <TransactionWrapper>
        <Header onClick={() => setIsEmpty(!isEmpty)}>Claim History</Header>
        <DividerLine />
        {isEmpty ? (
          <EmptyCont>
            <EmptyIcon src={emptyImage} alt="" />
            <EmptyText>No Rewards claimed yet</EmptyText>
          </EmptyCont>
        ) : (
          <>
            <HistoryItemColumnCont>
              <RewardColumn>Rewards</RewardColumn>
              <ClaimedOnColumn>Claimed On</ClaimedOnColumn>
            </HistoryItemColumnCont>
            <WrapRewards>
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
            </WrapRewards>
          </>
        )}
      </TransactionWrapper>
    </>
  );
};
export default ClaimHistory;

const Rewards = () => {
  const SwitchList = useAppView();
  const RootWrapper =
    SwitchList == 1
      ? Styled.div`
      display:flex;
      justify-content:space-between;
      margin-top:20px;
      margin-bottom:10px;
      margin-left:3px;
      align-items:center;
    `
      : Styled.div`
    `;

  const ImageWrper =
    SwitchList == 1
      ? Styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-start;
    margin-right:3.6rem
    `
      : Styled.div`
        display:flex;
        align-items:center;
        justify-content:center
    `;

  return (
    <RootWrapper>
      <ImageWrper>
        <img src={BTC} width={36} height={36} />
        <img src={Eth} width={36} height={36} />
        <img src={Poly} width={36} height={36} />
      </ImageWrper>
    </RootWrapper>
  );
};

function HistoryItem() {
  return (
    <HistoryItemCont>
      <Rewards />
      <ClaimedOn>14/Jan/2020</ClaimedOn>
      <ViewOn>
        <OpenInNewIcon
          style={{ color: "#616161", width: "14px", margin: "0px 5px" }}
        />
        View in Explorer
      </ViewOn>
    </HistoryItemCont>
  );
}
