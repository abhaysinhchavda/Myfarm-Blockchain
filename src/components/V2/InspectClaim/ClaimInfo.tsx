import React from "react";
import style from "styled-components";
import tick from "../../../assets/V2/Detail/tick.svg";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
const TvlWrapper = style.div`
position: static;
height: 66px;
left: 20px;
top: 50px;
flex: none;
order: 0;
flex-grow: 0;

`;

const TokenWrapper = style.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
width: 80px;
left: 20px;
top: 25px;

`;

const TokenName = style.span`
position: static;
height: 24px;
left: 34px;
top: 50px;
font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
display: flex;
align-items: center;
color: #616161;
flex: none;
order: 1;
flex-grow: 0;

`;
const TokenPrice = style.div`
height: 24px;
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 24px;
display: flex;
align-items: center;
margin-top:1rem;
/* font/header */

color: #212121;
`;
const CohortCont = style.div`

display: flex;
width: 100%;
justify-content: space-evenly;
align-items: center;
margin-top: 40px;
flex-direction: column;

`;
const TopCont = style.div`

display: flex;
width: 100%;
justify-content: center;
gap: 10px;
align-items: center;
margin-bottom: 20px;
`;
const CohortInnerCont = style.div`
width: 100%;
display: flex;
    align-items: center;
    justify-content: space-between;
`;
const StatkeWrapper = style.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
background:white;
margin-top:1rem;
width: 500px;
height: 385px;
left: 241px;
top: 441px;
border: 1px solid #D5D5D5;
box-sizing: border-box;
border-radius: 10px;
`;
const Title = style.h4`
font-size: 15px;
font-weight: 600;
line-height: 26px;
margin-bottom: 0;
`;
const Message = style.h6`
margin: 5px;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 20px;
`;
const Link = style.a`

display: flex;
align-items: center;
margin: 0px 10px;
cursor: pointer;
gap: 10px;
`;

interface Props {
  farmIcon: string;
  farmName: string;
  cohortVersion: string;
  APY: number;
  tokenStaked: number;
  tokenStakedInUsd: number;
  unStakedOn: string;
  transactionUrl: string;
}

const ClaimInfo = ({
  farmIcon,
  farmName,
  cohortVersion,
  APY,
  tokenStaked,
  tokenStakedInUsd,
  unStakedOn,
  transactionUrl,
}: Props) => {
  return (
    <>
      <StatkeWrapper>
        <>
          <img src={tick} alt="img" />
          <Title>Congratulations</Title>
          <Message>You have successfully Staked</Message>
        </>
        <div
          style={{ marginTop: "-1.8rem", width: "100%", marginBottom: "1rem" }}
        >
          <CohortCont>
            <TopCont>
              <img src={farmIcon} width={65} />
              <TvlWrapper>
                <TokenWrapper>
                  <TokenName>{farmName}</TokenName>
                </TokenWrapper>
                <TokenPrice>{cohortVersion}</TokenPrice>
              </TvlWrapper>
            </TopCont>

            <CohortInnerCont>
              <TvlWrapper>
                <TokenWrapper>
                  <TokenName>APY</TokenName>
                </TokenWrapper>
                <TokenPrice>{APY}</TokenPrice>
              </TvlWrapper>
              <TvlWrapper>
                <TokenWrapper>
                  <TokenName># of Token</TokenName>
                </TokenWrapper>
                <TokenPrice>{tokenStaked}</TokenPrice>
              </TvlWrapper>
              <TvlWrapper>
                <TokenWrapper>
                  <TokenName>$ of Token</TokenName>
                </TokenWrapper>
                <TokenPrice>${tokenStakedInUsd}</TokenPrice>
              </TvlWrapper>
              <TvlWrapper>
                <TokenWrapper>
                  <TokenName>Unstaked On</TokenName>
                </TokenWrapper>
                <TokenPrice>{unStakedOn}</TokenPrice>
              </TvlWrapper>
            </CohortInnerCont>
          </CohortCont>
        </div>
        <Link href={transactionUrl}>
          <OpenInNewIcon style={{ color: "#616161" }} />
          View in Explorer{" "}
        </Link>
      </StatkeWrapper>
    </>
  );
};
export default ClaimInfo;
