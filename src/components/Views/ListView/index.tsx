import React from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import Stake from "./Stake";
import CircularPoolFilledtsx from "./CircularPoolFilled";
import { Timer } from "../Timer";
import { styled } from "@mui/material/styles";
import PoolInformation from "./PoolInformation";
import HotPoolIcon from "../../SVG/HotPoolIcon";
import Apy from "./Apy";
import TotalValueLocked from "./TotalValueLocked";
import TokenRewardWithSequence from "./TokenRewardWithSequence";
import ActionButton from "./ActionButton";
import _ from "loadsh";
import { Farm } from "../../../store/farms/reducer";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  borderRadius: 10,
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-between",
  boxShadow:
    "0 0 0.5px rgba(6, 10, 13, 0.4), 0 8px 16px rgba(113, 121, 128, 0.08)",
}));

const useStyles = makeStyles(() => ({
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "16%",
  },
  muiGrid: {
    marginTop: "1rem !important",
  },
  imageDiv: {
    width: 117,
    marginTop: "1rem",
  },
}));

export interface ListViewProps {
  action: "STAKE" | "UNSTAKE";
  farm: Farm;
  stakedAmount?: number;
}

export default function ListView({
  action,
  farm,
  stakedAmount,
}: ListViewProps): JSX.Element {
  const {
    __fid,
    APY,
    farmDetails,
    cohortDetails,
    farmEndTime,
    rewardSequence,
    totalStaking,
    poolFilled,
    isHotpool,
    apyRange,
  } = farm;

  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.muiGrid}>
      <Grid item xs={12}>
        <Item>
          {isHotpool && <HotPoolIcon />}
          <PoolInformation
            poolName={farmDetails.name}
            poolTokenIcon={farmDetails.icon}
            cohortVerison={cohortDetails.cohortVersion}
          />

          <Apy action={action} APY={APY} apyRange={apyRange} />

          <TotalValueLocked
            totalStaking={totalStaking}
            usdPrice={farmDetails.price}
          />

          {action === "STAKE" ? (
            <CircularPoolFilledtsx poolFilled={poolFilled} />
          ) : (
            <Stake title="MyStake" stakedAmount={stakedAmount} />
          )}

          <div className={classes.mainDiv}>
            <>
              {action === "STAKE" ? (
                <Timer endTime={_.multiply(farmEndTime, 1000)} Status={false} />
              ) : (
                <Timer endTime={_.multiply(farmEndTime, 1000)} Status={true} />
              )}
            </>
            <TokenRewardWithSequence rewardsWithSequence={rewardSequence} />
          </div>

          <ActionButton
            action={action}
            searchKey={__fid}
            endTime={farmEndTime}
          />
        </Item>
      </Grid>
    </Grid>
  );
}
