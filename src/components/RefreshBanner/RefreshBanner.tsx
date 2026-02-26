import React from "react";
import Warning from "../../assets/images/others/warning.png";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useRefresh } from "../../hooks/useRefresh";
import { useWeb3React } from "@web3-react/core";

const RefreshBanner = () => {
  const useStyles = makeStyles((theme: Theme) => ({
    refresh: {
      width: "433px",
      height: "32px",
      borderRadius: "10px",
      padding: "6px 16px 6px 16px",
      background: "rgba(255, 193, 7, 0.1)",
      position: "relative",
      left: "420px",
      [theme.breakpoints.down("xs")]: {
        left: "0px",
        top: "-40px",
        width: "303px",
        height: "56px",
      },
    },
    refreshText: {
      marginLeft: "5px",
      position: "relative",
      top: "-3px",
    },
    linker: {
      color: "#ED6C02",
      border: 0,
      cursor: "pointer",
    },
  }));

  const classes = useStyles();
  const { refreshButton, disableRefresh } = useRefresh();
  const { active } = useWeb3React();
  return (
    refreshButton &&
    active && (
      <div className={classes.refresh}>
        <img src={Warning} width={22} height={19} />
        <span className={classes.refreshText}>
          <button className={classes.linker} onClick={disableRefresh}>
            Click here to refresh page
          </button>{" "}
          for most update information
        </span>
      </div>
    )
  );
};

export default RefreshBanner;
