import React from "react";
import TextField from "@material-ui/core/TextField";
// import AccountCircle from '@material-ui/icons/AccountCircle';
import { useScreenContext } from "../../../contexts/ScreenContext";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import {
  useChangeStakeInput,
  useDeriveStakeInputAmount,
} from "../../../store/application/hooks";
import MaxStakingAvailable from "./MaxStakingAvailable";
import { getMaxStakingAvailable, roundValue } from "../../../utilities";

const useStyles = makeStyles((theme) => ({
  TokenInputDiv: {
    display: "flex",
    flexDirection: "column",
  },
  TokenInputImageDiv: {
    display: "flex",
    width: "100%",
    marginTop: "1rem",
    flexDirection: "column",
  },
  TokenImageDiv: {
    background: "#CCCCCC",
    padding: 1,
    width: "50px",
    borderRadius: "10px 1px 1px 10px",
  },
  TokenImage: {
    width: 25,
    // marginTop: -3,
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
  TextField: {
    "&>.MuiInputBase-root": {
      borderRadius: 10,
    },
    "&>.MuiInputBase-root .MuiInputAdornment-positionStart": {
      width: "14%",
      marginLeft: "-13px",
      display: "flex",
      justifyContent: "center",
      marginRight: 8,
      background: "#CCCCCC",
      borderRadius: "10px 1px 1px 10px",
      maxHeight: "100px",
      height: 41,
      [theme.breakpoints.down("xs")]: {
        width: "27%",
      },
    },
  },
}));
interface StakeTokenInputProps {
  stakeTokenLogo: string;
  userStakedAmount: number;
  children: React.ReactNode;
}

export default function StakeInput({
  stakeTokenLogo,
  userStakedAmount,
  children,
}: StakeTokenInputProps): JSX.Element {
  const classes = useStyles();

  const onStakeInputChange = useChangeStakeInput();
  const { farm } = useScreenContext();
  const { tokenDetails, farmDetails } = farm;

  const maxStakingAvailable = getMaxStakingAvailable(
    tokenDetails.userMaxStake,
    userStakedAmount
  );

  const stakeValue = useDeriveStakeInputAmount();

  return (
    <div className={classes.TokenInputDiv}>
      <div className={classes.TokenInputImageDiv}>
        <TextField
          variant="outlined"
          id="number"
          type="number"
          placeholder="Enter an amount"
          className={classes.TextField}
          value={!stakeValue ? "" : stakeValue}
          size="small"
          onChange={(e) => onStakeInputChange(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={stakeTokenLogo}
                  className={classes.TokenImage}
                  alt="stake-token-logo"
                />
              </InputAdornment>
            ),
          }}
          fullWidth
        />

        <MaxStakingAvailable
          availableValue={roundValue(maxStakingAvailable, 2)}
          tokenSymbol={farmDetails.symbol}
          click={() => onStakeInputChange(roundValue(maxStakingAvailable, 2))}
        />
        {/* <div className={classes.TokenImageDiv}>
          <img
            src={stakeTokenLogo}
            className={classes.TokenImage}
            alt="stake-token-logo"
          />
        </div> */}

        {/* <input
          id="number"
          type="number"
          placeholder="Enter an amount"
          defaultValue={String(stakeValue) || ""}
          onChange={(e) => {
            return onStakeInputChange(Number(e.target.value));
          }}
          className={classes.TokenInput}
        /> */}
      </div>
      {children}
    </div>
  );
}
