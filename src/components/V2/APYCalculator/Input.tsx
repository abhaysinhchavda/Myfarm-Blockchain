import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import { createStyles, makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles(() =>
  createStyles({
    textField: {
      width: "95%",
      fontSize: "14px",
      flex: "0.5",
      "&>.css-1480iag-MuiInputBase-root-MuiInput-root": {
        margin: "20px 0px",
        paddingBottom: "5px",
        fontSize: "14px",
      },
    },  
  })
);

interface IsInput{
 farmTokenIcon: string
 numberOfTokens: number
numberOfTokensInUSD: number
inputHandler: (e) => void
}
const TokenInput=({farmTokenIcon,numberOfTokens,numberOfTokensInUSD,inputHandler}:IsInput)=> {
  const classe = useStyle();

  return (
    <div>
      <TextField
      className={classe.textField}
      id="input-with-icon-textfield"
      label="Token to Stake"
      value={numberOfTokens}
      onChange={inputHandler}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <img src={farmTokenIcon} width={28} alt="imgd" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="start">${numberOfTokensInUSD}</InputAdornment>
        ),
      }}
      variant="standard"
    />
    </div>
  );
}

export default TokenInput;
