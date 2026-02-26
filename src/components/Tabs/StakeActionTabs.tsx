import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useUserControlContext } from "../../contexts/UserControlContext";

const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    background: "#F8F4FF",
    height: 36,
    boxShadow: "none",
    borderRadius: "14px",
  },
  myTab: {
    "&>.MuiTabs-scroller .MuiTabs-flexContainer .MuiTab-textColorPrimary": {
      color: "#987AC9",
      fontWeight: 500,
      textTransform:'capitalize'
    },

    "&>.MuiTabs-scroller .MuiTabs-flexContainer .MuiTab-textColorPrimary.Mui-selected":
      {
        color: "#6338bc !important",
        background: "#E1D4F6",
        borderRadius: "14px",
        fontWeight: 600,
        textTransform:'capitalize !important'
      },
    "&>.MuiTabs-scroller .MuiTabs-flexContainer .MuiTab-root": {
      minHeight: 20,
      [theme.breakpoints.down("sm")]: {
        minWidth: 88,
      },
    },
  },
  Indicator: {
    display: "none",
  },
})
);

export default function StakeActionTabs() {
  const classes = useStyles();

  const { currentTabPosition, onTabChange } = useUserControlContext();

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={currentTabPosition}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, tabPosition) => onTabChange(tabPosition)}
        aria-label="disabled tabs example"
        className={classes.myTab}
        classes={{ indicator: classes.Indicator }}
      >
        <Tab label="Active" />
        <Tab label="Completed" />
      </Tabs>
    </Paper>
  );
}
