import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Greentick from "../../assets/images/others/greentick.png";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import Confetti from "../../assets/images/others/conf.png";

interface SuccessMessageProps {
  open: any;
  parentCallback:any;
}

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

const SuccessMessage = (props: SuccessMessageProps) => {
  const useStyles = makeStyles(() =>
    createStyles({
      Rclaim: {
        width: "410px",
        textAlign: "center",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "20px",
        lineHeight: "24px",
        color: "#212121",
        marginTop: "28px",
      },
      imgR: {
        marginLeft: "170px",
        marginTop: "63px",
      },
      viewOn: {
        marginTop: "22px",
        marginLeft: "165px",
        marginBottom: "73px",
      },
      img: {
        marginRight: "70px",
      },
    })
  );

  const classes = useStyles();


  const close = () => {
      props.parentCallback();
  }

  return (
    <BootstrapDialog
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={close}>
        <img src={Confetti} />
        <img src={Confetti} className={classes.img} />
        <img src={Confetti} />
        <img src={Confetti} />
      </BootstrapDialogTitle>
      <DialogContent>
        <img src={Greentick} width={74} height={65} className={classes.imgR} />
        <div className={classes.Rclaim}> Rewards Claimed </div>
      </DialogContent>
      <a href="/" className={classes.viewOn}>
        View on Explorer
      </a>
      <DialogActions></DialogActions>
    </BootstrapDialog>
  );
};

export default SuccessMessage;
