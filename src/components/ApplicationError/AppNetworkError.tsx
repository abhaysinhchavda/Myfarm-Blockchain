import React from "react";
import NoConnectWalletIcon from "../../assets/images/others/connectwallet.png";
import styled from "styled-components";
import { useChainIdError } from "../../hooks/useChainIdError";

export const AppNetworkWrapper = styled.div`
  display: flex;
  width: 427px;
  height: 216px;
  border: 1px solid black;
  margin-left: 380px;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  margin-top: 20px;
  flex-grow: 1;
  position: relative;
  flex-shrink: 1;
`;

export const NoConnectionStyledIcon = styled.img`
  width: 82px;
  height: 79px;
  position: relative;
  top: 31px;
  left: 130px;
`;

export const NetworkMessage = styled.div`
  position: relative;
  top: 120px;
  left: -40px;
  width: 367px;
  height: 40px;
`;

export function AppNetworkError(): JSX.Element {
  const chainError = useChainIdError();
  return chainError ? (
    <AppNetworkWrapper>
      <NoConnectionStyledIcon src={NoConnectWalletIcon} />
      <NetworkMessage>
        App network doesn’t match to network selected in wallet. Please change
        network to view details.
      </NetworkMessage>
    </AppNetworkWrapper>
  ) : null;
}
