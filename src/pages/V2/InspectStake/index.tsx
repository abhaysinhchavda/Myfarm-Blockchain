import React from "react";
import Token1 from "../../../assets/V2/Images/tk1.png";
import style from "styled-components";
import NFTCard from "../../../components/V2/InspectStake/NFTCard";
import UnconfirmedRewards from "../../../components/V2/InspectStake/UnconfirmedRewards";
import ConfirmedRewards from "../../../components/V2/InspectStake/StakeReward";
import ClaimHistory from "../../../components/V2/InspectStake/ClaimHistory";
import NFTimg from "../../../assets/V2/Images/NFTplaceholder.png";
import Dt2 from "../../../assets/V2/Images/uniswap.png";
import Tk1 from "../../../assets/V2/Images/MekerDai.png";
import BoosterAd from "../../../components/V2/InspectStake/BoosterAd";
import StakedFarmDetails from "../../../components/V2/InspectStake/StakedFarmDetails";
const DetailWrapper = style.div`
@media (max-width: 425px) {
  width:100%
  overflow: hidden;
  }
`;
const Wrapper = style.div`
display:flex;
align-items:baseline;
@media (max-width: 425px) {
flex-direction:column;  
width:100%;
display:none;
}
`;
const MobileWrapper = style.div`
display:none;
align-items:baseline;
@media (max-width: 425px) {
flex-direction:column;  
width:100%;
display: flex;
}
`;
const Rewards = [
  {
    rewardTokenIcon: Tk1,
    rewardTokenName: "Makerdai",
    rewardTokenTicker: "DAI",
    expectedReward: 150,
  },
  {
    rewardTokenIcon: Dt2,
    rewardTokenName: "Tether",
    rewardTokenTicker: "FTX",
    expectedReward: 130,
  },
];
const InspectStake = () => {
  return (
    <DetailWrapper>
      <StakedFarmDetails
        TokenUrl={Token1}
        Name="USDT"
        Version="Cohort 29"
        isUnstaked={false}
      />
      <Wrapper>
        <div style={{ width: "100%" }}>
          <NFTCard svgUrl={NFTimg} openseaUrl="https://opensea.io/" />
          <BoosterAd isUserBoosted={true} boostedAPY={156} />
        </div>
        <div style={{ width: "100%" }}>
          <UnconfirmedRewards />
          <ConfirmedRewards rewards={Rewards} />
          <ClaimHistory />
        </div>
      </Wrapper>
      <MobileWrapper>
        <NFTCard svgUrl={NFTimg} openseaUrl="https://opensea.io/" />
        <UnconfirmedRewards />
        <ConfirmedRewards rewards={Rewards} />
        <ClaimHistory />
        <BoosterAd isUserBoosted={true} boostedAPY={156} />
      </MobileWrapper>
    </DetailWrapper>
  );
};
export default InspectStake;
