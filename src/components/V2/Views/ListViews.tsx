import { makeStyles } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
// import Token1 from "../../../assets/V2/Images/tk1.png";
import {StakedAmountList} from './shared/StakedAmount/list';
import {StakedOnList}  from './shared/StakedOn/list';

// import BTC from "../../../assets/V2/Images/Btc.png";
// import Eth from "../../../assets/V2/Images/Eth.png";
// import Poly from "../../../assets/V2/Images/poly.png";

// import Pay from "./SubComponent/Pay";
import NexButton from './shared/Buttons/Button';
// import Style from "styled-components";

// import { useListSwitch } from "../../../store/V2/Toggle/hook";
import { useHistory } from 'react-router-dom';
// import StakeButton from "./SubComponent/StakeButton";
// import BoostButton from "./SubComponent/BoostBootton";
// import TableView from './TableView'

import PoolInformation from './shared/FarmInfo/index';
import {PoolFilledList} from './shared/PoolFilled/list';
// import MyRewards from "../../../V2Pages/AllFarms/Components/V2/Views/ListViews/Rewards/index";
import {ListAPYView} from './shared/APY/list';
import {RewardListView} from './shared/Rewards/list';
import { Page } from './shared/types';
import { BoostButtonListView } from './shared/Buttons/BoostButtonListView';
// import ApyBoost from "./SubComponent/ApyBoost";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  borderRadius: 10,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 0 0.5px rgba(6, 10, 13, 0.4), 0 8px 16px rgba(113, 121, 128, 0.08)',
  ['@media (max-width: 425px)']: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  '&:hover': {
    transform: 'scale(1.01)',
    cursor: 'pointer',
  },
}));


const useStyles = makeStyles((theme) => ({
  mainDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '16%',
  },
  muiGrid: {
    '&>.MuiGrid-root .MuiPaper-root': {
      borderBottom: '1px solid #E0E0E0',
      boxShadow: 'none',
      background: 'transparent',
      borderRadius: 0,

      [theme.breakpoints.down('xs')]: {
        overflow: 'auto',
        width: 'auto',
      },
    },
    borderBottom: '1px solid #E0E0E0',
    overflow: 'hidden',
  },
  imageDiv: {
    width: 117,
    marginTop: '1rem',
  },
  divScroll: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      // overflow: "auto",
      // width: "400px",
      marginLeft: '2rem',
      alignItems: 'center',
    },
  },
  mobileDiv: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    marginTop: '0.4rem',
    [theme.breakpoints.down('xs')]: {
      overflow: 'auto',
      justifyContent: 'start',
      columnGap: '15px',
      marginLeft: '9px',
    },
  },
}));



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
  isboosteravailable: boolean;
  hotFarmsOrNot: boolean;
  stakewithbooster: boolean;
  handleClick: () => void;
}

const ListView = ({
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
  isboosteravailable,
  hotFarmsOrNot,
  stakewithbooster,
  handleClick,
}: V2Farm) => {
  const classes = useStyles();
  // const V2Switch = useListSwitch();
  const history = useHistory();

  
  return (
    <>
      <Grid container className={classes.muiGrid}>
        <Grid item xs={12}>
          <Item>
            <PoolInformation
              farmIcon={farmIcon}
              farmName={farmName}
              cohortVersion={cohortVersion}
              hotFarmsOrNot={hotFarmsOrNot}
              view={0}
            />

            <div className={classes.mobileDiv}>
              {page === 0 ? (
                <PoolFilledList poolFilledPercentage={poolFilledPercentage}  />
              ) : (
                <>
                  <StakedAmountList amount={userData.stakedAmount}  />

                  <StakedOnList date={userData.stakedOn}  />
                </>
              )}

              <RewardListView rewards={rewardIcons[0]} remainingRewards={rewardIcons[1]}  />

              <ListAPYView
                boosterApy={BoosterApy}
                Apy={AggregatedApy}
                hasBoosterAvailable={isboosteravailable}
                page={page}
                hasBoosterBuyed={stakewithbooster}
                openModal={handleClick}
              />

              <BoostButtonListView 
                boosterApy={BoosterApy}
                Apy={AggregatedApy}
                hasBoosterAvailable={isboosteravailable}
                page={page}
                hasBoosterBuyed={stakewithbooster}
                openModal={handleClick} 
                />

              {page === 0 ? (
                <NexButton
                  onClick={() => history.push(`/v2/InspectFarm/inspect/${id}`)}
                />
              ) : (
                <NexButton
                  onClick={() => history.push(`/v2/InspectStake/inspect/${id}`)}
                />
              )}
            </div>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};
export default ListView;
