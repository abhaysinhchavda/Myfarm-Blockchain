import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core";
import Box from '@mui/material/Box';
import Fire from "../../../assets/V2/Images/fire.png";
function TabPanel(props) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};



const useStyles = makeStyles(() => ({
  root: {
    "&>.MuiTabs-scroller .MuiTabs-flexContainer .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
      width: "245px !important",
      color: 'rgb(103, 58, 183) !important',
      fontWeight: 600,
      fontFamily: 'inter'

    },
    "&>.MuiTabs-scroller .MuiTabs-flexContainer .css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
      width: "245px !important",
      fontWeight: 600,
      color: '#616161',
      fontFamily: 'inter'

    },
    "&>.MuiTabs-scroller .css-1aquho2-MuiTabs-indicator": {
      backgroundColor: 'rgb(103, 58, 183) !important'
    }
  }
}));

interface BasicTabsInt {
  value1: string;
  value2: string;
}




export default function BasicTabs({ value1, value2 }: BasicTabsInt) {
  const [value, setValue] = React.useState(0);
  const classes = useStyles()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const SwitchTab = React.useCallback(() => {
    if (window.location.pathname === "/V2/farms") {
      //setTab("ALL FARMS")
    }
    if (window.location.pathname === "/v2/stakes") {
      //setTab("ACTIVE")
    }
  }, [/* setTab */])
  React.useEffect(() => {
    SwitchTab()
  }, [SwitchTab])

  return (
    <Box sx={{ width: '100%', marginTop: '1rem', marginBottom: '2rem' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className={classes.root}>
          <Tab label={value1} onClick={() => null} />
          {value2 === "HOT FARMS" ? <Tab label={<div><span style={{ position: "relative", left: "-7px", top: "3px" }}><img src={Fire} /> </span>HOT FARMS </div>} onClick={() => null} /> : <Tab label={value2} onClick={() => null} />}
        </Tabs>
      </Box>
    </Box>
  );
}
