import React from "react";
import { Button } from "@material-ui/core";
import { getProviderLogo, miniWalletAddress } from "../../utilities";
import { useOpenWalletPopUp } from "../../store/application/hooks";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";

const ConnectWalletFlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;



export default function ConnectWallet(): JSX.Element {
  const { active, account, connector } = useWeb3React();

  const activeProviderLogo = getProviderLogo(connector);

  const open = useOpenWalletPopUp();
  const StyledButton = styled(Button)`
  background: ${miniWalletAddress(account)?"#F8F8F9":"#6338BC"};
  border:${miniWalletAddress(account)?"1px solid transparent":"unset"};
  border-radius: 5px;
   margin-left: 0.5rem;
   padding:6px 16px;
  letter-spacing:2px;
  text-indent:5px;
  box-shadow:${miniWalletAddress(account)?"1px solid transparent":"0 8px 16px rgb(99 56 188 / 13%)"};
  text-transform: capitalize;
  
  color: ${miniWalletAddress(account)?"black":"white"};
  &: hover {
    background: ${miniWalletAddress(account)?"transperent":"#6338BC"};
  }
  

`;
  return (
    <StyledButton onClick={open}>
      {active && account ? (
        <ConnectWalletFlexWrapper>
          <img src={activeProviderLogo} /> <span>{miniWalletAddress(account)}</span>
        </ConnectWalletFlexWrapper>
      ) : (
        <span>Connect Wallet</span>
      )}
    </StyledButton>
  );
}
