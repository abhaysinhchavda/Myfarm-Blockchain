import React from "react";
import StakedFarmDetails from "../../../components/V2/InspectStake/StakedFarmDetails";
import Tk1 from "../../../assets/V2/Images/tk1.png";
import Dt2 from "../../../assets/V2/Images/dt2.png";
import Dt3 from "../../../assets/V2/Images/dt3.png";
import Token1 from "../../../assets/V2/Images/tk1.png";
import style from "styled-components";
import ClaimInfo from "../../../components/V2/InspectClaim/ClaimInfo";
import ExpectedReward from "../../../components/V2/InspectFarm/ExpectedReward";

const DetailWrapper = style.div`

`;
const Rewards = [
  {
    rewardTokenIcon: Tk1,
    rewardTokenName: "Tether",
    rewardTokenTicker: "USDT",
    expectedReward: 150,
  },
  {
    rewardTokenIcon: Dt2,
    rewardTokenName: "Tether",
    rewardTokenTicker: "FTX",
    expectedReward: 130,
  },
  {
    rewardTokenIcon: Dt3,
    rewardTokenName: "Tether",
    rewardTokenTicker: "USDT",
    expectedReward: 180,
  },
  {
    rewardTokenIcon: Tk1,
    rewardTokenName: "Tether",
    rewardTokenTicker: "USDT",
    expectedReward: 150,
  },
  {
    rewardTokenIcon: Dt2,
    rewardTokenName: "Tether",
    rewardTokenTicker: "FTX",
    expectedReward: 130,
  },
  {
    rewardTokenIcon: Dt3,
    rewardTokenName: "Tether",
    rewardTokenTicker: "USDT",
    expectedReward: 180,
  },
];

const InspectClaim = () => {
  return (
    <DetailWrapper>
      <StakedFarmDetails
        TokenUrl={Token1}
        Name="USDT"
        Version="Cohort 29"
        isUnstaked={true}
      />
      <div style={{ display: "flex", alignItems: "end" }}>
        <div>
          <ClaimInfo
            farmIcon={Token1}
            farmName="Cohort 29"
            cohortVersion="USDT"
            APY={194}
            tokenStaked={12}
            tokenStakedInUsd={58}
            transactionUrl="https://opensea.io/"
            unStakedOn={"23/05/2021"}
          />
        </div>
        <ExpectedReward isClaimed={true} rewards={Rewards} />
      </div>
    </DetailWrapper>
  );
};
export default InspectClaim;
