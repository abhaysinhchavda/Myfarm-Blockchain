import { MenuItem } from "@material-ui/core";
import React, { useRef } from "react";
import { networks } from "../../constants/chain";
import { useClosePopup, usePopupStatus } from "../../store/application/hooks";
import { PopUpTypes } from "../../store/application/reducer";
import {
  useApplicationUserState,
  useChangeAppChainId,
} from "../../store/user/hooks";
import Modal from "../Modal/index";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyle = makeStyles(() =>
  createStyles({
    NetworkDiv: {
      borderRadius: 15,
      fontWeight: 600,
      display: "flex",
      flexDirection: "column",
    },
    IconWrapper: {
      position: "absolute",
      left: "57px",
      top: "36px",
    },
    CheckIcon: {
      color: "green",
    },
  })
);
const NetworkPopUp = (): JSX.Element => {
  const isOpen = usePopupStatus(PopUpTypes.NETWORK);
  const close = useClosePopup();
  const classes = useStyle();
  const changeAppNetwork = useChangeAppChainId();
  const { appChainId } = useApplicationUserState();

  const ref = useRef();

  return (
    <div>
      <Modal
        open={isOpen}
        title="Switch Network"
        className="AccountDilog"
        headerClass="myHeaderClass"
        close={close}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {Object.keys(networks).map((keys) => {
            const network = networks[Number(keys)];
            return (
              <MenuItem
                ref={ref}
                onClick={() => changeAppNetwork(network.chainId)}
                key={network.chainId}
                className={classes.NetworkDiv}
              >
                <div>
                  {" "}
                  <img src={network.icon} height="50" width="50" />
                </div>
                <div> {network.name}</div>
                {appChainId === network.chainId && (
                  <div className={classes.IconWrapper}>
                    <CheckCircleIcon className={classes.CheckIcon} />
                  </div>
                )}
              </MenuItem>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};
export default NetworkPopUp;
