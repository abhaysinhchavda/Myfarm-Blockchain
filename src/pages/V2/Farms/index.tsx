import React from "react";
import Utility from "components/V2/Utility";
import ListView from "../../../components/V2/Views/ListViews";
import { useAppView } from "store/V2/dapp/hooks";
import Tabs from "../../../components/V2/Tabs/index";
import GridView from "../../../components/V2/Views/GridView";
import Grid from "@mui/material/Grid";
import { makeStyles, Theme, useMediaQuery, useTheme } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import trees from "../../../assets/V2/Images/trees.png";
import ApyCalculator from "../../../components/V2/APYCalculator";
import { ClipLoader } from 'react-spinners'
import { useV2Farms } from "../../../store/V2/farms/hooks";
import PageHeader from "components/PageHeader";
import { View } from "store/V2/dapp/reducer";
import { useSearch, useSort } from "hooks/useV2Utility";

const useStyles = makeStyles<Theme,{view: View}>((theme) => ({
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
  },
  noff: {
    position: "relative",
    top: "32%",
    right: "47%",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "22px",
    color: "#616161",
  },
  MainDiv: {
    display: props => props.view === View.GRID ? "flex" : null,
    flexFlow: props => props.view === View.GRID ? "wrap" : null,
    justifyContent: props => props.view === View.GRID ? "flex-start" : null,
    width: props => props.view === View.GRID ? "108%" : "100%",
    [theme.breakpoints.down("lg")]: {
      justifyContent: props => props.view === View.GRID ? "flex-start" : null,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  GridFlaxFlow:{
    display:'flex',
    flexFlow:'wrap',
    columnGap:10,
    overflow:'hidden'
  }
}));


const V2Farms = () => {

  const view = useAppView(); 
  const Theme = useTheme();
  const Mobile = useMediaQuery(Theme.breakpoints.down("xs"));
  
  const [searchValue, searchHandler] = useSearch();
  const sorting = useSort();
  
  // grab the farms from redux
  const farms = useV2Farms();

  const scrollToRef = (ref) => {
    window.scrollTo(0, ref.current.offsetTop);
  };
  
  const classes = useStyles({view});

  const myRef = React.useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  const [ApyCalculatorOpen, setOpen] = React.useState(false)

  // APY calculator
  const handleModalOpen = () => {
    setOpen(true)
  }

  function FarmWithCurrntView() {
     return(
       !farms && !farms?.length ? (
        <Grid container className={classes.muiGrid}>
          <Grid item xs={12}>
            <Paper className={classes.paperOn}>
              <img
                src={trees}
                width={406}
                height={160}
                className={classes.trees}
              />
              <div className={classes.noff}>No Farms Found</div>
            </Paper>
          </Grid>
        </Grid>
       ):(
        <div
          style={{
            width: "100%",
          }}
          ref={myRef}
          onScroll={executeScroll}
        > 
        <Utility 
          searchValue={searchValue}
          searchHandler={searchHandler}
          sortingProps={{...sorting,sortOptions:['Cohort','PoolFilled','APY','Rewards']}}
        />
        { 
        farms === null ? (
          <div style={{ marginTop: '6rem', display: 'flex', justifyContent: 'center', width: '75%', position: 'absolute' }}>
            <ClipLoader color="#6338BC" />
          </div>
         ):(
          
            view === View.LIST ? (
              farms.map((farmItems) => {
                return(
                 <ListView
                 key={farmItems.token.id}
                 id={farmItems.token.id}
                 page={0}
                 farmName={farmItems?.farmDetails?.farmName}
                 farmIcon={farmItems?.farmDetails?.farmIcon}
                 cohortVersion={farmItems.cohort.cohortVersion}
                 poolFilledPercentage={farmItems.farmData?.poolFilled.toString()}
                 rewardIcons={[farmItems.farmData?.rewards?.slice(0, 3), farmItems.farmData?.rewards?.slice(3, farmItems.farmData?.rewards?.length)]}
                 AggregatedApy={farmItems.farmData?.APY}
                 BoosterApy={farmItems.farmData?.boosterAPY}
                 userData={null}
                 isboosteravailable={true}
                 hotFarmsOrNot={false}
                 stakewithbooster={true}
                 handleClick={handleModalOpen}
               />
                ) 
              }) 
            ) : (
             <div className={classes.GridFlaxFlow}>
               {
                  farms.map((farmItems) => {
                    return <GridView
                    key={farmItems.token.id}
                    id={farmItems.token.id}
                    page={0}
                    farmName={farmItems?.farmDetails?.farmName}
                    farmIcon={farmItems?.farmDetails?.farmIcon}
                    cohortVersion={farmItems.cohort.cohortVersion}
                    poolFilledPercentage={farmItems.farmData?.poolFilled.toString()}
                    rewardIcons={[farmItems.farmData?.rewards?.slice(0, 3), farmItems.farmData?.rewards?.slice(3, farmItems.farmData?.rewards?.length)]}
                    AggregatedApy={farmItems.farmData?.APY}
                    BoosterApy={farmItems.farmData?.boosterAPY}
                    userData={null}
                    hotFarmsOrNot={true}
                    isboosteravailable={false}
                    stakewithbooster={false}
                    handleClick={handleModalOpen} />
                   }) 
               }
             </div>
            )
          
          
         )
        }
        </div>
       )
      
     ) 
     
  }
  
  return (
    <>
      <PageHeader
        title="Farms"
        content="Farm one token and earn multiple token as rewards with high APY and low risk"
        hasShowSwitch={true}
      />
      {Mobile ? null : <Tabs value1="ALL FARMS" value2="HOT FARMS" />}
      <FarmWithCurrntView />
      {ApyCalculatorOpen ? <ApyCalculator /> : null}
    </>
  );
};
export default V2Farms;