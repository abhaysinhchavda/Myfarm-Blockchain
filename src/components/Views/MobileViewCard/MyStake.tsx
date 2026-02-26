import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  MainDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  StakeTitle: {
    fontSize: 15,
    color: "black",
  },
  StakeValue: {
    fontSize: 15,
    color: "#6338BC",
    fontWeight: 600,
  },
}));

interface MyStakesProps {
  stakedAmount: number;
}
export default function MyStake({ stakedAmount }: MyStakesProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.MainDiv}>
      <span className={classes.StakeTitle}>My Stakes</span>
      <span className={classes.StakeValue}>{stakedAmount}</span>
    </div>
  );
}
