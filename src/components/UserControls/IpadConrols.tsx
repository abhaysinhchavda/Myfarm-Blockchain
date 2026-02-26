import { makeStyles } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";
import Select from "react-select";
import styled from "styled-components";
import FarmeActionTabs from "../Tabs/FarmActionTabs";
import StakeActionTabs from "../Tabs/StakeActionTabs";
import { useUserControlContext } from "../../contexts/UserControlContext";

const useStyles = makeStyles(() => ({
  Select: {
    marginRight: "2rem",
    "&>.css-1s2u09g-control": {
      borderRadius: 10,
      width: '180px',
     
    },
    "&>.css-1pahdxg-control":{
      width:'180px'
    }
  },
  textField: {
    "&>.css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
      borderRadius: "10px !important",
    },
  },
  ToggleButton: {
    "&>.css-ueukts-MuiButtonBase-root-MuiToggleButton-root": {
      border: "none",
    },
    "&>.css-ueukts-MuiButtonBase-root-MuiToggleButton-root.Mui-selected": {
      background: "transparent",
      color: "#6338bc",
    },
  },
  SwitchLabel: {
    marginLeft: "0px !important",
    marginRight: "1.5rem !important",

    "&>.MuiTypography-root": {
      fontSize: 12,
      fontWeight: 600,
    },
    "&>.MuiSwitch-root .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked":
      {
        color: "#9878CC",
      },
    "&>.MuiSwitch-root .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
      {
        backgroundColor: "#6338BC",
      },
  },
}));

const IpadUtilities1 = styled.div`
  display: "flex";
  flex-direction: "column";
  align-items: "center";
`;

const IpadUtilities2 = styled.div``;

const IpadUtilities3 = styled.div`
  display: flex;
  align-items: center;
`;

const TabsatTop = styled.div`
  margin-bottom: 1rem;
  margin-right: 6.5rem;
`;

const RestOfFields = styled.div`
  text-align: left;
  display: flex;
  width: "100%";
  margin-bottom: 1rem;
  align-items: center;
`;

const options = [
  { value: "cohort", label: "cohort" },
  { value: "token", label: "token" },
];

export default function IpadControls() {
  const classes = useStyles();

  const { action, onSearch, onSortingHandler } = useUserControlContext();

  return (
    <IpadUtilities2>
      <IpadUtilities1>
        <IpadUtilities3>
          <TabsatTop>
            {action === "STAKE" ? <FarmeActionTabs /> : <StakeActionTabs />}
          </TabsatTop>
          <RestOfFields>
            <Select
              onChange={(event) => onSortingHandler(event.value)}
              placeholder="Sort By"
              options={options}
              className={classes.Select}
            />

            <TextField
              style={{ width: 150 }}
              className={classes.textField}
              id="input-with-icon-textfield"
              placeholder="Search"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => onSearch(event.target.value)}
              variant="outlined"
            />
          </RestOfFields>
        </IpadUtilities3>
      </IpadUtilities1>
    </IpadUtilities2>
  );
}
