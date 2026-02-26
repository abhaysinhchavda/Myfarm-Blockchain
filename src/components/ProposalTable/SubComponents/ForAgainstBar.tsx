import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";

interface ForAgainstBarProps {
  proposalFor: any;
  proposalAgainst: any;
  status: any;
  startsIn: any;
}

const BorderLinearProgress = withStyles(() => ({
  root: {
    height: "5px",
    width: "188px",
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: " #C62828",
  },
  bar: {
    borderRadius: 0,
    backgroundColor: "#53D746",
  },
}))(LinearProgress);

const BorderLinearProgress2 = withStyles(() => ({
  root: {
    height: "5px",
    width: "188px",
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#616161",
  },
  bar: {
    borderRadius: 0,
    backgroundColor: "#616161",
  },
}))(LinearProgress);

const ForAgainstBar = (props: ForAgainstBarProps) => {
  const useStyles = makeStyles(() =>
    createStyles({
      for: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "143%",

        letterSpacing: "0.15px",

        marginRight: "56px",
        color: "#00C853",
      },
      against: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "143%",

        letterSpacing: "0.15px",
        color: "#C62828",
      },

      firstNa: {
        marginRight: "145px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "143%",

        letterSpacing: "0.15px",
        color: "#616161",
      },

      Na: {
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
    <div>
      {props.status === "Scheduled" ? (
        props.startsIn
      ) : props.status === "Cancelled" ? (
        <div>
          {" "}
          <span className={classes.firstNa}>Na </span>
          <span className={classes.Na}> Na </span>{" "}
          <BorderLinearProgress2 variant="determinate" value={100} />{" "}
        </div>
      ) : (
        <div>
          <span className={classes.for}>For {props.proposalFor}%</span>
          <span className={classes.against}>
            Against {props.proposalAgainst}%
          </span>
          <BorderLinearProgress
            variant="determinate"
            value={props.proposalFor}
          />
        </div>
      )}
    </div>
  );
};

export default ForAgainstBar;
