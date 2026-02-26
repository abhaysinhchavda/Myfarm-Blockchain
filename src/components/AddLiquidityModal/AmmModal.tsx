import Button from "@mui/material/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// import ErrorIcon from "@material-ui/icons/Error";
// import { PuffLoader } from "react-spinners";
import Style from "styled-components";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import React from "react";
import "./Modal.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextColor, ButtonBg } from "../../stylevariable";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@mui/material/CircularProgress";
import YellowAlert from "../../assets/images/others/yellowalert.png";
import Metawolf from "../../assets/images/others/metawolf.png";

const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            fontSize: "15px",
            borderRadius: "10px",
            color: "#FFF",
            fontWeight: "bold",

            width: "470px",
            height: "55px",
            lineHeight: "26px",
            fontFamily: "Inter",
            margin: "0px, auto",
            backgroundColor: "#673AB7",
          },
        },
      ],
    },
  },
});

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    spanText: {
      fontWeight: 500,
      fontSize: "20px",
      display: "flex",
      justifyContent: "center",
      marginTop: "5px",
      marginLeft: "15px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px !important",
        marginLeft: "0px",
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
      justifyContent: "space-between",
      display: "flex",
      alignItems: "center",
      fontSize: 20,
      fontWeight: 700,
      width: "100%",
    },

    continueButton: {
      margin: "20px 0",
      display: "flex",
      justifyContent: "center",
    },

    circularProgress: {
      margin: "20px",
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
const Content = Style.div`
width:100%;
`;
const ContentP = Style.p`
font-size: 14px;
font-family: 'Inter';
`;
const ContentElement = Style.div`
display: flex;
align-items: center;
justify-content: space-between;
`;
const ContentImage = Style.img`
width: 20px;
height: 20px;
`;
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
              ? "Confirm Supply"
              : props.transactionStatus === "submitted"
              ? "Transaction Submitted"
              : null}
            <IconButton
              onClick={props.close}
              style={{
                color: TextColor.textColor,
                fontWeight: 800,
                position: "relative",
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
                  <Content>
                    <ContentP>You will Receive</ContentP>
                    <ContentElement>
                      <ContentP>0.041515</ContentP>
                      <ContentElement>
                        <ContentImage
                          src="https://icons-for-free.com/iconfiles/png/512/eth+ethcoin+etherium+icon-1320162857971241492.png"
                          alt="eth"
                        />
                        <ContentP>USDT /</ContentP>
                        <ContentImage
                          src="https://www.iconpacks.net/icons/2/free-bitcoin-icon-2207-thumb.png"
                          alt="Btc"
                        />
                        <ContentP>ETH Pool Token</ContentP>
                      </ContentElement>
                    </ContentElement>
                    <Tolerence name={"ETH"} name2={"USDT"} title="Rates" />
                  </Content>
                )}
              </span>
              <div className={classe.continueButton}>
                <ThemeProvider theme={theme}>
                  <Button onClick={props.clickUnstake} variant="contained">
                    {"Confirm Supply"}
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          ) : props.loder ? (
            <div className="loder">
              <div className={classe.circularProgress}>
                <CircularProgress color="secondary" />
              </div>
              <div>Waiting for confirmation</div>
              <div>
                Supplying {props.value1} for {props.value2}
              </div>
            </div>
          ) : props.sucsess ? (
            <div style={{ margin: "20px" }}>
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
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AmmModal;

interface IsTolerence {
  name: string;
  name2: string;
  title: string;
}

const useStyles = makeStyles((theme) => ({
  dropdownBtn: {
    borderBottom: "1px solid #949494",
    borderRadius: 0,
    textTransform: "capitalize",
    width: 153,
    textAlign: "left",
    "&>.MuiButton-label": {
      display: "flex",
      justifyContent: "flex-start",
    },
  },
  TolerenceMainDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    fontWeight: 500,
    fontFamily: "Inter",
    fontSize: "14px",
    lineHeight: "21px",
    width: "95%",
  },
  TolerenceDetailDiv: {
    display: "flex",
    alignItems: "center",
  },
  inputtext: {
    width: 265,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  swapButton: {
    color: "#6338bc",
    fontSize: 20,
  },
}));
const DetailsFirst = Style.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  font-size: 14px;
  color: #6338bc;
  font-weight: 700;
    `;
const DetailsSecond = Style.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
    margin-bottom: 10px;
    `;

const Tolerence = ({ name, name2, title }: IsTolerence) => {
  const classes = useStyles();

  return (
    <div className={classes.TolerenceMainDiv}>
      {title}
      <DetailsFirst>
        <div>1379.20</div>
        <div>179.20</div>
        <div>0.03%</div>
      </DetailsFirst>
      <DetailsSecond>
        <div>
          {name} per {name2}
        </div>
        <div>
          {name2} per {name}
        </div>
        <div>Pool Share</div>
      </DetailsSecond>
    </div>
  );
};
