import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    maindiv: {
      display: "flex",
      flexDirection: "column",
     
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "1.5rem",
      height: 111,
      color: "#401395",
     
      "&:hover": {
        cursor: "pointer",
        // background: "#4013951a",
        // boxShadow: "rgb(74 74 104 / 10%) 0px 2px 2px -1px inset",
        // borderRadius: 10,
        // border: "1px solid #40139552",
      },
      [theme.breakpoints.down("xs")]: {
        width: 123,
      },
    },
    span:{
      marginTop: "0.5rem",
      fontSize:12
    }
  })
);

interface IsWallet {
  image: string;
  imageWidth: number;
  name: string;
}

export default function Wallet({ image, imageWidth, name }: IsWallet) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.maindiv}>
        <img src={image} width={imageWidth} />
        <span className={classes.span}>{name}</span>
      </div>
    </div>
  );
}
