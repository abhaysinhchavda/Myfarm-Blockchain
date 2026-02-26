import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { CircularPoolFilledProps } from "../ListView/CircularPoolFilled";
import { roundValue } from "../../../utilities";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  progressRoot: {
   "&>div div span":{
     position:'absolute',
     left:160
   }
  },
  MainDiv: {
    textAlign: "center",
    marginBottom: "0.8rem",
    marginTop: "0.8rem",
    fontWeight: 600,
    color: "#787878",
  },
}));
export default function CircularProgressBar({
  poolFilled,
}: CircularPoolFilledProps): JSX.Element {
  const classes=useStyles()
  return (
    <div>
    <div className={classes.MainDiv}>Pool Filled</div>
    <ProgressBar
      completed={roundValue(poolFilled, 2)}
      bgColor="#53D746"
      baseBgColor="white"
      labelColor="black"
      className={classes.progressRoot}
    />
    </div>
  );
}
