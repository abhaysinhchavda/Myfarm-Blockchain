import React from "react";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { Timer } from "../../../components/Views/Timer";
import { roundValue } from "../../../utilities";
//import { useCountDown } from "../../../hooks/useMiscellaneous";
// import { useHistory } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

import MySkeleton from "../../../components/skeleton";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  borderRadius: 10,
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-between",
  boxShadow: "0 0 0.5px rgba(6, 10, 13, 0.4), 0 8px 16px rgba(113, 121, 128, 0.08)",
  [theme.breakpoints.down("xs")]: {
    boxShadow: "none !important",
  },
}));

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
    },
  },
  imageDiv: {
    width: 117,
    marginTop: "1rem",
  },
}));

interface IsHeader {
  tvl: number;
  range: any;
  lockIn: any;
  endTime: number;
}

const Header = ({ tvl, range, lockIn, endTime }: IsHeader) => {
  const classes = useStyles();
  // const history = useHistory();
  const Theme = useTheme();
  const isLoading = true;
  const Mobile = useMediaQuery(Theme.breakpoints.down("xs"));

  return Mobile ? (
    <Grid item xs={12}>
      <Item style={{ padding: 0, border: "1px solid", boxShadow: "none" }}>
        <div className={classes.mainDiv} style={{ borderRight: "1px solid" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>TVL </span>
          </div>
          <span style={{ fontSize: 20, color: "black" }}>
            {!tvl ? <Skeleton /> : `$${roundValue(tvl, 3)}`}
          </span>
        </div>
        <div className={classes.mainDiv} style={{ borderRight: "1px solid" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>APY Range</span>
          </div>
          <span style={{ fontSize: 18, color: "black" }}>{range}</span>
        </div>
        <div className={classes.mainDiv}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {" "}
            <span>Lock In</span>
          </div>
          <span style={{ fontSize: 18, color: "black" }}>{lockIn}</span>
        </div>
      </Item>
    </Grid>
  ) : (
    <>
      {isLoading ? (
        <Grid item xs={12}>
          <Item>
            <div className={classes.mainDiv}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>TVL </span>
                <Tippy theme="light" placement="top" content="TVL">
                  <InfoIcon
                    style={{
                      fontSize: "15px",
                      marginLeft: "0.5rem",
                      color: "#C4C4C4",
                    }}
                  />
                </Tippy>
              </div>
              <span style={{ fontSize: 20, color: "black" }}>
                {tvl === null ? <Skeleton /> : `$${roundValue(tvl, 3)}`}
              </span>
            </div>
            <div className={classes.mainDiv}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {" "}
                <span>APY Range</span>
                <Tippy theme="light" placement="top" content="APY">
                  <InfoIcon
                    style={{
                      fontSize: "15px",
                      marginLeft: "0.5rem",
                      color: "#C4C4C4",
                    }}
                  />
                </Tippy>
              </div>
              <span style={{ fontSize: 18, color: "black" }}>{range}</span>
            </div>
            <div className={classes.mainDiv}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {" "}
                <span>Lock In</span>
                <Tippy theme="light" placement="top" content="Lock In">
                  <InfoIcon
                    style={{
                      fontSize: "15px",
                      marginLeft: "0.5rem",
                      color: "#C4C4C4",
                    }}
                  />
                </Tippy>
              </div>
              <span style={{ fontSize: 18, color: "black" }}>{lockIn}</span>
            </div>
            <div className={classes.mainDiv}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>Rewards End in</span>
                <Tippy theme="light" placement="top" content="Rewards end in">
                  <InfoIcon
                    style={{
                      fontSize: "15px",
                      marginLeft: "0.5rem",
                      color: "#C4C4C4",
                    }}
                  />
                </Tippy>
              </div>
              <Timer endTime={endTime}  Status={false}/>
              {/* <span style={{ fontSize: 18 }}>
                       {endTime}</span> */}
            </div>
          </Item>
        </Grid>
      ) : (
        <MySkeleton width="100%" height={150} top="1rem" left="" />
      )}
    </>
  );
};
export default Header;
