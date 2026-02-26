import React from "react";
import Tk1 from "../../../../../assets/V2/Images/MekerDai.png";
import metamask from "../../../../../assets/V2/Images/metamask.png";
import {useTheme,useMediaQuery} from '@material-ui/core'
import ClipLoader from "react-spinners/ClipLoader";
import style from "styled-components";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const ViewStakeButton = style.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 15px;
text-transform: capitalize;
font-size: 15px;
font-weight: 600;
height: 45px;
cursor: pointer;
border:none;
color:#673AB7;
background: #FFF;
border: 1px solid;
border-radius: 10px;
 width: 240px;
 margin-top: 0px;
 @media (max-width: 425px) {
  width: auto;
  padding-left: 20px;
 }

`;

const ViewStakeButtonApproved = style.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 15px;
text-transform: capitalize;
font-size: 15px;
font-weight: 600;
height: 45px;
cursor: pointer;
border:none;
color:#009F42;
background: #FFF;
border: 1px solid;
border-radius: 10px;
 width: 240px;
 margin-top: 0px;
 @media (max-width: 425px) {
  width: auto;
 
 }
`;

const RewardsCont = style.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
`;
const TokenImg = style.img`
width: 45px;
height: 45px;
margin-right: 5px;

`;
const MetamaskIcon = style.img`
width: 20px;
height: 20px;
margin-right: 5px;

`;
const TokenNameImgCont = style.div`
display: flex;
align-items: center;
justify-content: space-between;

`;
const TokenText = style.h2`
font-size: 18px;
font-weight: 600;
color: #616161;
`;
interface IsProps{
  shareHandler:()=>void
  transactionUrl:string
  approved:boolean
  isLoading:boolean
}
function RewardItem({shareHandler,transactionUrl,approved,isLoading}:IsProps) {
 
  const theme=useTheme()
  const Mobile=useMediaQuery(theme.breakpoints.down('xs'))

 
  return (
    <RewardsCont>
      {console.log(transactionUrl)}
      <TokenNameImgCont>
        <TokenImg src={Tk1} alt="" />
        <TokenText>(DAI)</TokenText>
      </TokenNameImgCont>
      &nbsp;&nbsp;
      <TokenText>492</TokenText>
      &nbsp;
      {approved ? (
        Mobile? <ViewStakeButtonApproved><CheckCircleOutlineIcon/></ViewStakeButtonApproved>:
        <ViewStakeButtonApproved>Added To Metamask</ViewStakeButtonApproved>
      )
         
          : (
            Mobile?
            <ViewStakeButton onClick={shareHandler}> 
              {
                isLoading ?<div style={{marginRight:'0.2rem'}}><ClipLoader size={20} color="#673AB7"/></div>:  <MetamaskIcon src={metamask} alt="" />
              }
            </ViewStakeButton>
            :
            <ViewStakeButton onClick={shareHandler}>
              {
                isLoading ?<div style={{marginRight:'0.2rem'}}><ClipLoader size={20} color="#673AB7"/></div>:  <MetamaskIcon src={metamask} alt="" />
              }
            
            Added To Metamask
            </ViewStakeButton>
          )}
    </RewardsCont>
  );
}

export default RewardItem;
