import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height:'100%'
     
      
    },
  })
);

interface IsReferdWrapper {
  
  children: React.ReactNode;
}

export default function ReferedWrapper(props: IsReferdWrapper) {
  const classes = useStyles();

  return (
   
        <Paper className={classes.paper}>{props.children}</Paper>
    
  );
}
