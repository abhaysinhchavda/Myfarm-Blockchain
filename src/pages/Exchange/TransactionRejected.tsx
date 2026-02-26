// import { DialogTitle } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import React from "react";
import { useClosePopup } from "../../store/application/hooks";
import IconButton from "@mui/material/IconButton";
import X from "../../assets/images/others/x.png";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import Errorpart from "../../assets/images/others/errorpart.png";

interface TRProps {
  open: any;
  parentCallback: any;
}

const style = {
  position: "relative" as "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 517,
  height: 250,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
  paddingTop: 0,
};

const TransactionRejected = (props: TRProps) => {
  const close = useClosePopup();

  const closer = (event) => {
    props.parentCallback(event);
    event.preventDefault();
  };

  const useStyles = makeStyles((theme) => ({
    ModalRoot: {
      "&>.MuiBox-root": {
        [theme.breakpoints.down("xs")]: {
          width: "100% !important",
        },
      },
    },

    ModalHead: {
      position: "relative",
      top: 150,
      left: -7,
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "20px",
      lineHeight: "24px",
      textTransform: "capitalize",
    },

    closeIcone: {
      position: "relative",
      top: 121,
      left: 430,
      [theme.breakpoints.down("xs")]: {
        top: -6,
        left: 300,
      },
    },

    Divider: {
      position: "relative",
      top: "140px",
      width: "525px",
      left: "-40px",
    },

    closeButton: {
      right: "-40px",
    },
  }));

  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classes.ModalRoot}
    >
      <Box sx={style}>
        <div className={classes.ModalHead}>Transaction Rejected</div>

        <IconButton className={classes.closeIcone} onClick={closer}>
          <img src={X} height="16" width="16" />
        </IconButton>

        <Divider className={classes.Divider} />

        <img
          src={Errorpart}
          style={{ position: "relative", top: "180px", right: "-190px" }}
        />

        <div
          style={{
            position: "relative",
            top: "210px",
            right: "-80px",
            width: "230px",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "20px",
            lineHeight: "24px",
            whiteSpace: "nowrap",
          }}
        >
          Transaction has been Rejected
        </div>
      </Box>
    </Dialog>
  );
};

export default TransactionRejected;
