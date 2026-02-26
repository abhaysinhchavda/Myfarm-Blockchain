import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) =>
  createStyles({
    VestingClaim: {
      background: "#6338BC",
      padding: "5px 27px",
      color: "white",
      borderRadius: 10,

      "&:hover": {
        background: "#6338BC",
      },
    },
    buttonDiv:{
      [theme.breakpoints.down('xs')]:{
        display:'flex',
        justifyContent:'center',
        width:'100%',
        marginTop:'1.5rem'
      }
    }
  })
);
interface IsClaim {
  climed: () => void;
}
const ClaimButton = (props: IsClaim) => {
  const classes = useStyles();
  return (
    <div className={classes.buttonDiv}>
      <Button className={classes.VestingClaim} onClick={props.climed}>
        claim
      </Button>
    </div>
  );
};
export default ClaimButton;
