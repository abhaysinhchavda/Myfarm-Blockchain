import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  maxBalance: {
    color: "grey",
    textAlign: "right",
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "0.5rem",
    marginBottom: "-5px",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
    "&:hover":{
      cursor:'pointer'
    }
  },
}));

interface MaxStakingAvailableProps {
  availableValue: number;
  tokenSymbol: string;
  click:()=>void
}

export default function MaxStakingAvailable({
  availableValue,
  tokenSymbol,
  click,
}: MaxStakingAvailableProps): JSX.Element {
  const classes = useStyles();
  return (
    <span className={classes.maxBalance} onClick={click}>
      Max Staking Available: {availableValue} {tokenSymbol}
    </span>
  );
}
