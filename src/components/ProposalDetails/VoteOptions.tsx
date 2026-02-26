import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@material-ui/core";
import { ClipLoader } from "react-spinners";
import SuccessMessage from "./SuccessMessage";

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

interface VoteOptionsProps {
  status: any;
  detailsData: DetailsData;
}

const VoteOptions = (props: VoteOptionsProps) => {
  const [loading, setLoading] = React.useState(false);
  const [approval, setApproval] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    setLoading(false);
    setApproval(true);
    setOpen(true);
  };

  const handleClick2 = () => {
    setLoading(true);
    setLoading(false);
    setApproval(true);
  };

  const handleCallback = () => {
    setOpen(false);
  };

  const useStyles = makeStyles((theme) => ({
    paperClass: {
      width: "440px",
      height: "298px",
      marginLeft: "9%",
      boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.1)",
      marginTop: props.status === "Scheduled" ? "-40%" : "-10%",
      [theme.breakpoints.down(1200)]: {
        marginTop: "20px",
        marginLeft: "8px",
        width: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        marginLeft: "0px",
      },
    },
    castVote: {
      width: "159px",
      height: "24px",
      position: "relative",
      left: "16px",
      top: "15px",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "19px",
      lineHeight: "24px",
      letterSpacing: "0.15px",

      color: "#212121",
    },
    Divider: {
      position: "relative",
      top: "30px",
    },
    votingPower: {
      display: "flex",
      top: "40px",
      left: "-120px",
    },
    voteButton: {
      position: "relative",
      top: props.status === "Passed" ? "160px" : "60px",
      width: "95%",
      height: "55px",
      boxShadow: "0px 7px 18px -2px rgba(103, 58, 183, 0.56)",
      color: approval ? "white" : "white",
      backgroundColor: approval ? "green" : "#673AB7",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#673AB7",
      },
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "26px",
      [theme.breakpoints.down(1200)]: {
        top: "190px",
        width: "95%",
      },
    },
    voteButton2: {
      position: "relative",
      top: "135px",
      width: "400px",
      height: "55px",
      color: approval ? "white" : "white",
      backgroundColor: approval ? "green" : "#673AB7",
      boxShadow: "0px 7px 18px -2px rgba(103, 58, 183, 0.56)",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#673AB7",
      },
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "26px",
      [theme.breakpoints.down(1200)]: {
        width: "95%",
      },
    },
    voteButton3: {
      position: "relative",
      top: "135px",
      width: "400px",
      height: "55px",
      color: approval ? "#A9A9A9" : "white",
      boxShadow: "0px 7px 18px -2px rgba(103, 58, 183, 0.56)",
      backgroundColor: approval ? "grey" : "#673AB7",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#673AB7",
      },
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "26px",
      [theme.breakpoints.down(1200)]: {
        width: "95%",
      },
    },
    voteSuccessful: {
      color: "white",
    },
    ProposalPassed: {
      position: "relative",
      top: "80px",
      left: "40px",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "150%",
      width: 356,
      height: 42,
      color: "#000000",
      [theme.breakpoints.down("xs")]: {
        left: "-0px",
        fontSize: "12px",
        top: "90px",
      },
    },
    ProposalFailed: {
      position: "relative",
      top: "80px",
      left: "40px",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "150%",
      width: 356,
      height: 42,
      color: "#000000",
      [theme.breakpoints.down(1200)]: {
        left: "31%",
        fontSize: "14px",
        top: "80px",
      },
      [theme.breakpoints.down("xs")]: {
        left: "40px",
        fontSize: "14px",
        top: "90px",
      },
    },
    imgname: {
      position: "relative",
      top: "110px",
      left: "-10px",
    },
    rewardsClaimed: {
      color: "white",
    },
    imgname1: {
      position: "relative",
      top: "80px",
      left: "-1%",
    },
    votes: {
      [theme.breakpoints.down(1200)]: {
        position: "absolute",
        left: "190px",
      },
    },
  }));

  const [value, setValue] = React.useState("For");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const classes = useStyles();
  return (
    <Grid item xs={12} lg={4}>
      <Paper className={classes.paperClass}>
        <div className={classes.castVote}>Cast Your Vote</div>
        <Divider className={classes.Divider} />

        {props.status === "Passed" ? (
          <div>
            <div className={classes.ProposalPassed}>
              {" "}
              Congratulations! The proposal has been passed and you have
              recieved the following rewards:{" "}
            </div>
            <div className={classes.imgname}>
              <img src={props.detailsData.RewardsImage} />{" "}
              <span style={{ position: "relative", top: "-5px" }}>
                {props.detailsData.totalRewards}{" "}
              </span>
            </div>
          </div>
        ) : props.status === "Failed" ? (
          <div>
            <div className={classes.ProposalFailed}>
              {" "}
              The proposal has failed
            </div>
            <div className={classes.imgname1}>
              <img src={props.detailsData.RewardsImage} />{" "}
              <span style={{ position: "relative", top: "-5px" }}>
                {props.detailsData.totalRewards}{" "}
              </span>
            </div>
          </div>
        ) : (
          <div className={classes.votes}>
            <FormControl component="fieldset" className={classes.votingPower}>
              <RadioGroup
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="For"
                  control={<Radio color="secondary" />}
                  label="For"
                  sx={{ marginBottom: "5px" }}
                />
                <FormControlLabel
                  value="Against"
                  control={<Radio color="secondary" />}
                  label="Against"
                  sx={{ marginBottom: "5px" }}
                />
                <FormControlLabel
                  value="Abstain"
                  control={<Radio color="secondary" />}
                  label="Abstain"
                  sx={{ marginBottom: "5px" }}
                />
              </RadioGroup>
            </FormControl>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "19px",
          }}
        >
          {props.status === "Passed" ? (
            <Button
              className={classes.voteButton2}
              onClick={handleClick}
              disabled={approval}
            >
              {loading === true ? (
                <div>
                  <ClipLoader color="white" size={20} />
                  &nbsp; Claim Rewards
                </div>
              ) : approval === true ? (
                <div className={classes.rewardsClaimed}>
                  {" "}
                  Rewards claimed on DD/MM/YY
                </div>
              ) : (
                <div>Claim Rewards</div>
              )}
            </Button>
          ) : props.status === "Failed" ? (
            <Button
              className={classes.voteButton3}
              onClick={handleClick2}
              disabled={approval}
            >
              {loading === true ? (
                <div>
                  <ClipLoader color="white" size={20} />
                  &nbsp; Claim Refund
                </div>
              ) : approval === true ? (
                <div className={classes.rewardsClaimed}>
                  {" "}
                  Refund claimed on DD/MM/YY
                </div>
              ) : (
                <div>Claim Refund</div>
              )}
            </Button>
          ) : (
            <Button
              className={classes.voteButton}
              onClick={handleClick}
              disabled={approval}
            >
              {loading === true ? (
                <div>
                  <ClipLoader color="white" size={20} />
                  &nbsp; Vote
                </div>
              ) : approval === true ? (
                <div className={classes.voteSuccessful}>Voting Successful</div>
              ) : (
                <div>Vote</div>
              )}
            </Button>
          )}
        </div>

        <SuccessMessage open={open} parentCallback={handleCallback} />
      </Paper>
    </Grid>
  );
};

export default VoteOptions;
