import React from "react";
import { makeStyles } from "@material-ui/core";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useApplicationUserState, useSetView } from "../../store/user/hooks";
import { Views } from "../../store/user/reducer";
import SearchInput from "../SearchInput";
import FarmActionTabs from "../Tabs/FarmActionTabs";
import StakeActionTabs from "../Tabs/StakeActionTabs";
import styled from "styled-components";
import Select from "react-select";
import { useUserControlContext } from "../../contexts/UserControlContext";

const useStyles = makeStyles(() => ({
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

const DesktopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DesktopWrapper2 = styled.div`
  width: 310px;
`;

const TabsControlsWrapper = styled.div`
  margin-top: -3.55;
`;

const SelectWrapper = styled.div`
  text-align: left;
  width: 115px;
  border-radius: 10;
  & .css-1s2u09g-control {
    border-radius: 10px;
  }
`;

const TabMargin = styled.div`
  margin-right: 0rem;
`;

export default function DesktopControls() {
  const classes = useStyles();

  const setView = useSetView();

  const { view } = useApplicationUserState();

  const { action, sortingOptions, onSortingHandler } = useUserControlContext();
  return (
    <DesktopWrapper>
      

      <TabsControlsWrapper>
        {action === "STAKE" ? (
          <FarmActionTabs />
        ) : (
          <TabMargin>
            <StakeActionTabs />
          </TabMargin>
        )}
      </TabsControlsWrapper>

      <DesktopWrapper2>
        <SearchInput />
      </DesktopWrapper2>

      <SelectWrapper>
        <Select
          options={sortingOptions}
          onChange={(event: any) => onSortingHandler(event.value)}
          defaultValue = {{label:"Sort By...",value:0}}
        />
      </SelectWrapper>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(event, view) => setView(view)}
        aria-label="text alignment"
        style={{ height: 40 }}
        className={classes.ToggleButton}
      >
        <ToggleButton value={Views.LIST} aria-label="left aligned">
          <ViewListIcon />
        </ToggleButton>

        <ToggleButton value={Views.GRID} aria-label="centered">
          <GridViewIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </DesktopWrapper>
  );
}
