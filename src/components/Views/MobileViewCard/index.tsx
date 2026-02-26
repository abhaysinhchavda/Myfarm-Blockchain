import React from "react";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Apy from "./Apy";
import HorizontalProgressBar from "./HorizontalProgressBar";
import TokenRewardWithSequence from "./TokenRewardWithSequence";
import ActionButton from "./ActionButton";
import PoolInformation from "./Poolnformation";
import { ListViewProps } from "../ListView";
import MyStake from "./MyStake";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 15,
    background: "#f8f4ff",
    boxShadow: "none",
    border: "1px solid #DFDFDF ",
  },
  imageDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },
  flexWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  progressBarWrapper: {
    marginBottom: "1rem",
  },
  tokenRewardsWrapper: {
    marginBottom: "1.5rem",
    marginTop: "1.5rem",
  },
}));

const MobileFarmCard = ({ action, farm }: ListViewProps) => {
  const classes = useStyles();

  const {
    __fid,
    APY,
    farmDetails,
    cohortDetails,
    farmEndTime,
    rewardSequence,
    poolFilled,
    apyRange,
  } = farm;

  return (
    <Grid item xs={12} sm={6}>
      <Paper className={classes.paper}>
        <div className={classes.flexWrapper}>
          <PoolInformation
            poolName={farmDetails.symbol}
            poolTokenIcon={farmDetails.icon}
            cohortVerison={cohortDetails.cohortVersion}
          />
          <Apy action={action} APY={APY} apyRange={apyRange} />
        </div>

        {action === "STAKE" && (
          <div className={classes.progressBarWrapper}>
            <HorizontalProgressBar poolFilled={poolFilled} />
          </div>
        )}

        <Divider variant="middle" />

        <div className={classes.tokenRewardsWrapper}>
          <TokenRewardWithSequence rewardsWithSequence={rewardSequence} />
        </div>

        <Divider variant="middle" />

        {action === "UNSTAKE" && (
          <div style={{ marginTop: "1.5rem" }}>
            <MyStake stakedAmount={200} />
          </div>
        )}

        <ActionButton action={action} searchKey={__fid} endTime={farmEndTime} />
      </Paper>
    </Grid>
  );
};
export default MobileFarmCard;
