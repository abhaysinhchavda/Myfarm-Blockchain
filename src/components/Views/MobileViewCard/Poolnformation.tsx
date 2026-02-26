import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PoolInformationProps } from "../ListView/PoolInformation";

const useStyles = makeStyles(() => ({
  tokenMainDiv: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  tokenImageDiv: {
    display: "flex",
    alignItems: "center",
  },
  tokenImage: {
    marginRight: "0.5rem",
  },
  tokenName: {
    color: "black",
    fontWeight: 600,
    fontSize: "12px",
  },
  cohortVersion: {
    background: "#ff000047",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 2,
    
    
    fontWeight: 700,
    fontSize: 12,
  },
}));

export default function PoolInformation({
  poolName,
  poolTokenIcon,
  cohortVerison,
}: PoolInformationProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.tokenMainDiv}>
      <div className={classes.tokenImageDiv}>
        <div>
        <img src={poolTokenIcon} width={25} className={classes.tokenImage} />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
        <span className={classes.tokenName}>{poolName} Token</span>
        <span className={classes.cohortVersion}>{cohortVerison}</span>
      </div>
       
      </div>
     
    </div>
  );
}
