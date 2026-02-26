import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Vesting from "../../pages/Claim/MyVesting/index";
import AirDrops from "../../pages/Claim/AirDrops/index";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ paddingTop: 45, paddingLeft: 0, paddingRight: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

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
  },
  myTab: {
    borderBottom: "1px solid #80808059",
    "&>.MuiTabs-scroller .MuiTab-textColorInherit.Mui-selected": {
      color: "#4D137B",
      fontWeight: 600,
    },
    "&>.MuiTabs-scroller .MuiTab-textColorInherit": {
      color: "#7B7B7B",
      fontWeight: 600,
    },
    "&>.MuiTabs-scroller .MuiTabs-indicator": {
      backgroundColor: "#4D137B",
      height: "1px",
    },
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
          <Tab label="Vesting" {...a11yProps(0)} />
          <Tab label="AirDrops" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Vesting />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AirDrops />
      </TabPanel>
    </div>
  );
}
