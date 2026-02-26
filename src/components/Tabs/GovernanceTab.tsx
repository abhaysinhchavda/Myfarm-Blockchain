import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  Claim: {
    boxShadow: "none",
    backgroundColor: "transparent",
    marginTop: "3rem",
  },
  myTab: {
    borderBottom: "1px solid #80808059",
    "&>.MuiTabs-scroller .MuiTab-textColorInherit.Mui-selected": {
      color: "#6338BC",
      fontWeight: 600,
      fontFamily: "Inter",
      fontStyle:"normal",
      lineHeight: "24px",
      textTransform: "capitalize",
    },
    "&>.MuiTabs-scroller .MuiTab-textColorInherit": {
      color: "#777777",
      fontWeight: 600,
      fontFamily: "Inter",
      fontStyle:"normal",
      lineHeight: "24px",
      textTransform: "capitalize",
    },
    "&>.MuiTabs-scroller .MuiTabs-indicator": {
      backgroundColor: "#4D137B",
      height: "1px",
    },
  },
}));

interface TabsProps {
  parentCallback: any;
}

export default function SimpleTabs(props: TabsProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    props.parentCallback(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.Claim}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          className={classes.myTab}
        >
          <Tab label="All Proposals" {...a11yProps(0)} />
          <Tab label="Created by Me" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
    </div>
  );
}
