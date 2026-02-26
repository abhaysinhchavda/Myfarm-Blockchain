import React from "react";
import { useScreenContext } from "../../../contexts/ScreenContext";
import { useApproval } from "../../../hooks/useApproval";
import {
  useUserStakingBalance,
  useUserTokenBalance,
} from "../../../hooks/useMiscellaneous";
import { useStake } from "../../../hooks/useStake";
import { getMaxStakingAvailable, roundValue } from "../../../utilities";
import Balance from "../SharedComponents/Balance";
// import MaxStakingAvailable from "../SharedComponents/MaxStakingAvailable";
import StakeInput from "../SharedComponents/StakeInput";
import { ClipLoader } from "react-spinners";
import _ from "lodash";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import StakeModal from "../../StakeModal";
import Grid from "@material-ui/core/Grid";
import { styled as muiStyled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Divider } from "@material-ui/core";
import StakedBalance from "../SharedComponents/StakedBalance";
import { useDeriveStakeInputAmount } from "../../../store/application/hooks";

const InsufficientBalanceButton = styled(Button)`
  background: #ffa6a6;
  color: white !important;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-transform: none;
  box-shadow: 0 8px 16px rgb(99 56 188 / 13%);
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
  StakeBtn: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: 9,
      display: "flex",
      alignItems: "center",
    },
  },
  stake: {
    [theme.breakpoints.down("xs")]: {
      boxShadow: "none",
      border: "1px solid #DFDFDF",
      background: "#F8F4FF !important",
      padding: "26px !important",
    },
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
  StakeButton: {},
}));

export default function StakeActionCard(): JSX.Element {
  const { farm } = useScreenContext();

  const { tokenDetails, cohortDetails, farmDetails } = farm;

  const userTokenBalance = useUserTokenBalance(
    tokenDetails.tokenId,
    tokenDetails.decimals
  );

  const userStakedBalance = useUserStakingBalance(
    cohortDetails.cohortId,
    tokenDetails.tokenId,
    tokenDetails.decimals
  );

  const classes = useStyles();

  const { loading, triggeredApproval, approval } = useApproval(
    cohortDetails.cohortId,
    tokenDetails.tokenId,
    tokenDetails.decimals
  );

  const stakeAmount = useDeriveStakeInputAmount();
  //const farm = useFarmFilter(cohortId, tokenId);

  //const [Token, setToken] = useState("");
  /* _.subtract(
      unitFormatter("0", sorting?.decimals),
      parseStakingBalance
    ); */

  /* const TokenOnchange = (e) => {
      if (e.target.value > userTokenBalance) {
        setTextError({
          ...TextErrors,
          Error: true,
          Msg: "Insufficient Balance",
        });
      } else if (e.target.value < 0) {
        setTextError({ ...TextErrors, Error: true, Msg: "Enter Valid Input" });
      } else if (e.target.value == userTokenBalance) {
        setTextError({
          ...TextErrors,
          Error: true,
          Msg: "Staking Limit Reached",
        });
        setToken(e.target.value);
      } else {
        setToken(e.target.value);
        setTextError({ ...TextErrors, Error: false });
      }
    }; */

  /*  const Allow = () => {
    if (Token === "") {
      setTextError({ ...TextErrors, Error: true, Msg: "No Error State" });
    } else {
      triggeredApproval(parseInt(Token));
    }
  }; */

  const maxStakingAvailable = getMaxStakingAvailable(
    tokenDetails.userMaxStake,
    userStakedBalance
  );

  const { onMaxButton, onStake, transactionStatus, inputError } = useStake(
    cohortDetails.cohortId,
    tokenDetails.tokenId,
    tokenDetails.decimals,
    maxStakingAvailable,
    userTokenBalance
  );

  return (
    <React.Fragment>
      <Grid item xs={12} lg={6}>
        <Item className={classes.stake}>
          <div style={{ width: "100%" }}>
            <span className={classes.firstSpan}>Stake</span>
            <Divider className={classes.firstDivider} />

            <StakedBalance
              stakedInToken={userStakedBalance}
              stakedInUsd={_.multiply(
                roundValue(userStakedBalance, 2),
                farmDetails.price
              )}
            />
            <Balance
              balanceInTokens={roundValue(userTokenBalance, 4)}
              balanceInUsd={roundValue(
                _.multiply(userTokenBalance, farmDetails?.price),
                2
              )}
              maxButtonHandler={() => onMaxButton()}
            />
            <StakeInput
              stakeTokenLogo={farmDetails.icon}
              userStakedAmount={userStakedBalance}
            >
              <div style={{ textAlign: "left" }}>
                {inputError ? (
                  <span style={{ textAlign: "left", color: "#ff0000f0" }}>
                    {inputError}
                  </span>
                ) : null}
              </div>
            </StakeInput>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
              }}
            >
              {inputError ? (
                <InsufficientBalanceButton disabled>
                  {inputError}
                </InsufficientBalanceButton>
              ) : (
                <Button
                  style={{
                    background: approval ? "#ECFFEB" : "#6338BC",
                    color: approval ? "black" : "white",
                    marginBottom: "1rem",
                    marginTop: "1.5rem",
                    borderRadius: "10px",
                    textTransform: "none",
                    display: approval ? "none" : "block",
                    boxShadow: "0 8px 16px rgb(99 56 188 / 13%)",
                  }}
                  onClick={() => {
                    if (approval) return null;
                    triggeredApproval(tokenDetails.userMaxStake);
                  }}
                  disabled={approval}
                >
                  {loading ? (
                    <div className={classes.StakeBtn}>
                      <ClipLoader color="white" size={20} />
                      &nbsp; Allow UniFarm to use your Token
                    </div>
                  ) : approval ? (
                    "Approved"
                  ) : (
                    "Allow UniFarm to use your Token"
                  )}
                </Button>
              )}

              <Button
                style={{
                  background: !approval || Boolean(inputError) || !stakeAmount ? "#CCCCCC" : "#6338BC",
                  color: !approval ? "black" : "white",
                  borderRadius: "10px",
                  textTransform: "none",
                  boxShadow: "0 8px 16px rgb(99 56 188 / 13%)",
                }}
                disabled={Boolean(inputError) || !stakeAmount || !approval}
                onClick={() => onStake()}
              >
                {transactionStatus.loading ? (
                  <div style={{ display: "flex", marginRight: "1rem" }}>
                    {" "}
                    <ClipLoader color="white" size={20} />
                    <span style={{ marginLeft: "0.5rem" }}>Stake</span>
                  </div>
                ) : (
                  "Stake"
                )}
              </Button>
            </div>
            <StakeModal
              stakeTokenIcon={farmDetails?.icon}
              stakeTokenName={farmDetails.name}
              cohortVersion={cohortDetails.cohortVersion}
            />
          </div>
        </Item>
      </Grid>
    </React.Fragment>
  );
}
