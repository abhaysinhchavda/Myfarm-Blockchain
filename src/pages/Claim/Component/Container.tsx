import Grid from '@material-ui/core/Grid';
import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) =>
  createStyles({
    
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      boxShadow: 'none',
      border: '0.5px solid #CAB9E5',
      background: '#F8F4FF'
    },
    
  }),

);
interface IsMain{
    children:React.ReactNode
}
const Container = (props:IsMain) => {
    const classes = useStyles();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Paper className={classes.paper}>
                {
                    props.children
                }
            </Paper>
            </Grid>
        </Grid>
    )
}
export default Container