import { createStyles, makeStyles } from "@material-ui/core/styles";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { useWeb3React } from "@web3-react/core";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { walletconnect } from "../../connectors";
import { useClosePopup, usePopupStatus } from "../../store/application/hooks";
import { PopUpTypes } from "../../store/application/reducer";
import { getConnectorName, getProviderLogo } from "../../utilities";
import Modal from "../Modal";
import { AccountDetails } from "./AccountDetails";
import { networks } from "../../constants/chain";
import { wallets } from "../../constants";
import Wallet from "../Web3Modal/Wallet";
import { MenuItem } from "@material-ui/core";
import check from "../../assets/svg/check.svg";
import {
  useApplicationUserState,
  useChangeAppChainId,
} from "../../store/user/hooks";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const useStyles = makeStyles((theme) =>
  createStyles({
    NetworkDiv: {
      borderRadius: 15,
      fontWeight: 600,
      display: "flex",
      flexDirection: "column",
      marginLeft: 36,
    },
    liItem: {
      width: 95,
      [theme.breakpoints.down("xs")]: {
        width: "unset",
        marginBottom: 10,
      },
    },
    providerWrapper: {
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        marginLeft: 15,
      },
    },
    providerButton: {
      border: 0,
      background: "transparent",
      marginLeft: 54,
      [theme.breakpoints.down("xs")]: {
        marginLeft: 0,
        width: 120,
      },
    },
    IconWrapper: {
      position: "absolute",
      left: "57px",
      top: "39px",
    },
    CheckIcon: {
      color: "green",
    },
    networkContainer: {
      padding: 10,
      background: "#dfebff",
      color: "#7e96b8",
      borderRadius: 10,
      paddingLeft: 16,
      paddingRight: 16,
    },
    networkText: {
      color: "#191f2a",
      fontSize: 18,
      marginLeft: "8px",
    },
    NetworkSelect: {
      display: "flex",
      marginTop: "1rem",
      [theme.breakpoints.down("xs")]: {
        marginLeft: 1,
        flexWrap: "wrap",
      },
    },
    modaler:{
      maxWidth:"110%",
      
    }
  })
);

enum Screens {
  WALLET,
  ACCOUNT,
}

export const Web3Modal = (): JSX.Element => {
  const [activeConnector, setActiveConnector] =
    useState<AbstractConnector | null>(null);

  const [screen, changeScreen] = useState<Screens>(Screens.WALLET);

  const isOpen = usePopupStatus(PopUpTypes.WALLET);

  const { active, connector, activate, account } = useWeb3React();

  const ref = useRef();

  useEffect(() => {
    if (active && account) {
      changeScreen(Screens.ACCOUNT);
    } else {
      changeScreen(Screens.WALLET);
    }
  }, [active, account, changeScreen]);

  useEffect(() => {
    return setActiveConnector(connector);
  }, [active, account, connector]);

  const activation = async (connector: AbstractConnector | undefined) => {
    // this is needed here
    if (connector instanceof WalletConnectConnector) {
      walletconnect(appChainId).walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true)
        .then(() => {
          setActiveConnector(connector);
          close();
        })
        .catch(() => {
          close();
        });
  };

  const close = useClosePopup();

  const classes = useStyles();

  const { appChainId } = useApplicationUserState();
  const changeAppNetwork = useChangeAppChainId();

  function getScreens(): JSX.Element {
    if (screen === Screens.ACCOUNT) {
      return (
        <AccountDetails
          providerName={getConnectorName(connector)}
          providerLogo={getProviderLogo(connector)}
          userAddress={account}
        />
      );
    }
    return <>{getProviders()}</>;
  }

  function getProviders(): JSX.Element {
    return (
      <Fragment>
        {console.log(activeConnector)}
        <div style={{ marginTop: "1rem" }}>
          <span className={classes.networkContainer}>1</span>
          &nbsp;&nbsp;
          <span className={classes.networkText}>Choose Network</span>
          <div className={classes.NetworkSelect}>
            {Object.keys(networks).map((keys) => {
              const network = networks[Number(keys)];
              return (
                <MenuItem
                  ref={ref}
                  onClick={() => changeAppNetwork(network.chainId, true)}
                  key={network.chainId}
                  className={classes.NetworkDiv + " " + classes.liItem}
                >
                  <div>
                    {" "}
                    <img src={network.icon} height="50" width="50" />
                  </div>
                  <div style={{ fontSize: 12 }}> {network.name}</div>
                  {appChainId === network.chainId && (
                    <div className={classes.IconWrapper}>
                      <img src={check} alt="chain" />
                    </div>
                  )}
                </MenuItem>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <span className={classes.networkContainer}>2</span>
          &nbsp;&nbsp;
          <span className={classes.networkText}>Choose Wallet</span>
          <div className={classes.providerWrapper}>
            {/* {console.log(activeConnector)} */}
            {Object.keys(wallets).map((key, index) => {
              const provider = wallets[key];
              return (
                <button
                  key={index}
                  className={classes.providerButton}
                  onClick={() => {
                    return activation(provider.connector(appChainId));
                  }}
                >
                  <Wallet
                    image={provider.logoUri}
                    imageWidth={55}
                    name={provider.name}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Modal
      open={isOpen}
      title={active ? "Account Details" : "Connect Wallet"}
      className={classes.modaler}
      headerClass="myHeaderClass"
      close={close}
    >
      {getScreens()}
    </Modal>
  );
};
