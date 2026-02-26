import React, { useEffect } from 'react';
import FarmDetails from '../../../components/V2/InspectFarm/FarmDetails';
import style from 'styled-components';
import Stake from '../../../components/V2/InspectFarm/Stake';
import BoosterAd from '../../../components/V2/InspectFarm/BoosterAd';
import ExpectedReward from '../../../components/V2/InspectFarm/ExpectedReward';
import { useParams } from 'react-router-dom';
import { useV2Farms } from '../../../store/V2/farms/hooks';
import ConfirmStaking from '../../../components/V2/Modals/ConfirmStakeModal/ConfirmStaking/index';
import { tokenToUSDAmount } from 'utilities/V2/price';
// import { useBalance } from "store/balance/hooks";
// import { unitFormatter } from "utilities";

const DetailWrapper = style.div`
display: flex;
flex-direction: column;
`;

const Container = style.div`
display: flex;
align-items: baseline;
@media (max-width: 425px) {
  display: none;

}
`;
const MobileContainer = style.div`
display: none;

@media (max-width: 425px) {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 100%;
}
`;

interface FarmId {
  FARM_ID: string;
}

interface Booster {
  bpid: number;
  boosterPackAmount: number;
  boosterTokenIcon: string;
  boosterTokenName: string;
  boosterTokenTicker: string;
  address: string;
}

const InspectFarm = () => {
  const [stakeInputValue, setStakeInputValue] = React.useState(0);
  const [stakeInputValueInUSD, setStakeInputValueInUSD] = React.useState(0);
  const [IsBoosterAvailable] = React.useState(true);
  const [amount] = React.useState(0);
  const [availableStakingLimit] = React.useState(310000);
  const [price, setPrice] = React.useState(0);
  const [rewards, setRewards] = React.useState([]);
  const [balance] = React.useState(0);
  const [tvlInUSD, setTvlInUSD] = React.useState(0);
  const [maxStakingLimit, setMaxStakingLimit] = React.useState(0);
  const [farmData, setFarmData] = React.useState({
    farmId: 0,
    cohortAddress: '',
    farmTokenName: '',
    farmTokenIcon: '',
    cohortVersion: '',
    farmTokenAddress: '',
    APY: 0,
  });

  // useV2Farm
  const v2Farms = useV2Farms();

  const { FARM_ID } = useParams<FarmId>();

  // const allbalance = useBalance();
  // console.log(allbalance);
  // const tokenBalance = allbalance.tokens.filter((bal, i) => bal === farmDetails[0].token.farmToken);

  const boosters: Booster[] = [
    {
      bpid: 1,
      boosterPackAmount: 100,
      boosterTokenIcon:
        'https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/.github/assets/icons/ufarm.png',
      boosterTokenName: 'Unifarm Token',
      boosterTokenTicker: 'UFARM',
      address: '0xf7745D2e7FdE51c542568F718457d983F761e8C3',
    },
    {
      bpid: 10,
      boosterPackAmount: 150,
      boosterTokenIcon:
        'https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/.github/assets/icons/Polkabridge.png',
      boosterTokenName: 'PolkaBridge',
      boosterTokenTicker: 'PBR',
      address: '0xC10bbe7DC1701B3f17276CD2665DE8de9EC73aC5',
    },
  ];

  const [ModalOpen, setModalOpen] = React.useState(false);

  const stakeInputHandler = (e) => {
    if (e.target.value < 0) {
      console.log('stakeAmount can not be less than zero');
      setStakeInputValue(e.target.value);
    }

    if (e.target.value > availableStakingLimit) {
      console.log('user Max staking limit reached');
      setStakeInputValue(e.target.value);
    }

    setStakeInputValue(e.target.value);
    setStakeInputValueInUSD(tokenToUSDAmount(stakeInputValue, price));
  };

  const stakeModalHandler = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // useEffect(() => {
  //   for (var i = 0; i < allbalance.tokens.length; i++) {
  //     if (allbalance.tokens[i] == farmDetails[0].token.farmToken) {
  //       console.log(allbalance.balances[i])
  //       setBalance(unitFormatter(allbalance.balances[i], 18));
  //     }
  //   }
  // }, [allbalance]);

  // useEffect(() => {
  //   setStakeInputValueInUSD(tokenToUSDAmount(stakeInputValue, price));
  // }, [stakeInputValue, price]);

  useEffect(() => {
    const farmDetails = v2Farms.filter((farm) => farm.token.id == FARM_ID);
    setPrice(farmDetails[0].farmDetails.farmTokenPrice);
    setRewards(
      farmDetails[0].farmData.rewards.map((r) => {
        return {
          rewardTokenIcon: r.icon,
          rewardTokenName: r.name,
          rewardTokenTicker: r.symbol,
          rewardTokenAddress: r.address,
          expectedReward: 180,
        };
      })
    );
    setFarmData({
      farmId: farmDetails[0].token.fid,
      cohortAddress: farmDetails[0].cohort.id,
      farmTokenName: farmDetails[0].farmDetails.farmName,
      farmTokenIcon: farmDetails[0].farmDetails.farmIcon,
      cohortVersion: farmDetails[0].cohort.cohortVersion,
      farmTokenAddress: farmDetails[0].token.farmToken,
      APY: farmDetails[0].farmData.APY,
    });
    setTvlInUSD(farmDetails[0].farmData.usdTotalStaking);
    setMaxStakingLimit(farmDetails[0].token.userMaxStake);
  }, [FARM_ID, v2Farms]);

  return (
    <DetailWrapper>
      <FarmDetails
        intialStakedAmount={amount}
        farmIcon={farmData.farmTokenIcon}
        farmEnds={'23D 18H 43M'}
        cohortVersion={farmData.cohortVersion}
        cohortLockStatus={false}
        totalValueLockedInUsd={tvlInUSD}
        maxStakingLimit={maxStakingLimit}
        farmName={farmData.farmTokenName}
        APY={farmData.APY}
      />
      <Container>
        <div>
          <Stake
            farmTokenIcon={farmData.farmTokenIcon}
            farmTokenName={farmData.farmTokenName}
            userStakeLimitInUsd={availableStakingLimit}
            userFarmTokenBalanceInUsd={balance}            
            stakeInputValue={stakeInputValue}
            stakeInputHandler={stakeInputHandler}
            stakeModalHandler={stakeModalHandler}
          />
          {IsBoosterAvailable && <BoosterAd boostedAPY={195} />}
        </div>
        <ExpectedReward isClaimed={!IsBoosterAvailable} rewards={rewards} />
      </Container>
      <MobileContainer>
      <Stake
            farmTokenIcon={farmData.farmTokenIcon}
            farmTokenName={farmData.farmTokenName}
            userStakeLimitInUsd={availableStakingLimit}
            userFarmTokenBalanceInUsd={balance}            
            stakeInputValue={stakeInputValue}
            stakeInputHandler={stakeInputHandler}
            stakeModalHandler={stakeModalHandler}
          />
        <ExpectedReward isClaimed={false} rewards={rewards} />
        {IsBoosterAvailable && <BoosterAd boostedAPY={195} />}
      </MobileContainer>
      {ModalOpen ? (
        <ConfirmStaking
          farmData={farmData}
          closeModal={handleModalClose}
          referralAddress="0xA194E186267FdD49E2Ef9B01AD143768DC75E2c4"
          stakeAmount={stakeInputValue}
          stakeAmountInUSD={stakeInputValueInUSD}
          boosters={boosters}
        />
      ) : null}
    </DetailWrapper>
  );
};
export default InspectFarm;
