import { makeStyles } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";
import Select from "react-select";
import FarmActionTabs from "../Tabs/FarmActionTabs";
import StakeActionTabs from "../Tabs/StakeActionTabs";
import styled from "styled-components";
import { useUserControlContext } from "../../contexts/UserControlContext";

const options = [
  { value: "cohort", label: "cohort" },
  { value: "token", label: "token" },
];

const useStyles = makeStyles(() => ({
  Select: {
    marginRight: "1rem",
    "&>.css-1s2u09g-control": {
      borderRadius: 10,
      width: 150,
    },
    "&>.css-1pahdxg-control":{
      width:'150px'
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
    marginRight: "0px !important",

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

const OuterWrapper = styled.div``;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerWrapper2 = styled.div`
  margin-bottom: 1rem;
`;

const InnerWrapper3 = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;
  width: "100%";
  margin-bottom: 1rem;
`;

export default function MobileControls() {
  const classes = useStyles();

  const { action, onSearch, onSortingHandler } = useUserControlContext();

  return (
    <OuterWrapper>
      <InnerWrapper>
        <InnerWrapper2>
          {action === "STAKE" ? <FarmActionTabs /> : <StakeActionTabs />}
        </InnerWrapper2>
        <InnerWrapper3>
          <Select
            placeholder="Sort By"
            options={options}
            className={classes.Select}
            onChange={(event) => onSortingHandler(event.value)}
          />
          <TextField
            style={{ width: 138 }}
            className={classes.textField}
            id="input-with-icon-textfield"
            placeholder="Search by token name, cohort..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            onChange={(event) => onSearch(event.target.value)}
          />
        </InnerWrapper3>
      </InnerWrapper>
    </OuterWrapper>
  );
}
