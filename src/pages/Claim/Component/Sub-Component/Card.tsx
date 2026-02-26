import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) =>
  createStyles({
    HeaderVestingDetail: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      [theme.breakpoints.down('xs')]:{
        width:'135px',
        marginBottom:'1rem'
    },
      "&>:nth-child(1)": {
        color: "#5A5858",
        fontSize: 16,
        [theme.breakpoints.down('xs')]:{
          fontSize: 14,
      },
      },
      "&>:nth-child(2)": {
        color: "black",
        fontSize: 24,
      
      },
    },
  })
);
interface IsVesting {
  title: string;
  value: any;
}
const VestingCard = ({ title, value }: IsVesting) => {
  const classes = useStyles();
  return (
    <div className={classes.HeaderVestingDetail}>
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};
export default VestingCard;
