import React from "react";

import { useClosePopup } from "../../store/application/hooks";

import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@mui/material/Modal";
import { Box } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
// import { Button } from "@material-ui/core";
import X from "../../assets/images/others/x.png";
import IconButton from "@mui/material/IconButton";
// import {useHistory} from 'react-router-dom';
// import CloseIcon from "@material-ui/icons/Close";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import { DialogContent } from "@mui/material";
import Greencheck from "../../assets/images/others/greencheck.png";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

const style = {
  position: "relative" as "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 517,
  height: 430,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
  paddingTop: 0,
};

const useStyles = makeStyles((theme) => ({
  ModalRoot: {
    "&>.MuiBox-root": {
      [theme.breakpoints.down("xs")]: {
        width: "100% !important",
      },
    },
  },
  ModalMainImage: {
    position: "relative",
    top: 300,
    left: 93,
    [theme.breakpoints.down("xs")]: {
      left: 93,
    },
  },
  ModalHead: {
    position: "relative",
    top: 234,
    left: -7,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "24px",
    textTransform: "capitalize",
  },
  ModalSecondaryText: {
    position: "relative",
    top: 280,
    left: 138,
    width: 73,
    height: 14,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "13px",
    lineHeight: "17px",
    textAlign: "center",
    color: "#000000",
    [theme.breakpoints.down("xs")]: {
      left: "132px !important",
    },
  },
  ModalMainText: {
    position: "relative",
    top: 300,
    left: -20,
    width: 402,
    height: 34,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 540,
    fontSize: "24px",
    lineHeight: "34px",
    textAlign: "center",
    color: "#000000",
    [theme.breakpoints.down("xs")]: {
      fontSize: "20px",
      left: -21,
    },
  },
  ModalImage: {
    position: "relative",
    top: 340,
    left: 153,
    [theme.breakpoints.down("xs")]: {
      left: 133,
    },
  },
  ModalImageText: {
    position: "relative",
    top: 390,
    left: -10,
    width: 391,
    height: 36,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "21px",
    lineHeight: "29px",
    textAlign: "center",
    color: "#000000",
    [theme.breakpoints.down("xs")]: {
      fontSize: "21px",
      left: -21,
    },
  },
  ModalButton: {
    position: "relative",
    top: 400,
    left: 80,
    width: 214.19,
    height: 30.48,
    backgroundColor: "#6338BC",
    borderRadius: "15px",
    color: "white",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#6338BC",
    },
    [theme.breakpoints.down("xs")]: {
      left: 75,
    },
  },
  closeIcone: {
    position: "relative",
    top: 205,
    left: 430,
    [theme.breakpoints.down("xs")]: {
      top: -6,
      left: 300,
    },
  },
  ModalShareIcon: {
    position: "relative",
    top: 458,
    left: -44,
    [theme.breakpoints.down("xs")]: {
      left: -61.3,
    },
  },
  IconButton: {
    position: "relative",
    right: "-90px",
  },
  Divider: {
    position: "relative",
    top: "230px",
    width: "525px",
    left: "-40px",
  },
}));

interface TsProps {
  open: any;
  parentCallback: any;
}

const TransactionSuccessful = (props: TsProps) => {
  const close = useClosePopup();

  const closer = (event) => {
    props.parentCallback(event);
    event.preventDefault();
  };

  const classes = useStyles();
  //   const history=useHistory();

  return (
    <Dialog
      style={{ overflow: "hidden" }}
      open={props.open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classes.ModalRoot}
    >
      <Box sx={style}>
        <div className={classes.ModalHead}>Transaction Successful</div>

        <IconButton className={classes.closeIcone} onClick={closer}>
          <img src={X} height="16" width="16" />
        </IconButton>

        <Divider className={classes.Divider} />

        <img
          src={Greencheck}
          style={{ position: "relative", top: "270px", right: "-190px" }}
        />
        <div
          style={{
            position: "relative",
            top: "280px",
            right: "-110px",
            width: "230px",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "20px",
            lineHeight: "24px",
            whiteSpace: "nowrap",
          }}
        >
          Transaction successful
        </div>
        <div
          style={{
            position: "relative",
            top: "285px",
            right: "-32px",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "24px",
          }}
        >
          You saved 30$ on this trade transacting on Unifarm
        </div>
        <Button
          style={{
            position: "relative",
            top: "300px",
            left: "-10px",
            width: "222px",
            height: "55px",
            background: "#673AB7",
            color: "white",
          }}
        >
          New Trade
        </Button>
        <Button
          style={{
            position: "relative",
            top: "300px",
            left: "10px",
            border: "1px solid #673AB7",
            width: "222px",
            height: "55px",
            color: "#673AB7",
          }}
        >
          Share
        </Button>
        <Button
          style={{
            position: "relative",
            top: "320px",
            border: "1px solid #673AB7",
            width: "395px",
            height: "55px",
            color: "#673AB7",
            right: "-28px",
          }}
        >
          Add TKNY to Metamask
        </Button>
      </Box>
    </Dialog>
  );
};

export default TransactionSuccessful;
