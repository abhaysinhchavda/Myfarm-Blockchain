import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { CircularPoolFilledProps } from "../ListView/CircularPoolFilled";
import { roundValue } from "../../../utilities";

const BorderLinearProgress = withStyles(() => ({
  root: {
    height: "25px",
    width: "290px",
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#CFCFCF",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#53D746",
  },
}))(LinearProgress);

const useStyles = makeStyles(() =>
  createStyles({
    progressLabel: {
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 1,
      left: "120px",
      maxHeight: "75px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      "& span": {
        width: "100%",
      },
      color: "#000000",
    },
  })
);

const RelativePostionWrapper = styled.div`
  position: relative;
  top: 30px;
  left: 18px;
`;

export default function CircularPoolFilled({
  poolFilled,
}: CircularPoolFilledProps): JSX.Element {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container>
        <Grid item>
          <RelativePostionWrapper>
            <div className={classes.progressLabel}>Pool Filled</div>
            <BorderLinearProgress
              variant="determinate"
              value= {poolFilled >= 100 ? 100 :  roundValue(poolFilled, 2)}
            />
          </RelativePostionWrapper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
