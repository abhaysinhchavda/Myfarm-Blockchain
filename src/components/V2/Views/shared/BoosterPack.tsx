import React from "react";
import style from "styled-components";
// import RocketImage from "../../../../assets/images/BoosterPackRocket.png";
import background from "../../../../assets/V2/Images/APYback.png";
import rocketImg from "../../../../assets/V2/Images/rocket.png";
import cloudImg from "../../../../assets/V2/Images/cloud.png";

const BoosterCont = style.div`
width: 100%;
    border-radius: 10px;
    border: 1px solid #E0E0E0;
    position: relative;
    padding: 5px 15px;
    padding-top: 155px;
    margin-top: 80px;
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
`;
const Cloud = style.img`
position: absolute;
top: 25px;
width: 100%;
object-fit: contain;
`;
const Rocket = style.img`

position: absolute;
z-index: 9;
left: 37px;
top: -68px;

`;
const Details = style.div`
 width: 100%;
 display: flex;
 flex-direction: column;
 padding: 0px 10px;
 z-index: 99;
  
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

  
`;
const Amount = style.div`
 width: 65%;
 font-size: 20px;
 font-weight: 700;
 line-height: 25px;
 color: #4527A0;
  
`;
const Info = style.div`
 width: 100%;
 z-index: 99;
 padding: 0px 10px;
  
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
declare type BoosterPackProps = {
  percentage: string;
  amount: string;
};
function BoosterPack({ percentage, amount }: BoosterPackProps) {
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
            <Percentage>{percentage}</Percentage>
            <Amount> {amount} </Amount>
          </Summary>
        </Details>
        <Info>
          <InfoTitle>What is booster pack ?</InfoTitle>
          <InfoText>
            Ask CDCR San Quintin State Prison 2008. We installed Purex
            dispensers throughout the prison to combat diseases…
          </InfoText>
        </Info>
      </Header>
    </BoosterCont>
  );
}

export default BoosterPack;
