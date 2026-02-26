import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";

interface ProposalTextProps {
  proposalText: any;
}

const ProposalText = (props: ProposalTextProps) => {
  const useStyles = makeStyles(() =>
    createStyles({
      proposalText: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "143%",
        /* or 20px */

        letterSpacing: "0.15px",

        color: "#212121",
      },
    })
  );

  const classes = useStyles();

  return <div className={classes.proposalText}>{props.proposalText}</div>;
};

export default ProposalText;
