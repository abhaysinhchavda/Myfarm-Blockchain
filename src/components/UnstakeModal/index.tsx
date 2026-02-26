import React from "react";
import GreenTick from "../../assets/images/others/greentick.png";
// import { Button } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
// import { Box } from "@material-ui/core";
// import IconButton from "@material-ui/core/IconButton";
// import X from "../../assets/images/others/x.png";
// import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

interface UnstakeModalProps {
  isOpen: boolean;
  close: () => void;
}

// const style = {
//   position: "relative" as "relative",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 440,
//   height: 474,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   borderRadius: "20px",
//   p: 4,
//   paddingTop: 0,
// };

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  UnstakeMainModal: {
    position: "relative",
    width: 387,
    height: 70,
    left: 0,
    top: 10,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "33px",
    textAlign: "center",
    color: "#2E2E2E",

    [theme.breakpoints.down(321)]: {
      fontSize: "14px",
      left: "0px",
      width: "100%",
    },
    [theme.breakpoints.between(321, 361)]: {
      fontSize: "14px",
      left: "0px",
      width: "100%",
    },
    [theme.breakpoints.between(361, 376)]: {
      fontSize: "14px",
      left: "0px",
      width: "100%",
    },

    [theme.breakpoints.between(376, 412)]: {
      fontSize: "14px",
      left: "0px",
      width: "100%",
    },

    [theme.breakpoints.between(412, 415)]: {
      fontSize: "14px",
      left: "0px",
      width: "100%",
    }
  },
  UnstakeImageModal: {
    position: "relative",
    top: 20,
    left: 142,
    marginBottom: 20,
    [theme.breakpoints.down(321)]: {
      left: 60,
    },

    [theme.breakpoints.between(321, 361)]: {
      left: 75,
    },

    [theme.breakpoints.between(361, 376)]: {
      left: 85,
    },

    [theme.breakpoints.between(376, 412)]: {
      left:105
    },

    [theme.breakpoints.between(412, 415)]: {
      left:105
    }
  },
  unstakeCloseBtn: {
    position: "relative",
    top: "70px",
    left: "221px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  UnstakeBtnModal: {
    position: "relative",
    width: 365,
    height: 44,
    left: -20,
    top: 20,
    borderRadius: "20px",
    backgroundColor: "#6338BC",
    color: "white",
    textTransform: "none",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "26px",
    textAlign: "center",
    marginBottom: "40px",
    "&:hover": {
      backgroundColor: "#6338BC",
    },

    [theme.breakpoints.down(321)]: {
      left: 0,
      width: 325,
      fontSize: "16px",
    },

    [theme.breakpoints.between(321, 361)]: {
      left: 0,
      width: 325,
      fontSize: "16px",
    },

    [theme.breakpoints.between(361, 376)]: {
      left: 0,
      width: 325,
      fontSize: "16px",
    },

    [theme.breakpoints.between(376, 412)]: {
      left: 0,
      width: 325,
      fontSize: "16px",
    },

    [theme.breakpoints.between(412, 415)]: {
      left: -15,
      width: 305,
      fontSize: "16px",
    }
  },
  ModalRoot: {
    "&>.MuiBox-root": {
      [theme.breakpoints.down("xs")]: {
        width: "100% !important",
      },
    },
  },
}));

export default function UnstakeModal({
  isOpen,
  close,
}: UnstakeModalProps): JSX.Element {
  const classes = useStyles();

  return (
    <BootstrapDialog
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={close}
      ></BootstrapDialogTitle>
      <DialogContent>
        <div className={classes.UnstakeMainModal}>
          You have successfully unstaked and claimed rewards
        </div>
        <img
          src={GreenTick}
          height="93"
          width="106"
          className={classes.UnstakeImageModal}
        />
      </DialogContent>
      <DialogActions>
        {/* <Button className={classes.UnstakeBtnModal} onClick={() => null}>
          Stake Principal Amount
        </Button> */}
      </DialogActions>
    </BootstrapDialog>
  );
}
