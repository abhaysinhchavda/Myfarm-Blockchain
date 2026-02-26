import React from "react";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@mui/material";
import MobileControls from "./MobileControls";
import IpadControls from "./IpadConrols";
import DesktopControls from "./DesktopControls";

const UserControlsWrapper = styled.div`
  margin-top: 1rem;
`;

export default function UserControls(): JSX.Element {
  const theme = useTheme();
  const Mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const Ipad = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <UserControlsWrapper>
      {Mobile ? (
        <MobileControls />
      ) : Ipad ? (
        <IpadControls />
      ) : (
        <DesktopControls />
      )}
    </UserControlsWrapper>
  );
}
