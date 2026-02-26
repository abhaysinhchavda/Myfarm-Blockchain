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
                    fontSize: 18,
                },
             
            },
            "&>:nth-child(2)": {
                color: "black",
                fontSize: 24,
                [theme.breakpoints.down('xs')]:{
                    fontSize: 18,
                }
            },
        },
    })
);
interface IsAirDrop {
    title: string;
    value: any;
    TokenImage: any;
}
const AirDropCard = ({ title, TokenImage, value }: IsAirDrop) => {
    const classes = useStyles();
    return (
        <div className={classes.HeaderVestingDetail}>

            <span>{title}</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={TokenImage} width="18" style={{ marginRight: '5px' }} /> <span>{value}</span>
            </div>

        </div>
    );
};
export default AirDropCard;
