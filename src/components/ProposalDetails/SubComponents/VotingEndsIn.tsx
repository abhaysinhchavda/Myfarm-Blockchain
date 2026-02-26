import { makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import React from "react";


const useStyles = makeStyles((theme:Theme) => ({

    votingEndsIn: {
        display:"flex",
        marginLeft: "80%",
        marginTop: "-44px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#616161",
        [theme.breakpoints.down("md")]: {
            marginTop:"-45px"
        },
        [theme.breakpoints.down("xs")]: {
            display:"none",
            lineHeight:"12px"
        }
      },
      timer: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "24px",
        /* identical to box height, or 150% */
        alignItems: "center",
        textAlign: "right",
        letterSpacing: "0.15px",
        
        color: '#212121',
        display: "flex",
        marginLeft: "80%",
        marginTop: "0.5%",
        [theme.breakpoints.down("xs")]: {
            display:"none"
        }
      },

}));

interface VotingEndsInProps {
    votingEndsIn : any;
}

const VotingEndsIn = (props:VotingEndsInProps) => {
    const classes = useStyles();
return(
    <div>
    <div className={classes.votingEndsIn}>Voting Ends In</div>
    <div className={classes.timer}>{props.votingEndsIn}</div>
    </div>
)
}

export default VotingEndsIn;