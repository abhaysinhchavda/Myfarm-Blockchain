import React, { useState } from "react";
// import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@mui/material/Box";
// import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextColor } from "../../stylevariable";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { alpha, styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// import SettingsIcon from "@mui/icons-material/Settings";
// import AddIcon from "@mui/icons-material/Add";
// import Button from "@mui/material/Button";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import Selector from "./Selector";
import MySetting from "./Sub-Compoent/Setting";
import AmmModal from "./AmmModal";

import style from "styled-components";
import { createGlobalStyle } from "styled-components";
// import TokenDropDown from "../Exchange/Component/TokenDropdown";
import Selector from "./Selector";

const GlobalStyle = createGlobalStyle`
  .ConnectDilog .MuiDialog-paperWidthSm {
    width: 429px !important;
    height: 240px !important;
    border-radius: 20px;
  }
  .PoolModal .MuiDialog-paperWidthSm {
    width: 395px !important;
    border-radius: 20px;
    height: auto;
  }
  .StakeModal .MuiDialog-paperWidthSm {
    width: 438px !important;
    border-radius: 20px;
  }
  .SwitchNetworkDilog .MuiDialog-paperWidthSm {
    width: 431px;
    height: 182px;
    border-radius: 20px;
  }
  .myHeaderClass {
    border-bottom: 1px solid rgba(128, 128, 128, 0.34);
    color: black;
    padding: 0.8rem 1rem !important;
    background: linear-gradient(91.69deg, #ecfdff -5.48%, #f2f0ff 111.08%);
  }
  .MuiDialog-container > .MuiPaper-root {
    width: 560px;
    height: auto;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: none;
    border: 1px solid rgb(0 0 0 / 12%);
  }
`;

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    spanText: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px !important",
      },
    },
    Root: {
      width: "515px",
      maxWidth: "100%",
      borderRadius: "18px",
      margin: "0px auto",
      backgroundColor: "#fff",
      boxShadow:
        " 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",

      "&>.MuiBackdrop-root": {
        opacity: "0 !important",
        display: "none",
      },
      ".MuiDialog-paperWidthSmt": {
        width: "560px",
      },
    },
  })
);

const GasSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#6338BC",
    "&:hover": {
      backgroundColor: alpha("#6338BC", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#6338BC",
  },
}));

declare type ModalProps = {
  open: boolean;
  close: () => void;
  headerClass: string;
  title: string;
};

const ModalContentDiv = style.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  // padding: 0px 15px;
`;

const ModalHeaderIconsDiv = style.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  padding: 20px;
`;
const ModalHeaderDiv = style.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  color:${TextColor.textColor};
  font-weight: 700;
  padding-left: 30px;
  @media only screen and (max-width: 600px) {
    
   padding-left:15px;
  }
`;

function AddLiquidityModal(props: ModalProps) {
  const classe = useStyle();

  const [AmmModaler, setAmmModaler] = useState({
    modal: false,
    addedValue: false,
    unstake: true,
    sucess: false,
    error: false,
    loder: false,
    reward: false,
    msg: <div></div>,
    stakMsg: "",
    transactionStatus: "initial",
  });

  const amm = () => {
    setAmmModaler({ ...AmmModaler, loder: true, unstake: false });
    setTimeout(() => {
      setAmmModaler({ ...AmmModaler, loder: false, unstake: false });
      setAmmModaler({
        ...AmmModaler,
        sucess: true,
        unstake: false,
        reward: true,
        transactionStatus: "submitted",
        msg: <div>Transaction has been submitted successfully</div>,
      });
    }, 1500);
  };

  const addIt = () => {
    setAmmModaler({ ...AmmModaler, addedValue: true });
  };

  return (
    <div>
      <GlobalStyle />
      <Box
        //open={props.open}
        //onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classe.Root}
      >
        <DialogTitle
          id="alert-dialog-title"
          className={props.headerClass}
          style={{
            borderBottom: "1px solid #80808057",
            color: "black",
            paddingBottom: "0.2rem",
            paddingTop: "0.2rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <ModalHeaderDiv>
            {props.title}
            <ModalHeaderIconsDiv>
              <LocalGasStationIcon
                style={{ color: "#6338BC", fontWeight: 800 }}
              />
              <FormGroup>
                <FormControlLabel
                  control={<GasSwitch defaultChecked />}
                  label="YES"
                />
              </FormGroup>

              <MySetting />
            </ModalHeaderIconsDiv>
          </ModalHeaderDiv>
        </DialogTitle>

        <DialogContent>
          <ModalContentDiv>
            <Selector />
          </ModalContentDiv>
        </DialogContent>
      </Box>
      <AmmModal
        title="Swap Confirmation"
        close={() => setAmmModaler({ ...AmmModaler, modal: false })}
        open={AmmModaler.modal}
        unstake={AmmModaler.unstake}
        stakMsg={AmmModaler.stakMsg}
        sucsess={AmmModaler.sucess}
        error={AmmModaler.error}
        msg={AmmModaler.msg}
        loder={AmmModaler.loder}
        addedValue={AmmModaler.addedValue}
        clickUnstake={amm}
        transactionStatus={AmmModaler.transactionStatus}
        click={() => setAmmModaler({ ...AmmModaler, modal: false })}
        class="PoolModal"
        clickAddIt={addIt}
        reward={AmmModaler.reward}
        value1="1 Eth"
        value2="3995USDT"
      />
    </div>
  );
}

export default AddLiquidityModal;
