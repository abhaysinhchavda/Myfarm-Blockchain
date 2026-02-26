import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// import ErrorIcon from "@material-ui/icons/Error";
// import { PuffLoader } from "react-spinners";
import React from "react";
import "./Modal.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextColor, ButtonBg } from "../../stylevariable";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@mui/material/CircularProgress";
import YellowAlert from "../../assets/images/others/yellowalert.png";
import Metawolf from "../../assets/images/others/metawolf.png";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    spanText: {
      fontWeight: 500,
      fontSize: "20px",
      display: "flex",
      justifyContent: "center",
      marginTop: "36px",
      marginLeft: "15px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px !important",
      },
    },
    Root: {
      "&>.MuiBackdrop-root": {
        backgroundColor: ButtonBg.myBackground + "!important",
        opacity: "0.3 !important",
      },
      overflow: "hidden",
    },

    titleTag: {
      justifyContent: "left",
      display: "flex",
      alignItems: "center",
      fontSize: 20,
      fontWeight: 700,
    },

    continueButton: {
      marginTop: "53px",
      display: "flex",
      justifyContent: "center",
    },

    circularProgress: {
      position: "relative",
      top: "-5px",
      left: "180px",
    },

    waitingText: {
      position: "relative",
      bottom: "-50px",
      right: "-80px",
      width: "490px",
      height: "30px",

      whiteSpace: "nowrap",
    },

    swappingText: {
      position: "relative",
      bottom: "-80px",
      left: "-100px",

      width: "750px",
      height: "30px",
      whiteSpace: "nowrap",
    },

    outerDiv: {
      display: "flex",
      justifyContent: "center",
    },

    details: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 5,
    },

    spanStyle: {
      fontWeight: 400,
      fontSize: 14,
      color: "#616161",
    },

    buttonDiv: {
      marginTop: "10px",
      display: "flex",
      justifyContent: "center",
    },
  })
);

interface AmmProps {
  open: any;
  close: any;
  class: any;
  title: any;
  unstake: any;
  stakMsg: any;
  clickUnstake: any;
  loder: any;
  sucsess: any;
  msg: any;
  reward: any;
  error: any;
  click: any;
  clickAddIt: any;
  addedValue: any;
  transactionStatus: string;
  value1: any;
  value2: any;
}

const AmmModal = (props: AmmProps) => {
  const classe = useStyle();
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={props.class + " " + classe.Root}
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            borderBottom: "1px solid #80808057",
            color: "black",
            paddingBottom: 5,
            paddingTop: 5,
          }}
        >
          <div className={classe.titleTag}>
            {props.transactionStatus === "initial"
              ? "Swap Confirmation"
              : props.transactionStatus === "submitted"
              ? "Transaction Submitted"
              : null}
            <IconButton
              onClick={props.close}
              style={{
                color: TextColor.textColor,
                fontWeight: 800,
                position: "relative",
                left:
                  props.transactionStatus === "submitted" ? "100px" : "130px",
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          {props.unstake ? (
            <div>
              <span className={classe.spanText}>
                {props.stakMsg ? (
                  props.stakMsg
                ) : (
                  <div>
                    Are you sure you want to swap
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    {props.value1}&nbsp;for {props.value2}?
                  </div>
                )}
              </span>
              <div className={classe.continueButton}>
                <Button
                  onClick={props.clickUnstake}
                  className="drakModalBtn"
                  style={{
                    background: ButtonBg.myBackground,
                    border: "1px solid #80808057",
                    color: "white",
                    width: "150px",
                    height: 35,
                    borderRadius: "30px",
                    marginRight: 0,
                    marginTop: -20,
                  }}
                >
                  Continue
                </Button>
                {/* <Button
                  className="drakModalBtn"
                  onClick={props.click}
                  style={{
                    background: ButtonBg.myBackground,
                    border: "1px solid #80808057",
                    color: "white",
                    width: "150px",
                    height: 35,
                    borderRadius: "30px",
                  }}
                >
                  Cancel
                </Button> */}
              </div>
            </div>
          ) : props.loder ? (
            <div className="loder">
              <div className={classe.circularProgress}>
                <CircularProgress color="secondary" />
              </div>
              <div className={classe.waitingText}>Waiting for confirmation</div>
              <div className={classe.swappingText}>
                Swapping {props.value1} for {props.value2}
              </div>
            </div>
          ) : props.sucsess ? (
            <div>
              <div className={classe.outerDiv}>
                <div className={classe.details}>
                  <img src={YellowAlert} style={{ marginTop: "-5px" }} />
                  <span className={classe.spanStyle}>{props.msg}</span>
                  <a style={{ color: "#673AB7" }}>View on Explorer</a>
                </div>
              </div>
              <div className={classe.buttonDiv}>
                <Button
                  onClick={props.clickAddIt}
                  style={{
                    border: "1px solid #673AB7",
                    color: "#673AB7",
                    width: "470px",
                    height: 55,
                    borderRadius: "10px",
                    marginRight: 0,
                    marginBottom: 2,
                  }}
                >
                  <img src={Metawolf} style={{ marginRight: "10px" }} />{" "}
                  {props.addedValue ? (
                    <span> LP Token added in Metamask </span>
                  ) : (
                    <span>Add LP Token in Metamask </span>
                  )}
                </Button>
                {/* <Button
                  className="drakModalBtn"
                  onClick={props.click}
                  style={{
                    background: ButtonBg.myBackground,
                    border: "1px solid #80808057",
                    color: "white",
                    width: "150px",
                    height: 35,
                    borderRadius: "30px",
                  }}
                >
                  Cancel
                </Button> */}
              </div>
            </div>
          ) : // ) : props.error ? (
          //   <div>
          //     <div style={{ display: "flex", justifyContent: "center" }}>
          //       <div
          //         style={{
          //           display: "flex",
          //           flexDirection: "column",
          //           alignItems: "center",
          //           marginTop: 5,
          //         }}
          //       >
          //         <ErrorIcon style={{ fontSize: 75, color: "red" }} />
          //         <span style={{ fontWeight: 600, fontSize: 15 }}>
          //           {props.msg}
          //         </span>
          //       </div>
          //     </div>
          //     <div
          //       style={{
          //         marginTop: "26px",
          //         display: "flex",
          //         justifyContent: "center",
          //       }}
          //     >
          //       <Button
          //         style={{
          //           background: "white",
          //           border: "1px solid #80808057",
          //           color: "black",
          //           width: "150px",
          //           height: 35,
          //           borderRadius: "30px",
          //           marginRight: 13,
          //         }}
          //       >
          //         Back
          //       </Button>
          //       <Button
          //         onClick={props.click}
          //         style={{
          //           background: "white",
          //           border: "1px solid #80808057",
          //           color: "black",
          //           width: "150px",
          //           height: 35,
          //           borderRadius: "30px",
          //         }}
          //       >
          //         Cancel
          //       </Button>
          //     </div>
          //   </div>
          null}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AmmModal;
