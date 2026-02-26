import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { styled as muiStyled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@material-ui/core";
import { useScreenContext } from "../../../contexts/ScreenContext";
import Divider from "@material-ui/core/Divider";
import StakedBalance from "../SharedComponents/StakedBalance";
import { roundValue } from "../../../utilities";
import _ from "lodash";
import styled from "styled-components";
import UnstakeModal from "../../UnstakeModal";
import {
  useClosePopup,
  usePopupStatus,
} from "../../../store/application/hooks";
import { PopUpTypes } from "../../../store/application/reducer";
import useUnstake from "../../../hooks/useUnstake";
import { ClipLoader } from "react-spinners";

const UnstakeButton = styled(Button)<{ isUnstaked: boolean }>`
  background: #6338bc;
  color: ${(props) => (props.isUnstaked ? "black" : "white")};
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  border-radius: 10px;
  width: 100%;
  &:hover {
    background: #6338bc;
  }
`;

const Item = muiStyled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  borderRadius: 10,
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-between",
  boxShadow:
    "0 0 0.5px rgba(6, 10, 13, 0.4), 0 8px 16px rgba(113, 121, 128, 0.08)",
}));

const useStyles = makeStyles((theme) => ({
  secondSpan: {
    marginLeft: "1.5rem",
    display: "flex",
    alignItems: "center",
  },
  secondDivider: {
    width: 90,
    marginTop: "-10px",
    marginBottom: "15px",
    height: 2,
  },
  firstDivider: {
    width: 60,
    marginTop: "-10px",
    marginBottom: "15px",
    height: 2,
  },
  firstSpan: {
    display: "flex",
    fontSize: 18,
    marginTop: "-1rem",
    marginBottom: "1rem",
    textTransform: "none",
    color: "black",
  },
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  paperMy: {
    [theme.breakpoints.down("xs")]: {
      padding: "26px !important",
    },
  },
  imageDiv: {
    width: 117,
    marginTop: "1rem",
  },
  stake: {
    [theme.breakpoints.down("xs")]: {
      boxShadow: "none",
      border: "1px solid #DFDFDF",
      background: "#F8F4FF !important",
      padding: "26px !important",
    },
  },
  stakedBalance: {
    width: "100%",
    textAlign: "left",
    height: 40,
    paddingLeft: 0,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      border: "1px solid #DFDFDF",
      marginLeft: "0rem",
      marginBottom: "1.5rem",
      height: 50,
      paddingRight: 11,
    },
  },
  stakedOn: {},
  stakedOnDate: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "32px !important",
    },
  },
  stakedBalance1: {
    width: "100%",
    textAlign: "left",
    marginTop: "0.8rem",
    marginBottom: "0.8rem",
    borderRadius: "10px",
    color: "black",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      border: "1px solid #DFDFDF",
      marginLeft: "0rem",
      marginBottom: "1.5rem",
      height: "50px",
      paddingLeft: 11,
      heigth: 50,
      paddingRight: 11,
    },
  },
  StakeBtn: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: 9,
      display: "flex",
      alignItems: "center",
    },
  },
  stakeBalance: {
    color: "grey",
    cursor: "pointer",
    textAlign: "right",
    display: "flex",
    width: "100%",
    marginTop: "0.5rem",
    lineHeight: "36px",
    borderRadius: 10,
    border: "unset",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  maxBalance: {
    color: "grey",
    textAlign: "right",
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "0.5rem",
    marginBottom: "-5px",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  UnstakeMainModal: {
    position: "relative",
    width: 387,
    height: 70,
    left: 0,
    top: 72,

    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "22px",
    lineHeight: "33px",
    textAlign: "center",
    color: "#2E2E2E",
    [theme.breakpoints.down("xs")]: {
      left: -34,
    },
  },
  UnstakeImageModal: {
    position: "relative",
    top: 122,
    left: 112,
    [theme.breakpoints.down("xs")]: {
      left: 77,
    },
  },
  unstakeCloseBtn: {
    position: "relative",
    top: "-172px",
    left: "221px",
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("xs")]: {
      left: 156,
    },
  },
  UnstakeBtnModal: {
    position: "relative",
    width: 405,
    height: 44,
    left: -17,
    top: 170,
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
    "&:hover": {
      backgroundColor: "#6338BC",
    },
    [theme.breakpoints.down("xs")]: {
      width: 340,
      left: -14,
    },
  },
  ModalRoot: {
    "&>.MuiBox-root": {
      [theme.breakpoints.down("xs")]: {
        width: "100% !important",
      },
    },
  },
  ModalMainImage: {
    position: "relative",
    top: 38,
    left: 114,
    [theme.breakpoints.down("xs")]: {
      left: 113,
    },
  },
  ModalHead: {
    position: "absolute",
    top: 51,
    left: 190,
    width: 53,
    height: 27,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 550,
    fontSize: "22px",
    lineHeight: "29px",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      left: "196px !important",
    },
  },
  ModalSecondaryText: {
    position: "absolute",
    top: 85,
    left: 192,
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
    position: "absolute",
    top: 113,
    left: 22,
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
      fontSize: "25px",
      left: -11,
    },
  },
  ModalImage: {
    position: "absolute",
    top: 163,
    left: 173,
    [theme.breakpoints.down("xs")]: {
      left: 153,
    },
  },
  ModalImageText: {
    position: "absolute",
    top: 298,
    left: 25,
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
      left: -1,
    },
  },
  ModalButton: {
    position: "absolute",
    top: 365,
    left: 120,
    width: 214.19,
    height: 30.48,
    backgroundColor: "#6338BC",
    borderRadius: "15px",
    color: "white",
    textTransform: "none",
    [theme.breakpoints.down("xs")]: {
      left: 75,
    },
  },
  closeIcone: {
    position: "absolute",
    top: 14,
    left: 407,
    [theme.breakpoints.down("xs")]: {
      top: 16,
      left: 340,
    },
  },
  ModalShareIcon: {
    position: "absolute",
    top: 408,
    left: 144.3,
    [theme.breakpoints.down("xs")]: {
      left: 101.3,
    },
  },
  TokenInputDiv: {
    display: "flex",
    flexDirection: "column",
  },
  TokenInputImageDiv: {
    display: "flex",
    width: "100%",
    marginTop: "1rem",
  },
  TokenImageDiv: {
    background: "#CCCCCC",
    padding: 1,
    width: "50px",
    borderRadius: "10px 1px 1px 10px",
  },
  TokenImage: {
    width: 25,
    marginTop: 5,
  },
  TokenInput: {
    width: "100%",
    borderLeft: 0,
    borderRight: "1px solid",
    borderTop: "1px solid",
    borderBottom: "1px solid",
    borderRadius: "0px 10px 10px 0px",
    borderColor: "grey",
    height: 38,
  },
}));

export default function UnstakeActionCard(): JSX.Element {
  const classes = useStyles();

  const { farm, stakeDetails } = useScreenContext();

  const { farmDetails, farmEndTime, locking } = farm;

  const now = Math.floor(new Date().getTime() / 1000);
  const isLocking = locking > 0 ? true : false;

  const open = usePopupStatus(PopUpTypes.UNSTAKE);
  const close = useClosePopup();

  const cohortAddress =
    farm.proxyAddress === null
      ? farm.cohortDetails.cohortId
      : farm.proxyAddress;

  const { status, unStake } = useUnstake(cohortAddress, stakeDetails.stakeId);

  return (
    <>
      <Grid item xs={12} lg={6}>
        <Item className={classes.stake}>
          <div style={{ width: "100%" }}>
            <span className={classes.firstSpan}>UNSTAKE</span>

            <Divider className={classes.secondDivider} />

            <StakedBalance
              stakedInToken={roundValue(stakeDetails?.stakedAmount, 2)}
              stakedInUsd={_.multiply(
                roundValue(stakeDetails?.stakedAmount, 2),
                farmDetails.price
              )}
            />

            {isLocking ? (
              <>
                <UnstakeButton
                  disabled={status.completed || farmEndTime > now}
                  isUnstaked={false}
                  onClick={() => unStake()}
                  style={{ boxShadow: "0 8px 16px rgb(99 56 188 / 13%)" }}
                >
                  {status.loading && <ClipLoader size={20} color="white" />}{" "}
                  Unstake And Claim Reward
                </UnstakeButton>
              </>
            ) : (
              <>
                <UnstakeButton
                  disabled={status.completed}
                  isUnstaked={false}
                  onClick={() => unStake()}
                  style={{ boxShadow: "0 8px 16px rgb(99 56 188 / 13%)" }}
                >
                  {status.loading && <ClipLoader size={20} color="white" />}{" "}
                  Unstake And Claim Reward
                </UnstakeButton>
              </>
            )}
          </div>
        </Item>
      </Grid>
      <UnstakeModal isOpen={open} close={close} />
    </>
  );
}
