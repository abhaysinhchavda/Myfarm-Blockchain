import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Wrapper from './Wrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent:'center',
    flexWrap: 'wrap',
    marginBottom:'28rem', 
    '& > *': {
      margin: theme.spacing(1),
      width: 515,
     
      justifyContent:'center',
      borderRadius:18
    },
  },
}));

interface Icard{
  children: React.ReactNode;
  showWrapper:boolean
}

export default function SimplePaper({children,showWrapper}:Icard) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{justifyContent:'center',display:'flex',width:'100%'}}>
      <Paper elevation={3} >
        {children}
       </Paper>
       {
         showWrapper?<Wrapper Recieved="38.72 Matic" Price="0.25%" Network="$120.00" Exchange="38.72 Matic"/>:null
       }
    </div>
  );
}
