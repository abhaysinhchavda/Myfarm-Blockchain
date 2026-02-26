import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  inputtext: {
    width: 265,
    [theme.breakpoints.down('xs')]:{
      width:'100%'
    }
  },
  Box:{
    minWidth:120,
    [theme.breakpoints.down('xs')]:{
      width:'100%'
    }
  }
   
}));
interface IsInput{
  value:any;
  onChange:()=>void;
}
const InputField = (props:IsInput) => {
  const classes=useStyles()
  return (
    <Box className={classes.Box}>
      <TextField
        id="standard-basic"
        value={props.value}
        variant="standard"
        className={classes.inputtext}
        onChange={props.onChange}
      />
    </Box>
  );
};
export default InputField;
