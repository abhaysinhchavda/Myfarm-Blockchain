import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";

interface TotalVotesProps {
  votes: any;
  addresses: any;
}

const TotalVotes = (props: TotalVotesProps) => {
  const useStyles = makeStyles(() =>
    createStyles({
      votesAddresses: {
        textAlign: "left",
      },
      votes: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "143%",

        letterSpacing: "0.15px",

        color: "#212121",
      },
      addresses: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "143%",

        letterSpacing: "0.15px",

        color: "#616161",
      },
    })
  );

  const classes = useStyles();

  return (
    <div className={classes.votesAddresses}>
      <div className={classes.votes}>{props.votes}</div>
      <div className={classes.addresses}>{props.addresses}&nbsp;Addresses</div>
    </div>
  );
};

export default TotalVotes;
