import React from "react";
import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PoolInformation from "./PoolInformation";
import HorizontalPoolFilled from "./HorizontalPoolFilled";
import Timer from "./Timer";
import TokenRewardWithSequence from "./TokenRewardWithSequence";
import TotalValueLocked from "./TotalValueLocked";
import ActionCard from "./ActionButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import _ from "loadsh";
import { Farm } from "../../../store/farms/reducer";
import MyStake from "./MyStake";



interface GridViewProps {
  action: "STAKE" | "UNSTAKE";
  farm: Farm;
  stakedAmount?: number;
}

export default function GridView({ action, farm, stakedAmount}: GridViewProps): JSX.Element {
  const {
    __fid,
    APY,
    farmDetails,
    cohortDetails,
    farmEndTime,
    rewardSequence,
    totalStaking,
    poolFilled,
    apyRange,
  } = farm;



  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        justifyContent: "center",
      },
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "center",
      },
    },
    paper: {
      padding: theme.spacing(0.5),
      textAlign: "center",
      color: theme.palette.text.secondary,
      width: "330px !important",
      height: "100% !important",
      minHeight: "330px",
      maxHeight: "410px",
      position: "relative",
      left: "-50px",
      top: "30px",
      marginLeft: "3.2rem",
      borderRadius: "10px",
      border: "1px solid #E1E1E1",
      overflow: "hidden",
      marginBottom: action === "STAKE"? "20px":"60px",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        marginTop: "0rem !important",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    Divider: {
      position: "absolute",
      width: "361px",
      top: "97px",
      border: "1px solid #DADADA",
      left: "0px",
      marginTop: "-0.5rem",
      marginBottom: "0.8rem",
    },
  })
);

  const classes = useStyles();

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} className={classes.root}>
      <Paper className={classes.paper}>
        <PoolInformation
          poolName={farmDetails.name}
          poolTokenIcon={farmDetails.icon}
          cohortVerison={cohortDetails.cohortVersion}
          action={action}
          APY={APY}
          apyRange={apyRange}
        />

        <Divider className={classes.Divider} />

        <Timer endTime={_.multiply(farmEndTime, 1000)} />

        <TokenRewardWithSequence rewardsWithSequence={rewardSequence} />

        <TotalValueLocked
          totalStaking={totalStaking}
          usdPrice={farmDetails.price}
        />

        {action === "STAKE" ? null : <MyStake mystake={stakedAmount} />}

        {action === "STAKE" && <HorizontalPoolFilled poolFilled={poolFilled} />}

        <ActionCard action={action} searchKey={__fid} endTime={farmEndTime} />
      </Paper>
    </Grid>
  );
}
