import { makeStyles } from "@material-ui/core";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";



import { Views } from "../../../../store/user/reducer";
import { useSwitchView, useAppView } from 'store/V2/dapp/hooks';
import { View } from "store/V2/dapp/reducer";


const useStyles = makeStyles(() => ({
    ToggleButton: {
      "&>.css-ueukts-MuiButtonBase-root-MuiToggleButton-root": {
        border: "1px solid",
        borderRadius: 20,
      },
      "&>.css-ueukts-MuiButtonBase-root-MuiToggleButton-root.Mui-selected": {
        background: "#6338bc",
        color: "white",
        height: "42px",
        marginTop: "-1px"
      },
      "&>.css-ueukts-MuiButtonBase-root-MuiToggleButton-root.Mui-selected:hover": {
        background: "#6338bc",
      }
    },
    SwitchLabel: {
      "&>.MuiTypography-root": {
        fontSize: 12,
        fontWeight: 600,
      },
      "&>.MuiSwitch-root .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked":
      {
        color: "#9878CC",
        backgroundColor: '#9878CC'
      },
      "&>.MuiSwitch-root .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
      {
        backgroundColor: "#6338BC",
      },
    },
  }));

const SwitchView=()=> {
    const classes = useStyles();
    
    const changeView = useSwitchView()
    const view = useAppView()

    return (
        <ToggleButtonGroup
            value={view}
            exclusive
            aria-label="text alignment"
            style={{ height: 40 }}
            className={classes.ToggleButton}
        >
            <ToggleButton value={Views.LIST} aria-label="left aligned" onClick={() => changeView(View.LIST)}>
                <ViewListIcon />
            </ToggleButton>
            <ToggleButton value={Views.GRID} aria-label="centered" onClick={() => changeView(View.GRID)}>
                <GridViewIcon />
            </ToggleButton>
        </ToggleButtonGroup>

    );
}
export default SwitchView
