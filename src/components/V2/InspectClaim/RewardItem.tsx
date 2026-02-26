import React from "react";
import Tk1 from "../../../assets/V2/Images/MekerDai.png";
import metamask from "../../../assets/V2/Images/metamask.png";

import style from "styled-components";

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
function RewardItem() {
  const [approved, setApproved] = React.useState(false);
  return (
    <RewardsCont>
      <TokenNameImgCont>
        <TokenImg src={Tk1} alt="" />
        <TokenText>(DAI)</TokenText>
      </TokenNameImgCont>
      <TokenText>492</TokenText>
      {approved ? (
        <ViewStakeButtonApproved>Added To Metamask</ViewStakeButtonApproved>
      ) : (
        <ViewStakeButton onClick={() => setApproved(true)}>
          <MetamaskIcon src={metamask} alt="" />
          Add To Metamask
        </ViewStakeButton>
      )}
    </RewardsCont>
  );
}

export default RewardItem;
