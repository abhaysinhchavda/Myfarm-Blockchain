import React from "react";
import Box from "@mui/material/Box";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ButtonBg, TextColor } from "../../stylevariable";

import MySetting from "../AddLiquidityModal/Sub-Compoent/Setting";
import Selector from "./Selector";

import style from "styled-components";
import { createGlobalStyle } from "styled-components";
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
        backgroundColor: ButtonBg.myBackground + "!important",
        opacity: "0.3 !important",
      },
      ".MuiDialog-paperWidthSmt": {
        width: "560px",
      },
    },
  })
);

declare type ModalProps = {
  open: boolean;
  close: () => void;
  headerClass: string;
  title: string;
};

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
`;

function ImportLiquidityModal(props: ModalProps) {
  const classe = useStyle();

  return (
    <div>
      <GlobalStyle />
      <Box
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={"modal-cont" + " " + classe.Root}
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
              <MySetting />
            </ModalHeaderIconsDiv>
          </ModalHeaderDiv>
        </DialogTitle>

        <DialogContent>
          <Selector />
        </DialogContent>
      </Box>
    </div>
  );
}

export default ImportLiquidityModal;
