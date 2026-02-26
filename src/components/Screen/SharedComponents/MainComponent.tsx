import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@mui/material";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import InfoIcon from "@material-ui/icons/Info";
import React from "react";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    [theme.breakpoints.down("xs")]: {
      paddingRight: 10,
      paddingTop: "1rem",
      paddingBottom: "1rem",
      paddingLeft: "0.9rem",
      width: '100px',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // borderRight: "1px solid",
     
    },
  },
  mainDiv2: {
    
    [theme.breakpoints.down("xs")]: {
    
     
     
    },
  },
  mobileTokenName: {
    display: "flex",
    alignItems: "center",
  },
  mobileTokenText: {
    fontSize: 18,
    color: "black",
  },
  WebTokenName: {
    display: "flex",
    alignItems: "center",
    fontFamily:"Inter"
  },
  webTokenText: {
    fontSize: 21,
    color: "black",
    fontFamily:"Inter"
  },
  infoIcon: {
    fontSize: "15px",
    marginLeft: "0.5rem",
    color: "#C4C4C4",
  },
  titleText:{
    whiteSpace:"nowrap"
  }
}));

interface MainComponentProps {
  title: string;
  tippyContent: string;
  associatedValue: number | string;
}

export default function MainComponent({
  title,
  tippyContent,
  associatedValue,
}: MainComponentProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();

  const Mobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div className={classes.mainDiv2}>
      {Mobile ? (
        <div className={classes.mainDiv} >
          <div className={classes.mobileTokenName}>
            <span className={classes.titleText}>{title}</span>
            <Tippy theme="light" placement="top" content={tippyContent}>
              <InfoIcon className={classes.infoIcon} />
            </Tippy>
          </div>
          <span className={classes.mobileTokenText}>
            {!associatedValue ? <Skeleton /> : associatedValue}
          </span>
           
        </div>
      ) : (
        <div className={classes.mainDiv}>
          <div className={classes.WebTokenName}>
            <span>{title}</span>
            <Tippy theme="light" placement="top" content={tippyContent}>
              <InfoIcon className={classes.infoIcon} />
            </Tippy>
          </div>
          <span className={classes.webTokenText}>
            {associatedValue === null ? (
              <Skeleton style={{ width: 80 }} />
            ) : (
              associatedValue
            )}
          </span>
        </div>
      )}
    </div>
  );
}
