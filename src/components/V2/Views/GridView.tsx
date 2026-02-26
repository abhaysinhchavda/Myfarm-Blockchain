import React from 'react';
import PoolInformation from './shared/FarmInfo/index';
import { PoolFilledGrid } from './shared/PoolFilled/grid';
import { GridApyView } from './shared/APY/grid';
import StakeButton from './shared/Buttons/StakeButton';
import BoostButton from './shared/Buttons/BoostBootton';
import { RewardsGridView } from './shared/Rewards/grid';
import { StakedAmountGrid } from './shared/StakedAmount/grid';
import { StakedOnGrid } from './shared/StakedOn/grid';
import { useHistory } from 'react-router-dom';
import { Page } from './shared/types';
import Boost from '../../../assets/V2/Images/boost2.png';
import Calculator from '../../../assets/V2/Images/calc.png';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
display:flex;
column-gap:3px;

`;

const CardViewWraper = styled.div<{
  page: Page;
}>`
width:380px;
height: ${(props) => (props.page === 0 ? '381.98px' : '420px')};
border: 1px solid #E0E0E0;
box-sizing: border-box;
border-radius: 12px;
margin-top:30px;

padding:25px;
background:#fff;
@media (max-width: 425px) {
  width: 90%;
  margin-left:${(props) => (props.page === 1 ? '10px' : '15px')};
}
&:hover{
    transform:scale(1.0015);
   box-shadow: 0px 20px 40px rgba(0,0,0,0.4);
}

`;

interface Rewards {
  name: string;
  icon: string;
}

interface RemainingRewards {
  name: string;
  icon: string;
}

interface UserData {
  stakedAmount: number;
  stakedOn: Date;
}

interface V2Farm {
  id: string;
  page: Page;
  farmName: string;
  farmIcon: string;
  cohortVersion: string;
  poolFilledPercentage: string;
  rewardIcons: [Rewards[], RemainingRewards[]];
  AggregatedApy: number;
  BoosterApy: number;
  userData: UserData;
  hotFarmsOrNot: boolean;
  isboosteravailable: boolean;
  stakewithbooster: boolean;
  handleClick: () => void;
}

const GridView = ({
  id,
  page,
  farmName,
  farmIcon,
  cohortVersion,
  poolFilledPercentage,
  rewardIcons,
  AggregatedApy,
  BoosterApy,
  userData,
  hotFarmsOrNot,
  isboosteravailable,
  stakewithbooster,
  handleClick,
}: V2Farm) => {
  
  const history = useHistory();

  /* const memorizedBoostButtonContent = useMemo(() => {

  },[]) */
  
  return (
    <>
      <CardViewWraper page={page}>
        <PoolInformation
          farmIcon={farmIcon}
          farmName={farmName}
          cohortVersion={cohortVersion}
          hotFarmsOrNot={hotFarmsOrNot}
          view={1}
        />
        {page === 0 ? (
          <PoolFilledGrid poolFilledPercentage={poolFilledPercentage} />
        ) : (
          <StakedAmountGrid amount={userData.stakedAmount} />
        )}

        <RewardsGridView rewards={rewardIcons[0]} remainingRewards={rewardIcons[1]} />
        <GridApyView
          boosterApy={BoosterApy}
          Apy={AggregatedApy}
          hasBoosterAvailable={isboosteravailable}
          page={page}
          hasBoosterBuyed={stakewithbooster}
          openModal={handleClick}
        />

        {page === 0 ? null : <StakedOnGrid date={userData.stakedOn} />}
        <ButtonWrapper>
          <BoostButton
            boostIcon={page === Page.ALL_FARMS && !isboosteravailable ? Calculator : Boost}
            boostTitle={
              page === Page.ALL_FARMS && !isboosteravailable
                ? 'Apy Calculator'
                : page === Page.ALL_FARMS && isboosteravailable
                ? `Boost upto ${BoosterApy}%`
                : page === Page.MY_STAKES && !isboosteravailable
                ? ''
                : page === Page.MY_STAKES && isboosteravailable && stakewithbooster
                ? 'Boosted'
                : page === Page.MY_STAKES && isboosteravailable && !stakewithbooster
                ? `Boost upto ${BoosterApy}%`
                : ''
            }
            handleClick={handleClick}
            noButton={page === 1 && !isboosteravailable ? true : false}
          />
          {page === 0 ? (
            <StakeButton
              onClick={() => history.push(`/v2/InspectFarm/inspect/${id}`)}
              textOnButton="Stake"
            />
          ) : (
            <StakeButton
              onClick={() => history.push('/v2/InspectStake/inspect')}
              textOnButton="View Details"
            />
          )}
        </ButtonWrapper>
      </CardViewWraper>
    </>
  );
};

export default GridView;
