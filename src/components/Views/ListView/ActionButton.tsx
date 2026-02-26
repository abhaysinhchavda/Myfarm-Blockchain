import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {
  useActionScreenTypeCallback,
  useOpenWalletPopUp,
} from "../../../store/application/hooks";
import { useWeb3React } from "@web3-react/core";
import { getCurrentDateTime } from "../../../utilities";
// import {useHistory} from 'react-router-dom'

const ActionButtonFlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledActionOrConnectWalletButton = styled(Button)<{
  isButtonDisabled: boolean;
}>`
  background: ${(props) => (props.isButtonDisabled ? "#80808052" : "#6338bc")};
  width: 140px;
  color: white;
  color: ${(props) =>
    props.isButtonDisabled ? "black !important" : "white !important"};
  border-radius: 20px;
  padding: 5px 16px;
  font-size: 15;
  text-transform: capitalize;
  box-shadow: 0 8px 16px rgb(99 56 188 / 13%);
  &:hover {
    background : ${(props) => (props.isButtonDisabled ? "grey" : "#6338BC")};
    cursor: ${(props) => (props.isButtonDisabled ? "not-allowed" : "pointer")};
  }
`;

export interface ActionButtonProps {
  action: "STAKE" | "UNSTAKE";
  searchKey: string;
  endTime: number;
}

export default function ActionButton({
  action,
  searchKey,
  endTime,
}: ActionButtonProps) {
  const openConnectWalletPopup = useOpenWalletPopUp();

  const { active, account } = useWeb3React();

  const actionTypeCallBack = useActionScreenTypeCallback();

  const now = getCurrentDateTime();
  // const history=useHistory()
  const isButtonDisabled = action === "STAKE" && now > endTime;

  return (
    <ActionButtonFlexWrapper>
      {active && account ? (
        <StyledActionOrConnectWalletButton
          onClick={() => {
            if (isButtonDisabled) return null;
            return actionTypeCallBack(action, searchKey);
            // history.push('/earn/mystakes')
          }}
          isButtonDisabled={isButtonDisabled}
        >
          {action === "STAKE" ? "Stake Now" : "View Details"}
        </StyledActionOrConnectWalletButton>
      ) : (
        <StyledActionOrConnectWalletButton
          onClick={() => openConnectWalletPopup()}
          isButtonDisabled={isButtonDisabled}
        >
          Connect Wallet
        </StyledActionOrConnectWalletButton>
      )}
    </ActionButtonFlexWrapper>
  );
}
