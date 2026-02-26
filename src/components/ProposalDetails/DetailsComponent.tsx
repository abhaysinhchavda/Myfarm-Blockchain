import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import styled from "styled-components";
// import { styled } from "@mui/material/styles";
import { Dialog, makeStyles } from "@material-ui/core";
import Styled from "styled-components";
import Divider from "@mui/material/Divider";
import TokenstoBeWhitelisted from "./SubComponents/TokenstobeWhitelisted";
import Copy from "../../assets/images/others/copy2.png";
import TotalRewards from "./SubComponents/TotalRewards";
import VotingEndsIn from "./SubComponents/VotingEndsIn";
import { Theme } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export interface State extends SnackbarOrigin {
  open1: boolean;
}

interface ArrayObject {
  proposal: any;
  status: any;
  pollFor: any;
  pollAgainst: any;
  totalVotesNumber: any;
  totalVotesAddress: any;
  ImageofRwd: any;
  startsIn: any;
}

interface Addresses {
  tokenName: any;
  tokenAddress: any;
}

interface DetailsData {
  name: any;
  proposedBy: any;
  tokenstoBeWhitelisted: any;
  imageOfToken: any;
  RewardsImage: any;
  totalRewards: any;
  votingEndsIn: any;
  addresses: Addresses[];
}

interface DetailsComponentProps {
  detailsData: DetailsData;
  arrayObject: ArrayObject;
  createdPageOrNot: any;
}

const ProposalStatusContainer = Styled.div<{
  status: string;
}>`
width:92px;
height:32px;
border-radius:16px;
text-align:center;
padding:5px;
margin-left:82%;
margin-top:1%;
background-color :  ${(props) =>
  props.status === "Voting Live"
    ? "#E2E3FF"
    : props.status === "Scheduled"
    ? "#F5F5F5"
    : props.status === "Passed"
    ? "#E5F9EE"
    : props.status === "Cancelled"
    ? "#FCEDE5"
    : props.status === "Failed"
    ? "#FFE7E5"
    : null};
color : ${(props) =>
  props.status === "Voting Live"
    ? "#6338BC"
    : props.status === "Scheduled"
    ? "#616161"
    : props.status === "Passed"
    ? "#00C853"
    : props.status === "Cancelled"
    ? "#FFC107"
    : props.status === "Failed"
    ? "#C62828"
    : null};

font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.16px;

@media screen and (max-width: 992px) {
      margin-left: 70%;
};

@media screen and (max-width: 600px) {
  margin-left: 71%;
}
`;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DetailsComponent = (props: DetailsComponentProps) => {
  const [state, setState] = React.useState<State>({
    open1: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open1 } = state;

  const [cancelProposal, setCancelProposal] = React.useState(
    props.createdPageOrNot
  );
  const theme1 = useTheme();
  const Mobile = useMediaQuery(theme1.breakpoints.down("xs"));
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const useStyles = makeStyles((theme: Theme) => ({
    titleName: {
      position: "relative",
      width: "382px",
      height: "24px",
      left: "16px",
      top: "16px",
      textAlign: "left",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: "24px",

      letterSpacing: "0.15px",

      color: "#212121",
      [theme.breakpoints.down("xs")]: {},
    },
    proposedBy: {
      width: "331px",
      height: "20px",
      position: "relative",
      top: "36px",
      left: cancelProposal ? "-7px" : "-60px",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "143%",
      /* identical to box height, or 20px */

      letterSpacing: "0.15px",

      color: "#616161",
      [theme.breakpoints.down("xs")]: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "13px",
        lineHeight: "143%",
        letterSpacing: "0.15px",
        left: "-67px",
      },
    },
    paperClass: {
      width: "628px",
      height: "324px",
      boxShadow: "inset 0px -1px 0px rgba(0, 0, 0, 0.15)",
      borderRadius: "10px 10px 10px 10px",
      marginTop: "20px",
      marginLeft: "10px",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        marginTop: "0rem !important",
        marginLeft: "-0px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    dividerClass: {
      position: "relative",
      top: "15px",
    },

    rewards: {
      display: "flex",
      marginLeft: "40%",
      marginTop: "-7%",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "17px",
      color: "#616161",
    },
    rewardToken: {
      display: "flex",
      marginLeft: "40%",
      marginTop: "1.1%",
    },
    rewardName: {
      display: "flex",
      marginTop: "-3px",
      marginLeft: "3px",
    },
    votingEndsIn: {
      display: "flex",
      marginLeft: "80%",
      marginTop: "-6.5%",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "17px",
      color: "#616161",
    },
    timer: {
      display: "flex",
      marginLeft: "80%",
      marginTop: "0.5%",
    },
    contractAddress: {
      display: "flex",
      marginLeft: "16px",
      marginTop: "25px",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "17px",
      color: "#616161",
      [theme.breakpoints.down("md")]: {
        marginTop: "25px",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "55px",
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: "35px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "13px",
        lineHeight: "15px",
        /* identical to box height */

        color: "#616161",
      },
    },
    tokenRow: {
      display: "flex",
      marginLeft: "19px",
      marginTop: "10px",
    },
    tokenAddress: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "24px",
      letterSpacing: "0.15px",

      color: "#212121",
      marginLeft: "50px",
      [theme.breakpoints.down("xs")]: {
        marginLeft: "20px",
        marginTop: "1px",
      },
    },
    imager: {
      marginLeft: "30px",
      marginTop: "1px",
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
      },
    },
    tokenName: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "15px",
      lineHeight: "24px",
      letterSpacing: "0.15px",

      color: "#212121",
      [theme.breakpoints.down("xs")]: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "24px",

        color: "rgba(0, 0, 0, 0.87)",
      },
    },
    cancelProposal: {
      position: "relative",
      left: "25px",
      color: "red",
      cursor: "pointer",
    },
    colorOfButton: {
      color: "#6338BC",
    },
  }));

  const classes = useStyles();

  const cancellingProposal = () => {
    if (
      props.arrayObject.status === "Voting Live" ||
      props.arrayObject.status === "Cancelled"
    ) {
      setState({ open1: true, vertical: "top", horizontal: "right" });
    } else {
      setCancelProposal(false);
      setOpen(true);
    }
  };

  const handleClose1 = () => {
    setState({ ...state, open1: false });
  };

  const handleClose = () => {
    setOpen(false);
    setCancelProposal(true);
  };

  const handleClose2 = () => {
    setOpen2(true);
    setOpen(false);
    setCancelProposal(false);
  };

  const handleClose3 = () => {
    setOpen2(false);
  };

  return (
    <Grid item lg={6} sm={12} xs={12}>
      <Paper className={classes.paperClass}>
        <div className={classes.titleName}>{props.detailsData.name}</div>
        <div className={classes.proposedBy}>
          Proposed By :- {props.detailsData.proposedBy}
          <span>
            {cancelProposal ? (
              <a
                className={classes.cancelProposal}
                onClick={cancellingProposal}
              >
                Cancel Proposal
              </a>
            ) : (
              ""
            )}
          </span>
        </div>

        <ProposalStatusContainer status={props.arrayObject.status}>
          {props.arrayObject.status}
        </ProposalStatusContainer>
        <Divider className={classes.dividerClass} />

        <TokenstoBeWhitelisted
          tokenName={props.detailsData.tokenstoBeWhitelisted}
          imageOfToken={props.detailsData.imageOfToken}
        />

        <TotalRewards
          image={props.detailsData.RewardsImage}
          rewards={props.detailsData.totalRewards}
        />

        <VotingEndsIn votingEndsIn={props.detailsData.votingEndsIn} />

        <div className={classes.contractAddress}>Contract Address</div>
        {props.detailsData.addresses.map((items, index) => {
          return (
            <div key={index} className={classes.tokenRow}>
              <span className={classes.tokenName}>{items.tokenName} </span>
              {Mobile ? (
                <span className={classes.tokenAddress}>
                  {items.tokenAddress.slice(0, 5)}...
                  {items.tokenAddress.slice(40, 42)}
                </span>
              ) : (
                <span className={classes.tokenAddress}>
                  {" "}
                  {items.tokenAddress}
                </span>
              )}

              <span className={classes.imager}>
                <img src={Copy} />
              </span>
            </div>
          );
        })}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            id="responsive-dialog-title"
            sx={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "160%",
              letterSpacing: "0.15px",
              color: "rgba(0, 0, 0, 0.87)",
            }}
          >
            Cancel Proposal
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "16px",
                lineHeight: "150%",
                letterSpacing: "0.15px",
                color: "rgba(0, 0, 0, 0.87)",
              }}
            >
              If you want to cancel the proposal, users won&apos;t be able to
              vote.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} sx={{ color: "#6338BC" }}>
              Go back
            </Button>
            <Button onClick={handleClose2} autoFocus sx={{ color: "#6338BC" }}>
              Cancel Proposal
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open1}
          onClose={handleClose1}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose1} severity="error" sx={{ width: "35%" }}>
            Proposal cannot be cancelled after its live!
          </Alert>
        </Snackbar>

        <Snackbar
          open={open2}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={2000}
        >
          <Alert severity="success" onClose={handleClose3}>
            Proposal Cancelled Successfully
          </Alert>
        </Snackbar>
      </Paper>
    </Grid>
  );
};

export default DetailsComponent;
