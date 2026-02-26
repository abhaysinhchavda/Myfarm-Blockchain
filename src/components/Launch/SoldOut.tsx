import React from "react";
import style from "styled-components";
import SoldIcon from "../../assets/images/sold.png";
import { Button, makeStyles } from "@material-ui/core";
import RewardSnackbar from '../Snackbar/RewardSnackBar'
const PalceWrapper = style.div`
width: 454px;
height: 302px;
margin:0 auto;
margin-top:2.5rem;
background: #FFFFFF;
border-radius: 15px;
@media (max-width: 425px) {
  width: 100%;

}
`;

const ContainWrapper = style.div`
display:flex;
flex-direction:column;
align-items:center;
padding:30px;
`;
const BoldText = style.b`
margin-top:10px;
margin-bottom:10px;
`;
const DetailContent = style.span`
margin-bottom:15px;
color: #212121;
`;
const LinkWrapper = style.div`
display:flex;
align-items:center;
justify-content:center;

`;

const useStyles = makeStyles((theme) => ({
  soldOutButton:{
    width: "402px",
    height: "55px",
    left: "0px",
    top: "0px",
    color:' #616161',
    textTransform:'capitalize',
    background: "#EFEFEF;",
    borderRadius: "10px",
    flex: "none",
    order: 0,
    flexGrow: 0,
    margin: "0px 10px",
    [theme.breakpoints.down('xs')]:{
        width: "100%", 
    },
    "&:hover": {
        background:"#EFEFEF;",
    }
   }
}));
const SoldOut = ({ sellTokenName }: { sellTokenName: string }) => {
  const classes = useStyles();
  const [open,setOpen]=React.useState(false)
  return (
    <>
      <PalceWrapper>
        <ContainWrapper>
          <img src={SoldIcon} alt="Sold Out" />
          <BoldText>Oh snap!</BoldText>
          <DetailContent>You’re late</DetailContent>
          <span style={{ color: "#212121" }}>
            We’re sold out of {sellTokenName} Tokens
          </span>
        </ContainWrapper>
        <LinkWrapper>
          <Button className={classes.soldOutButton} disabled>Sold Out</Button>
        </LinkWrapper>
      </PalceWrapper>
      <RewardSnackbar
      open={open}
      message="You are eligible for IDO"
      severity="success"
      handleClose={()=>setOpen(false)}
      
      />
    </>
  );
};
export default SoldOut;
