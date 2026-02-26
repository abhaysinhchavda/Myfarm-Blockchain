import React from 'react'
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
interface NextButtonProps {
    onClick: () => void
}
const useStyles = makeStyles((theme) => ({
    buttonRoot: {
        width: 57, height: 57, color: 'white',
         [theme.breakpoints.down('xs')]:{
          marginLeft:'2rem !important'
         },
        "&:hover": {
            background: "#6338BC !important",
            color: 'white',
          },
    }
}));
const NexButton = ({ onClick }: NextButtonProps) => {
    const classes = useStyles()
    return (
        <>
            <IconButton className={classes.buttonRoot}
                onClick={onClick}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </>
    )
}
export default NexButton