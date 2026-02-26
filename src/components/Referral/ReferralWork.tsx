import React from "react";
import Breadcrumb from "../PageHeader/index";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import People from "../../assets/images/others/people.png";
import Twitter1 from "../../assets/images/others/twitter1.png";
import Telegram1 from "../../assets/images/others/telegram1.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Wealth from "../../assets/images/others/wealth.png";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Illustration from "../../assets/images/others/Illustration.png";
import Copier from "../../assets/images/others/copier.png";
import { createStyles, Theme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      "& .MuiTableCell-root": {
        borderLeft: "1px solid rgba(224, 224, 224, 1)",
      },
    },

    header: {
      "& .MuiTableCell-root": {
        backgroundColor: "#F5F0FF",
      },
    },

    totalReferredFriendsBox: {
      width: "301px",
      height: "88px",
      display: "flex",
      backgroundColor: "#FFFFFF",
      borderRadius: "10px",
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
      zIndex: 2,
      borderLeftStyle: "solid",
      borderLeftColor: "#6338BC",
      borderLeftWidth: "11px",
      marginLeft: "0px",
      marginTop: "10px",
      [theme.breakpoints.down("xs")]: {
        width: "327px",
        height: "70px",
        marginTop: "0rem !important",
      },
    },

    totalReferredFriendsText: {
      display: "flex",
      marginLeft: "25px",
      width: "161px",
      height: "49px",
      color: "#777777",
      alignItems: "center",
      textAlign: "center",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "15px",
      lineHeight: "25px",
      [theme.breakpoints.down("xs")]: {
        marginTop: "-5px",
      },
    },

    totalReferredFriends: {
      position: "relative",
      top: "50px",
      left: "-160px",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "20px",
      lineHeight: "25px",
      color: "#000000",
      [theme.breakpoints.down("xs")]: {
        top: "40px",
      },
    },

    refImage: {
      marginTop: "60px",
      marginLeft: "42px",
      marginRight: "5px",
      [theme.breakpoints.down("xs")]: {
        marginTop: "45px",
        marginLeft: "68px",
      },
    },

    rewardsBox: {
      width: "301px",
      height: "88px",
      display: "flex",
      backgroundColor: "#FFFFFF",
      borderRadius: "10px",
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
      zIndex: 2,
      borderLeftStyle: "solid",
      borderLeftColor: "#6338BC",
      borderLeftWidth: "11px",
      marginLeft: "0px",
      marginTop: "10px",

      [theme.breakpoints.down("xs")]: {
        width: "327px",
        height: "70px",
      },
    },

    rewardsText: {
      display: "flex",
      marginLeft: "25px",
      width: "161px",
      height: "49px",
      color: "#777777",
      alignItems: "center",
      textAlign: "center",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "15px",
      lineHeight: "25px",
      marginTop: "0px",
      [theme.breakpoints.down("xs")]: {
        marginTop: "-5px",
      },
    },

    rewardsUsdValue: {
      position: "relative",
      top: "50px",
      left: "-80px",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "20px",
      lineHeight: "25px",
      color: "#000000",
      [theme.breakpoints.down("xs")]: {
        left: "-87px",
        top: "40px",
      },
    },

    rewardsImage: {
      marginTop: "60px",
      marginLeft: "5px",
      marginRight: "5px",
      [theme.breakpoints.down("xs")]: {
        marginTop: "45px",
      },
    },

    referralLinkBox: {
      width: "861px",
      height: "185px",
      marginLeft: "320px",
      marginTop: "-186px",
      borderRadius: "10px",
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
      borderLeftStyle: "solid",
      borderLeftColor: "#6338BC",
      borderLeftWidth: "11px",
      [theme.breakpoints.down("xs")]: {
        marginLeft: "0px",
        marginTop: "10px",
        width: "327px",
        height: "127px",
      },
    },

    referralLinkText: {
      width: "624px",
      position: "relative",
      top: "20px",
      left: "-20px",

      [theme.breakpoints.down("xs")]: {
        display: "none",
        width: "0px",
        height: "0px",
        position: "none",
        visibility: "hidden",
      },
    },

    copyLinkButton: {
      width: "159px",
      height: "45px",
      marginRight: "-110px",
      marginLeft: "5px",
      marginTop: "25px",
      color: "white",
      backgroundColor: "#6338BC",
      textTransform: "none",
      borderRadius: "15px",
      [theme.breakpoints.down("xs")]: {
        width: "293px",
        height: "35px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "15px",
        marginLeft: "-32px",
        marginTop: "20px",
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: "#6338BC",
        },
      },
      "&:hover": {
        backgroundColor: "#6338BC",
      },
    },

    copyLinkImage: {
      width: "20px",
      height: "20px",
      marginRight: "10px",
      [theme.breakpoints.down("xs")]: {
        width: "14px",
        height: "14px",
      },
    },

    twitter: {
      position: "relative",
      top: "120px",
      left: "-570px",

      [theme.breakpoints.down("xs")]: {
        top: "85px",
        left: "-40px",
        width: "38px",
        height: "38px",
      },
    },

    telegram: {
      position: "relative",
      top: "120px",
      left: "-530px",

      [theme.breakpoints.down("xs")]: {
        top: "85px",
        left: "-20px",
        width: "38px",
        height: "38px",
      },
    },

    sharing: {
      marginLeft: "-700px",
      marginTop: "60px",

      [theme.breakpoints.down("xs")]: {
        marginLeft: "-120px",
        marginTop: "30px",
      },
    },
  })
);

interface Rewards1 {
  Imageofrwd: string;
  Qty: number;
}

interface Rows1 {
  index: number;
  address: string;
  cohort: string;
  rewards: Rewards1[];
  claimedOn: string;
}

interface ReferralProps {
  totalReferredFriends: number;
  rewardsUSDValue: string;
  linkAddress: string;
  arrayOfRows: Rows1[];
}

const ReferralWork = (props: ReferralProps) => {
  const classes = useStyles();
  const theme1 = useTheme();
  const Mobile = useMediaQuery(theme1.breakpoints.down("xs"));

  return (
    <div>
      <Breadcrumb
        title="Refer and Earn"
        content="Invite friends and earn additional staking rewards when your friends stake"
        hasShowSwitch={false}
      />

      <Grid container>
        <Grid item xs={12}>
          <div className={classes.totalReferredFriendsBox}>
            <div className={classes.totalReferredFriendsText}>
              Total Referred Friends
            </div>
            <span className={classes.totalReferredFriends}>
              {props.totalReferredFriends}
            </span>
            <img
              src={People}
              width="43px"
              height="20px"
              className={classes.refImage}
            />
          </div>

          <div className={classes.rewardsBox}>
            <span className={classes.rewardsText}>Rewards</span>

            <span className={classes.rewardsUsdValue}>
              ~{props.rewardsUSDValue}&nbsp;USDT
            </span>
            <img
              src={Wealth}
              width="43px"
              height="20px"
              className={classes.rewardsImage}
            />
          </div>

          <div className={classes.referralLinkBox}>
            <FormControl
              className={classes.referralLinkText}
              variant="outlined"
            >
              <OutlinedInput
                id="outlined-adornment-weight"
                value={props.linkAddress.slice(0, 10) + "...."}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
            <Button className={classes.copyLinkButton}>
              <img src={Copier} className={classes.copyLinkImage} />
              Copy Link
            </Button>
            <img src={Twitter1} className={classes.twitter} />
            <img src={Telegram1} className={classes.telegram} />
            <div className={classes.sharing}>Share With</div>
          </div>

          {Mobile ? (
            <TableContainer
              style={{ marginTop: "20px", width: "328px" }}
              component={Paper}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow className={classes.header}>
                    <TableCell align="left">Address</TableCell>
                    <TableCell align="right">Claimed On&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                {props.arrayOfRows.length === 0 ? (
                  <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <img
                      src={Illustration}
                      style={{
                        position: "relative",
                        left: "50px",
                        width: 166,
                        height: 170,
                        top: "12px",
                      }}
                    />
                    <br />
                    <br />
                    <div style={{ position: "relative", right: "-60px" }}>
                      No Rewards found. Refer Friends to Earn
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                ) : (
                  <TableBody>
                    {props.arrayOfRows.map((row) => (
                      <TableRow key={row.index}>
                        <TableCell align="left">
                          {row.address.slice(0, 20)}...
                        </TableCell>
                        <TableCell align="right">{row.claimedOn}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          ) : (
            <TableContainer
              style={{ marginTop: "20px", width: "1181px" }}
              component={Paper}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow className={classes.header}>
                    <TableCell align="left">Address</TableCell>
                    <TableCell align="left">Cohort</TableCell>
                    <TableCell align="left">Rewards&nbsp;</TableCell>
                    <TableCell align="right">Claimed On&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                {props.arrayOfRows.length === 0 ? (
                  <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <img
                      src={Illustration}
                      style={{
                        position: "relative",
                        left: "290px",
                        width: 166,
                        height: 170,
                        top: "12px",
                      }}
                    />
                    <br />
                    <br />
                    <div style={{ position: "relative", right: "-300px" }}>
                      No Rewards found. Refer Friends to Earn
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                ) : (
                  <TableBody>
                    {props.arrayOfRows.map((row) => (
                      <TableRow key={row.index}>
                        <TableCell align="left">{row.address}</TableCell>
                        <TableCell align="left">{row.cohort}</TableCell>
                        <TableCell align="left">
                          {row.rewards.map((items, index) => {
                            return (
                              <span key={index}>
                                {" "}
                                <img
                                  src={items.Imageofrwd}
                                  width="20px"
                                  height="20px"
                                />
                                <span
                                  style={{
                                    top: "15px",
                                    position: "relative",
                                    left: "-14px",
                                  }}
                                >
                                  {items.Qty}
                                </span>
                              </span>
                            );
                          })}
                        </TableCell>
                        <TableCell align="right">{row.claimedOn}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ReferralWork;
