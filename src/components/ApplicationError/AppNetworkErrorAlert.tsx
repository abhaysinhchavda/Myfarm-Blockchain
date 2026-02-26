import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useOpenNetworkPopUp } from "../../store/application/hooks";
import styled from "styled-components";
import { useChainIdError } from "../../hooks/useChainIdError";

const AlertDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledNetworkSwitchButton = styled(Button)`
  color: white;
  text-decoration: underline;
`;

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AppNetworkErrorAlert = () => {
  const openNetworkPop = useOpenNetworkPopUp();
  const chainError = useChainIdError();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  return chainError ? (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error">
        <AlertDiv>
          <span style={{textAlign:mobile?'left':null}}>
            App network doesn’t match to network selected in wallet. Please
            change network in the wallet or in the app.
          </span>
          <StyledNetworkSwitchButton onClick={() => openNetworkPop()}>
            {
              mobile?"Change": "Change The Network"
            }
           
          </StyledNetworkSwitchButton>
        </AlertDiv>
      </Alert>
    </Snackbar>
  ) : null;
};
