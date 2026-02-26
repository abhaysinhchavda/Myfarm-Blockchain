import React from "react";
import style from "styled-components";
import Divider from "@mui/material/Divider";
import styled from "styled-components";
import openSea from "../../../assets/V2/Images/openSea.png";

const StatkeWrapper = style.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px;
background:white;
margin-top:1rem;
width: 450px;
height: auto;
left: 241px;
top: 441px;
overflow: hidden;
border: 1px solid #D5D5D5;
box-sizing: border-box;
border-radius: 10px;
@media (max-width: 425px) {
  width: 100%;
  overflow: hidden;
  height: 100%;
}
`;
const Wrapper = style.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
width: 95%;
margin: 0 auto;
margin-bottom: 15px;
`;

const DividerLine = styled(Divider)`
  position: relative;
  top: -20px;
  width: 500px;
  left: -20px;
`;

const StakeHeading = style.h2`
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
position:relative;
top:-18px;
`;
const OpenSeaButton = style.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
width: 100%;
height: 55px;
color: #2081E2;
background: #fff;
border-radius: 10px;
cursor: pointer;
flex: none;
font-size: 15px;
font-weight: 600;
border: 1px solid;
font-family:inter;
`;
const OpenSeaLogo = style.img`
width: 20px;
margin: 0px 10px;
`;

const NFTimage = style.img`
width: 100%;
`;

interface Props {
  svgUrl: string;
  openseaUrl: string;
}
const NFTCard = ({ svgUrl, openseaUrl }: Props) => {
  return (
    <>
      <StatkeWrapper>
        <StakeHeading>My NFT Position</StakeHeading>
        <DividerLine />

        <Wrapper>
          <NFTimage src={svgUrl} alt="NFT" />
        </Wrapper>

        <OpenSeaButton onClick={() => (location.href = openseaUrl)}>
          <OpenSeaLogo src={openSea} alt="opensea logo" /> Sell On OpenSea
        </OpenSeaButton>
      </StatkeWrapper>
    </>
  );
};
export default NFTCard;
