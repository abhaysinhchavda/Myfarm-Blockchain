import React from "react";
import { ClipLoader } from "react-spinners";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  secondSpan: {
    marginLeft: "1.5rem",
    display: "flex",
    alignItems: "center",
    marginTop:"-0.3rem"
  },

  stakedBalance: {
    width: "100%",
    textAlign: "left",
    height: 40,
    paddingLeft: 0,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      border: "1px solid #DFDFDF",
      marginLeft: "0rem",
      marginBottom: "1.5rem",
      height: 50,
      paddingRight: 0,
      paddingLeft:8
    },
  },
}));
interface StakedBalanceProps {
  stakedInToken: number;
  stakedInUsd: number;
}

export default function StakedBalance({
  stakedInToken,
  stakedInUsd,
}: StakedBalanceProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.stakedBalance}>
      <span>Staked Balance</span>
      <span className={classes.secondSpan}>
        <b style={{ fontSize: 20, color: "black" ,display:'flex'}}>
          {!(stakedInToken >= 0) ? <ClipLoader size={20} /> : stakedInToken}{" "}
        </b>
        &nbsp;
        <b style={{display:'flex', marginTop:"5px", fontSize:"10px"}}>
         
          {!(stakedInUsd >= 0) ? null :<b >(${stakedInUsd})</b> }
        </b>
      </span>
    </div>
  );
}
