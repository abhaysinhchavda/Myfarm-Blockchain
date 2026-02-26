import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Gas from "./Sub-Compoent/Gas";
import MySetting from "./Sub-Compoent/Setting";
import MySwitch from "./Sub-Compoent/Switch";
// import style from 'styled-components'

const useStyles = makeStyles(() => ({
  HeaderDiv: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    "&>h3": {
      fontSize: 20,
    },
  },
  HeaderIcon: {
    display: "flex",
    alignItems: "center",
  },
  
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.HeaderDiv}>
      <h3>Swap</h3>
      <div className={classes.HeaderIcon}>
        <Gas />
        <MySwitch />
        <MySetting />
      </div>
    </div>
  );
};
export default Header;
