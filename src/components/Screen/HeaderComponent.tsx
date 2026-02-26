import { useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { Timer } from "../Views/Timer";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import Tvl from "./SharedComponents/Tvl";
import APYRange from "./SharedComponents/APYRange";
import Lockin from "./SharedComponents/Locking";
import { useScreenContext } from "../../contexts/ScreenContext";
import { useEndTime } from "../../hooks/useMiscellaneous";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  borderRadius: 10,
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-between",
  boxShadow:
    "0 0 0.5px rgba(6, 10, 13, 0.4), 0 8px 16px rgba(113, 121, 128, 0.08)",
  [theme.breakpoints.down("xs")]: {
    boxShadow: "none !important",
    padding: "0px !important",
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
      width: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  imageDiv: {
    width: 117,
    marginTop: "1rem",
  },
  headerToken: {
    padding: 0,
    border: "1px solid #DFDFDF",
    boxShadow: "none",
    [theme.breakpoints.down("xs")]: {
      boxShadow: "none !important",
      padding: "0px !important",
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
  },
  infoIcon: {
    fontSize: "15px",
    marginLeft: "0.5rem",
    color: "#C4C4C4",
  },
  webTokenText: {
    fontSize: 21,
    color: "black",
  },
}));

export default function HeaderComponent(): JSX.Element {
  const classes = useStyles();
  // const history = useHistory();
  const Theme = useTheme();

  const Mobile = useMediaQuery(Theme.breakpoints.down("xs"));

  const { farm } = useScreenContext();

  const { cohortDetails, totalStaking, farmDetails, apyRange, locking } = farm;

  const endTime = useEndTime(
    cohortDetails.stakeDuration,
    cohortDetails.poolStartTime
  );

  return Mobile ? (
    <Grid item xs={12}>
      <Item className={classes.headerToken}>
        <Tvl totalStaking={totalStaking} usdPrice={farmDetails.price} />
        <APYRange apyRange={apyRange} />
        <Lockin locking={locking} />
      </Item>
    </Grid>
  ) : (
    <Grid item xs={12}>
      <Item>
        <Tvl totalStaking={totalStaking} usdPrice={farmDetails.price} />
        <APYRange apyRange={apyRange} />
        <Lockin locking={locking} />
        <div className={classes.mainDiv}>
          <div className={classes.WebTokenName}>
            <span>Rewards End in</span>
            <Tippy
              theme="light"
              placement="top"
              content="Number of days for which the pool will continue to earn rewards"
            >
              <InfoIcon className={classes.infoIcon} />
            </Tippy>
          </div>
          <Timer endTime={endTime} Status={false} />
        </div>
      </Item>
    </Grid>
  );
}
