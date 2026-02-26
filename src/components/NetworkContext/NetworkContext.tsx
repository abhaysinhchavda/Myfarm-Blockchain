import React, { Fragment } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Info from "../../assets/images/New/info.png";
import { useOpenNetworkPopUp } from "../../store/application/hooks";
import { useActiveNetwork } from "../../hooks/useMiscellaneous";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const NetworkButton = styled(Button)<{ isNetworkError?: boolean }>`
  background-color: ${(props) =>
    props.isNetworkError ? "#ff4848" : "#F8F8F9"};
  border: 1px solid transparent;
  border-radius: 5px;
  margin-left: 0.5rem;
  letter-spacing: 2px;
  text-transform: none;
  box-shadow: ${(props) =>
    props.isNetworkError ? "0 8px 16px rgb(99 56 188 / 13%)" : "unset"};
  color: ${(props) => (props.isNetworkError ? "white" : "")};
  text-transform: ${(props) => (props.isNetworkError ? "capitalize" : "")};
  &: hover {
    background-color: ${(props) =>
      props.isNetworkError ? "#ff4848" : "#F8F8F9"};
  }
`;

const StyledInfoIcon = styled.img`
  margin-right: 5px;
  width: 20px;
`;

const ActiveNetworkFlexBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ActiveNetWorkLogo = styled.img`
  margin-left: -6px;
  margin-right: 6px;
  width: 20px;
`;

export default function NetworkContext() {
  const { error } = useWeb3React();

  const openNetworkPop = useOpenNetworkPopUp();
  const { connector } = useWeb3React();
  const activeNetwork = useActiveNetwork();

  return (
    <Fragment>
      {error instanceof UnsupportedChainIdError ? (
        <NetworkButton
          id="demo-customized-button"
          aria-controls="demo-customized-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          isNetworkError={true}
        >
          <StyledInfoIcon src={Info} />
          Wrong Network
        </NetworkButton>
      ) : (
        <NetworkButton
          id="demo-customized-button"
          aria-controls="demo-customized-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={() => {
            if (connector instanceof WalletConnectConnector) return null;
            openNetworkPop();
          }}
          disabled={connector instanceof WalletConnectConnector}
        >
          <ActiveNetworkFlexBoxWrapper>
            <ActiveNetWorkLogo src={activeNetwork?.icon} />
            {activeNetwork?.name}
          </ActiveNetworkFlexBoxWrapper>
        </NetworkButton>
      )}
    </Fragment>
  );
}
