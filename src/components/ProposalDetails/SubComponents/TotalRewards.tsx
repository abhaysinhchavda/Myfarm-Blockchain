import { makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  rewards: {
    position: "relative",
    marginLeft: "-28px",
    marginTop: "-7%",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#616161",
    [theme.breakpoints.down("md")]: {
      marginTop: "-45px",
      marginLeft: "85px",
    },
    [theme.breakpoints.down("xs")]: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "12px",
      lineHeight: "12px",
      marginLeft: "240px",
      whiteSpace:"nowrap",
      color: "#616161",
      top: "2px",
    },
  },
  rewardToken: {
    position: "relative",
    marginLeft: "-95px",
    marginTop: "5px",
    [theme.breakpoints.down("md")]: {
      marginTop: "5px",
      marginLeft: "15px",
    },
  },
  rewardName: {
    position: "relative",
    marginTop: "-23px",
    marginLeft: "65px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",

    alignItems: "center",
    letterSpacing: "0.15px",

    color: "#212121",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "73px",
    },
    [theme.breakpoints.down("xs")]: {
      top: "3px",
      left: "85px",
    },
  },
  imageToken: {
    top:"2px",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      left: "86px",
      top: "5px",
    },
  },
}));

interface TotalRewardsProps {
  image: any;
  rewards: any;
}

const TotalRewards = (props: TotalRewardsProps) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.rewards}>Total Rewards</div>
      <div className={classes.rewardToken}>
        <img
          src={props.image}
          width={15}
          height={15}
          className={classes.imageToken}
        />
        <div className={classes.rewardName}>{props.rewards}</div>
      </div>
    </div>
  );
};

export default TotalRewards;
