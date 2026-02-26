import { Button } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import styled from "styled-components";
import { ActionButtonProps } from "../ListView/ActionButton";
import {
  useActionScreenTypeCallback,
  useOpenWalletPopUp,
} from "../../../store/application/hooks";
import { useWeb3React } from "@web3-react/core";
import { getCurrentDateTime } from "../../../utilities";

const StyledActionOrConnectWalletButton = styled(Button)<{
  buttonaction: "STAKE" | "UNSTAKE";
  isButtonDisabled: boolean;
}>`
  text-transform: none;
  background-color: ${(props) =>
    props.isButtonDisabled ? "#E0E0E0" : "#6338BC"};
  color: ${(props) => (props.isButtonDisabled ? "black" : "white")};
  margin-top: ${(props) =>
    props.buttonaction === "STAKE" ? "-20px" : "-30px"};
  margin-bottom: ${(props) => (props.buttonaction === "STAKE" ? "2.5rem" : "0px")};
  &:hover {
    background: ${(props) => (props.isButtonDisabled ? "grey" : "#6338BC")};
    cursor: ${(props) => (props.isButtonDisabled ? "not-allowed" : "pointer")};
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    StakeBtn: {
      width: "337px",
      height: "40px",
      background: "#6338BC",
      fontStyle: "normal",
      fontSize: "1rem",
      letterSpacing: "0.02857em",
      lineHeight: 1.75,
      textAlign: "center",
      color: "white",
      position: "relative",
      top: "50px",
      left: "3px",
      "&:hover": {
        background: "#6338BC",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100% !important",
      },
      [theme.breakpoints.down("md")]: {
        width: "100% !important",
      },
    },

    StakeBtn1: {
      width: "337px",
      height: "40px",
      background: "grey",
      fontStyle: "normal",
      fontSize: "1rem",
      letterSpacing: "0.02857em",
      lineHeight: 1.75,
      textAlign: "center",
      color: "white",
      position: "relative",
      top: "50px",
      left: "3px",
      "&:hover": {
        background: "#808080",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100% !important",
      },
      [theme.breakpoints.down("md")]: {
        width: "100% !important",
      },
    },
  })
);

const StakeNowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export default function ActionButton({
  action,
  searchKey,
  endTime,
}: ActionButtonProps): JSX.Element {
  const classes = useStyles();

  const actionTypeCallBack = useActionScreenTypeCallback();

  const { account, active } = useWeb3React();

  const openConnectWalletPopup = useOpenWalletPopUp();

  const now = getCurrentDateTime();

  const isButtonDisabled = action === "STAKE" && now > endTime;
  return account && active ? (
    <StakeNowWrapper>
      <StyledActionOrConnectWalletButton
        className={classes.StakeBtn}
        onClick={() => {
          if (isButtonDisabled) return null;
          return actionTypeCallBack(action, searchKey);
        }}
        buttonaction={action}
        isButtonDisabled={isButtonDisabled}
      >
        {action === "STAKE" ? "Stake Now" : "View Details"}
      </StyledActionOrConnectWalletButton>
    </StakeNowWrapper>
  ) : (
    <StakeNowWrapper>
      <StyledActionOrConnectWalletButton
        className={classes.StakeBtn1}
        onClick={() => openConnectWalletPopup()}
        buttonaction={action}
        isButtonDisabled={isButtonDisabled}
      >
        Connect Wallet
      </StyledActionOrConnectWalletButton>
    </StakeNowWrapper>
  );
}
