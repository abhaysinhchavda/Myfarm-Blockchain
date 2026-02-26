import React from "react";
import Confetti from "../../assets/images/others/confetti.png";

import { useClosePopup, usePopupStatus } from "../../store/application/hooks";
import { PopUpTypes } from "../../store/application/reducer";
import { makeStyles, Theme } from "@material-ui/core/styles";
// import Modal from "@mui/material/Modal";
import { Button } from "@material-ui/core";
// import X from "../../assets/images/others/x.png";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import { useHistory } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

// const style =  {
//   position: "relative" as "relative",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 420,
//   height: 500,
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
  ModalRoot: {
    "&>.MuiBox-root": {
      [theme.breakpoints.down("xs")]: {
        // width: "100% !important",
        overflow: "hidden",
      },
    },
  },
  dialogContent: {
    height: "384px",
    // [theme.breakpoints.down("xs")]: {},
  },
  ModalMainImage: {
    position: "relative",
    top: 0,
    left: 73,
    // [theme.breakpoints.down("xs")]: {
    //   left: 40,
    //   width: 21,
    //   height: 21,
    // },

    // ["@media (max-width:376px)"]: {
    //   left: 33,
    // },

    // [theme.breakpoints.up(320)]: {
    //   // left: 33,
    //   // width: "20px !important",
    //   // height: "20px !important",
    //   // left: 43,
    // },

    [theme.breakpoints.down(321)]: {
      left: 30,
      width: 21,
      height: 21,
    },

    [theme.breakpoints.between(321, 361)]: {
      left: 40,
      width: 31,
      height: 31,
    },

    [theme.breakpoints.between(361, 376)]: {
      left: 40,
    },

    [theme.breakpoints.between(376, 412)]: {
      left: 50,
    },

    [theme.breakpoints.between(412, 415)]: {
      left: 50,
    },
  },
  ModalHead: {
    position: "relative",
    top: -34,
    left: 127,
    width: 177,
    height: 27,
    fontFamily: "Inter",
    fontStyle: "bold",
    fontWeight: 550,
    fontSize: "18px",
    lineHeight: "29px",
    textAlign: "left",
    // [theme.breakpoints.down("xs")]: {
    //   // fontSize: "12px",
    //   // left: "70px !important",
    //   // left: 87,
    //   left: 72,
    //   fontSize: "18px",
    // },
    [theme.breakpoints.down(321)]: {
      left: 67,
      fontSize: "16px",
    },

    [theme.breakpoints.between(321, 361)]: {
      left: 77,
      fontSize: "16px",
    },

    [theme.breakpoints.between(361, 376)]: {
      left: 87,
      fontSize: "18px",
    },

    [theme.breakpoints.between(376, 412)]: {
      left: 97,
    },


    [theme.breakpoints.between(412, 415)]: {
      left: 100,
    },
  },
  ModalSecondaryText: {
    position: "relative",
    top: -20,
    left: 128,
    width: 73,
    height: 14,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "13px",
    lineHeight: "17px",
    textAlign: "center",
    color: "#000000",
    whiteSpace: "nowrap",
    // [theme.breakpoints.down("xs")]: {
    //   left: 72,
    // },

    [theme.breakpoints.down(321)]: {
      left: 67,
      fontSize: "13px",
    },

    [theme.breakpoints.between(321, 361)]: {
      left: 77,
    },

    [theme.breakpoints.between(361, 376)]: {
      left: 87,
    },

    [theme.breakpoints.between(376, 412)]: {
      left: 97,
    },

    [theme.breakpoints.between(412, 415)]: {
      left: 100,
    },
  },
  ModalMainText: {
    position: "relative",
    top: -6,
    left: -0,
    width: " 100%",
    height: 34,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 540,
    fontSize: "24px",
    lineHeight: "34px",
    textAlign: "center",
    color: "#000000",
    // [theme.breakpoints.down("xs")]: {
    //   // fontSize: "10px",
    //   // left: -124,
    //   // left: -74,
    //   // fontSize: "18px",
    //   // left: -10,
    //   // fontSize: "10px",
    //   fontSize: "22px",
    // },

    [theme.breakpoints.down(321)]: {
      fontSize: "16px",
      whiteSpace: "nowrap",
    },

    [theme.breakpoints.between(321, 361)]: {
      fontSize: "18px",
    },

    [theme.breakpoints.between(361, 376)]: {
      fontSize: "18px",
    },

    [theme.breakpoints.between(376, 412)]: {
      fontSize: "20px",
    },

    [theme.breakpoints.between(412, 415)]: {
      fontSize:"20px",
    },
  },
  ModalImage: {
    position: "relative",
    top: 20,
    left: 133,
    // [theme.breakpoints.down("xs")]: {
    //   // left: 27,
    //   // width: "66px !important",
    //   // height: "66px !important",
    //   // left: 73,
    //   left: 93,
    //   width: 86,
    //   height: 86,
    // },

    [theme.breakpoints.down(321)]: {
      left: 83,
      width: 86,
      height: 86,
    },

    [theme.breakpoints.between(321, 361)]: {
      left: 93,
      width: 96,
      height: 96,
    },

    [theme.breakpoints.between(361, 376)]: {
      left: 93,
    },

    [theme.breakpoints.between(376, 412)]: {
      left: 113,
      width: 86,
      height: 86,
    },

    [theme.breakpoints.between(412, 415)]: {
      left:103
    },
  },
  ModalButton: {
    position: "relative",
    top: 20,
    left: -70,
    width: 214.19,
    height: 30.48,
    backgroundColor: "#6338BC",
    borderRadius: "15px",
    color: "white",
    textTransform: "none",
    marginBottom: "40px",
    "&:hover": {
      backgroundColor: "#6338BC",
    },
    // [theme.breakpoints.down("xs")]: {
    //   // left: -9,
    //   // width: 164,
    //   // height: 30.48,
    //   // left: 20,
    //   left: -30,
    //   // width: 100,
    // },

    [theme.breakpoints.down(321)]: {
      left: -25,
      width: 186,
    },

    [theme.breakpoints.between(321, 361)]: {
      left: -25,
    },

    [theme.breakpoints.between(361, 376)]: {
      left: -25,
    },

    [theme.breakpoints.between(376, 412)]: {
      left: -35,
    },

    [theme.breakpoints.between(412, 415)]: {
      left:-35
    },
  },
  closeIcone: {
    position: "relative",
    top: -269,
    left: 385,
    // [theme.breakpoints.down("xs")]: {
    //   // top: -6,
    //   // left: 100,
    //   // left: 205,
    //   left: 375,
    // },
    // ["@media (max-width:376px)"]: {
    //   left: 230,
    // },
  },
}));

interface HedgeModalProps {
  stakeTokenIcon: string;
  stakeTokenName: string;
  cohortVersion: string;
}

export default function StakeModal({
  stakeTokenIcon,
  stakeTokenName,
  cohortVersion,
}: HedgeModalProps): JSX.Element {
  const isOpen = usePopupStatus(PopUpTypes.STAKE);

  const close = useClosePopup();

  const classes = useStyles();
  const history = useHistory();

  return (
    <BootstrapDialog
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={close}>
        <img
          src={stakeTokenIcon}
          width="31"
          height="31"
          className={classes.ModalMainImage}
          alt={stakeTokenName}
        />
        <div className={classes.ModalHead}>
          {stakeTokenName.toString().slice(0, 10)}
          {stakeTokenName.toString().length > 10 ? (
            <>
              ...
              <Tippy theme="light" placement="top" content={stakeTokenName}>
                <InfoIcon
                  style={{
                    fontSize: "13px",
                    color: "#C4C4C4",
                  }}
                />
              </Tippy>
            </>
          ) : null}
        </div>
        <div className={classes.ModalSecondaryText}>
          Cohort {cohortVersion.toString().slice(0, 5)}
          {cohortVersion.toString().length > 5 ? (
            <>
              ...
              <Tippy theme="light" placement="top" content={cohortVersion}>
                <InfoIcon
                  style={{
                    fontSize: "13px",
                    color: "#C4C4C4",
                  }}
                />
              </Tippy>
            </>
          ) : null}
        </div>
      </BootstrapDialogTitle>
      <DialogContent>
        <div className={classes.ModalMainText}>
          You have successfully staked
        </div>
        <img
          src={Confetti}
          height="106"
          width="106"
          className={classes.ModalImage}
        />
      </DialogContent>

      <DialogActions>
        <Button
          className={classes.ModalButton}
          onClick={() => history.push("/earn/mystakes")}
        >
          {" "}
          MyStake
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
