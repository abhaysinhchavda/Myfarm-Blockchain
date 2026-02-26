import React from "react";
import style from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";
const MainWrapper = style.div`
width: 454px;
height: 210px;
margin:0 auto;
margin-top:1rem;
/* background/main */
padding:20px;
background: #FFFFFF;
border-radius: 15px;
@media (max-width: 425px) {
  width: 100%;

}
`;
const DetailWraper = style.div`
display:flex;
justify-content:space-between
`;
const MainTextWrapper = style.div`
display:flex;
flex-direction:column
`;
const MainText = style.span`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 35px;
color: #212121;
text-align:left
`;
const DetailText = style.span`
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 35px;
color: #616161;
text-align:right;

`;
const ProgresDiv = style.div`
margin-top:7px;
`;
interface ProjectDetailProps {
  startTime: string;
  endTime: string;
  totalInvestors: number;
  purchaseCap: number;
  totalRaisedPercentage: number;
}

const ProjectDetail = ({
  startTime,
  endTime,
  totalInvestors,
  purchaseCap,
  totalRaisedPercentage,
}: ProjectDetailProps) => {
  return (
    <MainWrapper>
      <DetailWraper>
        <MainTextWrapper>
          <MainText>Start Time</MainText>
          <MainText>End Time</MainText>
          <MainText>Total Investors</MainText>
          <MainText>Purchase Cap</MainText>
          <MainText>Pool Filled</MainText>
        </MainTextWrapper>
        <MainTextWrapper>
          <DetailText>{startTime}</DetailText>
          <DetailText>{endTime}</DetailText>
          <DetailText>{totalInvestors}</DetailText>
          <DetailText>{purchaseCap}</DetailText>
          <ProgresDiv>
            {" "}
            <ProgressBar completed={totalRaisedPercentage} bgColor="#009F42" />
          </ProgresDiv>
        </MainTextWrapper>
      </DetailWraper>
    </MainWrapper>
  );
};
export default ProjectDetail;
