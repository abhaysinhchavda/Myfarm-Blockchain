import { makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import React from "react";

const UseStyles = makeStyles((theme: Theme) => ({
  tokenstobeWhitelisted: {
    display: "flex",
    marginTop: "25px",
    marginLeft: "18px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",

    color: " #616161",

    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      lineHeight: "12px",
    },
  },
  tokens: {
    display: "flex",
    marginLeft: "15px",
    marginTop: "5px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "24px",

    letterSpacing: "0.15px",

    color: "#212121",
  },
  tokenName: {
    marginLeft: "5px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
    color: "#212121",
    [theme.breakpoints.down("xs")]: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "24px",
      letterSpacing: "0.15px",
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
  imageName:{
    marginTop:"3px",
    [theme.breakpoints.down("xs")]: {
       marginTop:"3px"
    }
  }
}));

interface tokenstoBeWhitelistedProps {
  imageOfToken: any;
  tokenName: any;
}

const tokenstoBeWhitelisted = (props: tokenstoBeWhitelistedProps) => {
  const classes = UseStyles();
  return (
    <div>
      <div className={classes.tokenstobeWhitelisted}>
        Token to be Whitelisted
      </div>
      <div className={classes.tokens}>
        <img src={props.imageOfToken} width={15} height={15} className={classes.imageName} />
        <span className={classes.tokenName}>{props.tokenName}</span>
      </div>
    </div>
  );
};

export default tokenstoBeWhitelisted;
