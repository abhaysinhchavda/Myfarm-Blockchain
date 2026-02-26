import React from "react";
import style from "styled-components";
// import RocketImage from "../../../../assets/images/BoosterPackRocket.png";
import background from "../../../assets/V2/Images/APYback.png";
import rocketImg from "../../../assets/V2/Images/rocket.png";
import cloudImg from "../../../assets/V2/Images/cloud.png";
import stakeCoins from "../../../assets/V2/Images/stakeImg.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const BoosterCont = style.div`
width: 100%;
    border-radius: 10px;
    border: 1px solid #E0E0E0;
    position: relative;
    padding: 5px 15px;
    padding-top: 155px;
    margin-top: 80px;
    @media (max-width: 425px) {
        width: 100%;
        border-radius: 10px;
        border: 1px solid #E0E0E0;
        position: relative;
        padding: 5px 15px;
        padding-top: 100px;
        margin-top: 50px;
        margin-bottom: 20px;
      }
    
`;
const Recommended = style.div`
position: absolute;
top: 0px;
right: 0px;
padding: 5px 15px;
background: #c4c4c4ad;
border-top-right-radius: 10px;
border-bottom-left-radius: 10px;
font-size: 12px;
font-weight: 500;
color: white;
z-index: 99;;

  
`;
const Header = style.div`
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: space-between;
 display: flex;
    flex-direction: column;
    top: 0;
  
`;
const Background = style.img`
width: 100%;
    position: absolute;
    top: 0px;
    height: 50%;
    border-radius: 10px;
    @media (max-width: 425px) {
        width: 100%;
    position: absolute;
    top: 0px;
    height: 75%;
    border-radius: 10px;
    }
`;
const Cloud = style.img`
position: absolute;
top: 25px;
width: 100%;
object-fit: contain;
@media (max-width: 425px) {
    height: 70%;
    top: 25px;
    width: 100%;
    object-fit: revert;
}
`;
const Rocket = style.img`

position: absolute;
z-index: 9;
left: 37px;
top: -68px;

@media (max-width: 425px) {
    position: absolute;
    width: 56px;
    z-index: 9;
    left: 18px;
    top: -33px;
}

`;
const Details = style.div`
 width: 100%;
 display: flex;
 flex-direction: column;
 padding: 0px 10px;
 z-index: 99;
  
 @media (max-width: 425px) {

 padding-bottom: 10px;
 }
`;

const Summary = style.div`
width: 100%;
display: flex;
justify-content: space-between;

  
`;
const Percentage = style.div`
font-size: 20px;
font-weight: 700;
line-height: 25px;
color: #4527A0;
@media (max-width: 425px) {
    width: auto;
    color: #212121;
font-size: 16px;
 
}
  
`;
const Amount = style.div`
 width: 65%;
 font-size: 20px;
 font-weight: 700;
 line-height: 25px;
 color: #4527A0;
 @media (max-width: 425px) {
    width: auto;
    color: #212121;
font-size: 16px;
 
}
  
`;
const Info = style.div`
 width: 100%;
 z-index: 99;
 padding: 0px 10px;
@media (max-width: 425px) {
display: none;
}
  
`;
const InfoTitle = style.h1`
 width: 100%;
 text-align: left;
 font-weight: 700;
 font-size: 20px;
 line-height: 25px;
 margin: 25px 0px;
  
`;
const InfoText = style.p`
 width: 100%;
 text-align: left;
 font-size: 14px;
 font-weight: 400;
 color: #000;
  
`;
const CurrentAPYdetails = style.div`
display: flex;
    align-items: baseline;
`;
const CurrentAPYtitle = style.h1`
margin: 15px 0px;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    color: #616161;
    margin: 0;
`;

const CurrentAPYpercentage = style.div`
font-size: 16px;
font-weight: 600;
color: #616161;
margin: 0px 10px;
`;
const CurrentAPYdiv = style.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-evenly;

@media (max-width: 425px) {
    margin-top: 30px;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    padding-left: 25%;
    margin-bottom: 15px;
  }

`;
const StakeCoinsImg = style.img`
height: 40px;
position: absolute;
    left: 35px;
`;
const MoreDetails = style.div`
display: none;
@media (max-width: 425px) {
display: flex;
margin: 10px auto;
align-items: center;
color: #212121;
font-size: 14px;
cursor: pointer;
z-index: 99;
}
`;

declare type Props = {
  aggregatedRewardBooster: number;
  aggregatedRewardWithoutBooster: number;
  APY: string;
  BoostedAPY: string;
  BoosterShow: boolean;
};
const BoosterPack = ({
  aggregatedRewardBooster,
  aggregatedRewardWithoutBooster,
  APY,
  BoostedAPY,
  BoosterShow,
}: Props) => {
  const BoostCount = () => {
    if (BoosterShow) {
      return (
        <BoosterCont>
          <Recommended>Recommended</Recommended>
          <Header>
            {/* <img src={RocketImage} alt="Rocket" width={70} /> */}
            <Background src={background} alt="img" />
            <Cloud src={cloudImg} alt="img" />
            <Rocket src={rocketImg} alt="img" />

            <Details>
              <Summary>
                <Percentage>{aggregatedRewardBooster}%</Percentage>
                <Amount> {aggregatedRewardWithoutBooster}% </Amount>
              </Summary>
            </Details>
            <Info>
              <InfoTitle>What is booster pack ?</InfoTitle>
              <InfoText>
                Ask CDCR San Quintin State Prison 2008. We installed Purex
                dispensers throughout the prison to combat diseases…
              </InfoText>
            </Info>
            <MoreDetails>
              More Details <KeyboardArrowDownIcon />{" "}
            </MoreDetails>
          </Header>
        </BoosterCont>
      )
    }
  }
  return (
    <>
      <CurrentAPYdiv>
        <StakeCoinsImg src={stakeCoins} />
        <CurrentAPYdetails>
          <CurrentAPYtitle>Current APY</CurrentAPYtitle>
          <CurrentAPYpercentage>{APY}%</CurrentAPYpercentage>
        </CurrentAPYdetails>
        <CurrentAPYdetails>
          <CurrentAPYtitle>Value</CurrentAPYtitle>
          <CurrentAPYpercentage>{BoostedAPY}%</CurrentAPYpercentage>
        </CurrentAPYdetails>
      </CurrentAPYdiv>
      {BoostCount()}
    </>
  );
};

export default BoosterPack;
