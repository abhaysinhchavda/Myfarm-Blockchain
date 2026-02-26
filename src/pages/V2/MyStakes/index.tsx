import React from "react";
import { useAppView } from "store/V2/dapp/hooks";
import Tabs from "../../../components/V2/Tabs/index";
//import V2UserControl from "../../../components/V2/UserControles";
// import MyStakes from "../../../components/V2/Views/MyStakes";
import GridView from "../../../components/V2/Views/GridView";
import Token1 from "../../../assets/V2/Images/tk1.png";
import BTC from "../../../assets/V2/Images/Btc.png";
import Eth from "../../../assets/V2/Images/Eth.png";
import Poly from "../../../assets/V2/Images/poly.png";
import ListView from "../../../components/V2/Views/ListViews";
import Grid from "@mui/material/Grid";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import trees from "../../../assets/V2/Images/trees.png";
import Style from "styled-components";
import ApyCalculator from "../../../components/V2/APYCalculator";
import PageHeader from "components/PageHeader";
// import StakeCard from './StakeCard'
import Utility from "components/V2/Utility";
import { useSearch, useSort } from "hooks/useV2Utility";


const MyButton = Style.button`
position:relative;
justify-content: center;
align-items: center;
padding: 0px;
width: 272px;
height: 50px;
left: -42%;
top: 45%;
background: #673AB7;
/* primary brand/main */

border: 1px solid #673AB7;
box-sizing: border-box;
border-radius: 10px;

box-shadow: 0px 7px 18px -2px rgba(103, 58, 183, 0.56);

/* Inside auto layout */
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 15px;
line-height: 26px;
color: #FFFFFF;
text-transform:capitalize;
flex: none;
order: 1;
flex-grow: 1;


&:hover {
    background-color: #6338BC;
    color:white;
    cursor:pointer;
  }
`;



const V2Farms = () => {
  const GetValue = 0;

  const handleModalOpen = () => {
    return <ApyCalculator />
  }

  const isAllFarmsEmpty = false;
  const Theme = useTheme()
  const Mobile = useMediaQuery(Theme.breakpoints.down('xs'))
  const ListSwitch = useAppView();
  const [searchValue, searchHandler] = useSearch();
  const sorting = useSort();
  const useStyles = makeStyles((theme) => ({
    muiGrid: {
      "&>.MuiGrid-root .MuiPaper-root": {
        boxShadow: "none",
        background: "transparent",
        borderRadius: 0,
      },
    },
    paperOn: {
      ...theme.typography.body2,
      border: "1px solid #E0E0E0",
      marginTop: "10px",
      height: "396px",
      padding: theme.spacing(4),
      borderRadius: 10,
      textAlign: "center",
      color: theme.palette.text.secondary,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow:
        "0 0 0.5px rgba(6, 10, 13, 0.4), 0 8px 16px rgba(113, 121, 128, 0.08)",
    },
    trees: {
      marginLeft: "340px",
      marginTop: "-40px"
    },
    noff: {
      position: "relative",
      top: "28%",
      right: "23%",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: "22px",
      color: "#616161",
      whiteSpace: "nowrap"
    },
    MainDiv: {
      display: ListSwitch == 1 ? "flex" : null,
      flexFlow: ListSwitch == 1 ? "wrap" : null,
      justifyContent:
        ListSwitch == 1 ? "flex-start" : null,
      width: ListSwitch == 1 ? "108%" : "100%",
      [theme.breakpoints.down("lg")]: {
        justifyContent: ListSwitch == 1 ? "flex-start" : null,
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    }
  }));

  const classes = useStyles();
  const Rewards = [
    {
      name: "BTC",
      icon: BTC,
    },
    {
      name: "Eth",
      icon: Eth,
    },
    {
      name: "Poly",
      icon: Poly,
    },
  ];

  const RemainingRewards = [
    {
      name: "Eth",
      icon: Eth,
    },
    {
      name: "Poly",
      icon: Poly,
    },
  ];

  const UserData = {
    stakedAmount: 26.9666,
    stakedOn: new Date("October 13, 2013 11:13:00"),
  };

  return (
    <>
      <PageHeader
        title="My Stakes"
        content="Stake one token and earn multiple token as rewards with high APY and low risk"
        hasShowSwitch={true}
      />
      {
        Mobile ? null : <Tabs value1="ACTIVE" value2="FINISHED" />
      }
      {isAllFarmsEmpty ? (
        <Grid container className={classes.muiGrid}>
          <Grid item xs={12}>
            <Paper className={classes.paperOn}>
              <img
                src={trees}
                width={406}
                height={160}
                className={classes.trees}
              />
              <div className={classes.noff}>No Stakes Found</div>
              <MyButton> Stake Now </MyButton>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <div>
          <Utility 
          searchValue={searchValue}
          searchHandler={searchHandler}
          sortingProps={{...sorting,sortOptions:['Cohort','PoolFilled','APY','Rewards']}}
        />
          {GetValue === 0 ?
            ListSwitch === 0 ? (
              <div
                style={{
                  display: null,
                  flexFlow: null,
                  justifyContent: null,
                  width: "100%",
                }}
              >
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={false}
                  hotFarmsOrNot={true}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={false}
                  hotFarmsOrNot={true}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={false}
                  hotFarmsOrNot={false}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={false}
                  hotFarmsOrNot={false}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={true}
                  hotFarmsOrNot={false}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={true}
                  hotFarmsOrNot={false}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={true}
                  hotFarmsOrNot={true}
                  stakewithbooster={true}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={true}
                  hotFarmsOrNot={false}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={false}
                  hotFarmsOrNot={false}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={false}
                  hotFarmsOrNot={false}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={false}
                  hotFarmsOrNot={false}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={false}
                  hotFarmsOrNot={false}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={true}
                  hotFarmsOrNot={false}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={true}
                  hotFarmsOrNot={false}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={true}
                  hotFarmsOrNot={true}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <ListView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  isboosteravailable={true}
                  hotFarmsOrNot={false}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
              </div>
            ) : (
              <div

                className={classes.MainDiv}
              >
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={true}
                  isboosteravailable={false}
                  stakewithbooster={true}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={true}
                  isboosteravailable={false}
                  stakewithbooster={true}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={true}
                  isboosteravailable={false}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={false}
                  isboosteravailable={true}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={false}
                  isboosteravailable={true}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={false}
                  isboosteravailable={false}
                  stakewithbooster={true}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={false}
                  isboosteravailable={true}
                  stakewithbooster={true}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={true}
                  isboosteravailable={false}
                  stakewithbooster={true}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={false}
                  isboosteravailable={true}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={false}
                  isboosteravailable={true}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={false}
                  isboosteravailable={false}
                  stakewithbooster={true}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={false}
                  isboosteravailable={false}
                  stakewithbooster={true}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={false}
                  isboosteravailable={true}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={false}
                  isboosteravailable={true}
                  stakewithbooster={true}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={false}
                  isboosteravailable={true}
                  stakewithbooster={false}
                  handleClick={handleModalOpen}
                />
                <GridView
                  id=''
                  page={1}
                  farmName="USDT"
                  farmIcon={Token1}
                  cohortVersion="29"
                  poolFilledPercentage="11.5"
                  rewardIcons={[Rewards, RemainingRewards]}
                  AggregatedApy={20.8}
                  BoosterApy={156}
                  userData={UserData}
                  hotFarmsOrNot={false}
                  isboosteravailable={false}
                  stakewithbooster={true}
                  handleClick={handleModalOpen}
                />
              </div>
            ) : null}
        </div>
      )}


    </>
  );
};
export default V2Farms;