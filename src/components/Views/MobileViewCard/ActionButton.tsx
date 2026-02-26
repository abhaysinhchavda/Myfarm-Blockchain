import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { ActionButtonProps } from "../ListView/ActionButton";
import {
  useActionScreenTypeCallback,
  useOpenWalletPopUp,
} from "../../../store/application/hooks";
import { useWeb3React } from "@web3-react/core";
import { getCurrentDateTime } from "../../../utilities";

export default function ActionCard({
  action,
  endTime,
  searchKey,
}: ActionButtonProps): JSX.Element {
  const actionCallback = useActionScreenTypeCallback();

  const openConnectWalletPopup = useOpenWalletPopUp();

  const { active, account } = useWeb3React();

  const now = getCurrentDateTime();

  const isButtonDisabled = action === "STAKE" && now > endTime;

  const classes = makeStyles(() => ({
    ButtonDiv: {
      display: "flex",
      justifyContent: "center",
      marginTop: "1.5rem",
      marginBottom: "1rem",
    },
    buttonStyle: {
      background: `${isButtonDisabled ? "#80808052" : "#6338BC"}`,
      color: `${isButtonDisabled ? "black !important" : "white !important"}`,
      width: "100%",
      "&:hover": {
        background: `${isButtonDisabled ? "#80808052" : "#6338BC"}`,
        cursor: `${(isButtonDisabled) =>
          isButtonDisabled ? "not-allowed" : "pointer"}`,
      },
    },
  }))();

  return (
    <div className={classes.ButtonDiv}>
      {active && account ? (
        <Button
          className={classes.buttonStyle}
          onClick={() => actionCallback(action, searchKey)}
          disabled={isButtonDisabled}
        >
          {action == "STAKE" ? "stake" : "View Details"}
        </Button>
      ) : (
        <Button
          className={classes.buttonStyle}
          onClick={() => openConnectWalletPopup()}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
