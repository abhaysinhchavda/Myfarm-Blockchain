import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { roundValue } from "../../../utilities";
const useStyles = makeStyles((theme) => ({
  stakeBalance: {
    color: "grey",
    cursor: "pointer",
    textAlign: "right",
    display: "flex",
    width: "100%",
    marginTop: "0.5rem",
    lineHeight: "36px",
    borderRadius: 10,
    border: "unset",
    alignItems: 'center',
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      textAlign: "left",
    },
  },
}));

interface BalanceProps {
  balanceInTokens: number;
  balanceInUsd: number;
  maxButtonHandler: () => void;
}

export default function Balance({
  balanceInTokens,
  balanceInUsd,
  maxButtonHandler,
}: BalanceProps): JSX.Element {
  const classes = useStyles();

  return (
    <button className={classes.stakeBalance} onClick={maxButtonHandler}>
      Balance : {balanceInTokens ? roundValue(balanceInTokens,2) : "--"}
      &nbsp;

      ($
      {balanceInUsd ? roundValue(balanceInUsd,2) : "--"}
      
      )

    </button>
  );
}
