import React from "react";
import style from "styled-components";
const TvlWrapper = style.div`
position: static;
height: 66px;
left: 20px;
top: 25px;
flex: none;
order: 0;
flex-grow: 0;

`;

const TokenWrapper = style.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
width: 80px;
height: 24px;
left: 20px;
top: 25px;
@media (max-width: 425px) {
 width: 100%;

}
`;

const TokenName = style.span`
position: static;
height: 24px;
left: 34px;
top: 0px;
font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
display: flex;
align-items: center;
color: #616161;
flex: none;
order: 1;
flex-grow: 0;

`;
const TokenPrice = style.div`
height: 24px;
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 24px;
display: flex;
align-items: center;
margin-top:1rem;
/* font/header */

color: #212121;
`;
const CohortCont = style.div`

display: flex;
width: 100%;
justify-content: space-evenly;
align-items: center;
margin-top: 40px;
gap: 15px;
`;
const CohortInnerCont = style.div`
width: 100%;
display: flex;
    align-items: center;
    justify-content: space-between;
`;
const ImgDiv = style.img`
 width:65px;
 @media (max-width: 425px) {
    width: 0px;
   
   }
`;

interface FarmData {
  farmId: number,
  cohortAddress: string,
  farmTokenName: string,
  farmTokenIcon: string,
  cohortVersion: string,
  farmTokenAddress: string,
  APY: number,
}

interface isUserStakingDetail {
  noOfTokensStake: number;
  noOfTokensStakeUSD: number;
  farmData: FarmData;
}
const UserStakingDetail = ({
  farmData,
  noOfTokensStake,
  noOfTokensStakeUSD,
}: isUserStakingDetail) => {
  return (
    <CohortCont>
      <ImgDiv src={farmData.farmTokenIcon} width={65} />
      <CohortInnerCont>
        <TvlWrapper>
          <TokenWrapper>
            <TokenName>{farmData.farmTokenName}</TokenName>
          </TokenWrapper>
          <TokenPrice>price</TokenPrice>
        </TvlWrapper>
        <TvlWrapper>
          <TokenWrapper>
            <TokenName>APY</TokenName>
          </TokenWrapper>
          <TokenPrice>{farmData.APY}</TokenPrice>
        </TvlWrapper>
        <TvlWrapper>
          <TokenWrapper>
            <TokenName># of Token</TokenName>
          </TokenWrapper>
          <TokenPrice>{noOfTokensStake}</TokenPrice>
        </TvlWrapper>
        <TvlWrapper>
          <TokenWrapper>
            <TokenName>$ of Token</TokenName>
          </TokenWrapper>
          <TokenPrice>{noOfTokensStakeUSD}</TokenPrice>
        </TvlWrapper>
      </CohortInnerCont>
    </CohortCont>
  );
};
export default UserStakingDetail;
