import React from "react";
import style from "styled-components";
import Divider from "@mui/material/Divider";
import styled from "styled-components";
import background from "../../../assets/V2/Images/APYback.png";
import rocketImg from "../../../assets/V2/Images/rocket.png";
import cloudImg from "../../../assets/V2/Images/cloud.png";
import ApyCalculator from "../APYCalculator";
const RewardWrapper = style.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px 0px;
margin-top:1rem;
width: 450px;
left: 243px;
top: 751px;
background:white;
border: 1px solid #D5D5D5;
box-sizing: border-box;
border-radius: 10px;
overflow: hidden;
@media (max-width: 425px) {
  width: 100%;
}
`;
const TitleWraper = style.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 20px;
width: 264px;
height: 24px;
flex: none;
order: 0;
flex-grow: 0;
margin: 12px 0px;
`;
const Title1 = style.span`
position: static;
width: 300px;
height: 24px;
left: calc(50% - 264px/2);
top: calc(50% - 24px/2);
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
display: flex;
align-items: center;
color: #212121;
flex: none;
order: 0;
flex-grow: 0;
margin-top: -0.7rem;

`;

const BoosterCont = style.div`
width: 100%;
    border-radius: 10px;
    position: relative;
    padding: 5px 15px;
    padding-top: 155px;
    margin-top: 35px;
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
height: 80%;
border-radius: 10px;
object-fit: cover;
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
    left: 50px;
    top: -24px;
    height: 124px;
}

`;

const Info = style.div`
 width: 100%;
 z-index: 99;
 padding: 0px ;
 display: flex;
align-items: center;
justify-content: space-between;
`;

const InfoText = style.p`
 width: 50%;
 text-align: left;
 font-size: 14px;
 font-weight: 400;
 color: #000;
`;
const Bold = style.span`
font-weight: 700;

`;

const DividerLine = styled(Divider)`
  width: 100%;
`;
interface Props {
  isUserBoosted: boolean;
  boostedAPY: number;
}

const BoosterAd = ({ isUserBoosted, boostedAPY }: Props) => {



  return (
    <>
      <RewardWrapper>
        <TitleWraper>
          <Title1>Want to earn more rewards?</Title1>
        </TitleWraper>
        <DividerLine />
        <BoosterCont>
          <Recommended>Recommended</Recommended>
          <Header>
            <Background src={background} alt="img" />
            <Cloud src={cloudImg} alt="img" />
            <Rocket src={rocketImg} alt="img" />

            {isUserBoosted ? (
              <Info>
                <InfoText style={{ width: "100%" }}>
                  You have already purchased the booster pack
                </InfoText>
              </Info>
            ) : (
              <Info>
                <InfoText>
                  Earn rewards upto <Bold>{boostedAPY}%</Bold> by purchasing a
                  booster pack for this staking position.
                </InfoText>
                <ApyCalculator
                />
              </Info>
            )}
          </Header>
        </BoosterCont>
      </RewardWrapper>
    </>
  );
};
export default BoosterAd;