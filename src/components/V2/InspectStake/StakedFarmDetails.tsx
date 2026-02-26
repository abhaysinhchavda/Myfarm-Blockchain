import React from "react";
import Styled from "styled-components";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import InfoIcon from "@material-ui/icons/Info";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useHistory } from "react-router-dom";
import UnstakeModal from "../../../components/V2/Modals/UnStakeModal/ConfirmUnStaking/index";

const HeaderWrapper = Styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 25px 20px;
background:white;
margin-top:1.5rem;
width: 100%;
height: 117px;
/* font/disabled */
border: 1px solid #E0E0E0;
box-sizing: border-box;
border-radius: 10px;
justify-content:space-between;

@media (max-width: 425px) {
  overflow-x: scroll;
  overflow-y: hidden;
  gap: 16px;
  flex-direction: column;
  height: 210px;

}
`;
const InfoCont = Styled.div`
display: flex;
justify-content: space-between;
flex:0.9;
@media (max-width: 425px) {
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
}
`;

const StakeButton = Styled.button`
display: flex;
    flex-direction: row;
    -webkit-box-pack: center;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 193px;
    height: 55px;
    color: #fff;
    background: #673AB7;
    box-shadow: 0px 7px 18px -2px rgb(103 58 183 / 56%);
    border-radius: 10px;
    cursor: pointer;
    flex: none;
    font-size: 15px;
    font-weight: 600;
    border: 1px solid #673AB7;
    margin: 0px 15px;
    font-family:inter;
    :disabled{
      background: #EFEFEF;
      box-shadow: none;
      border-color: #EFEFEF;
      color: #616161;
    }
    @media (max-width: 425px) {
      width: 135px;
    }
`;
const ButtonsCont = Styled.div`
display: flex;
@media (max-width: 425px) {
  width: 100%;
  align-items: center;
  justify-content: space-between;

}


`;
const Wrapper = Styled.div`
display:flex;
align-items:center
`;
const IconeWrapper = Styled.div`
display:flex;
align-items:flex-start;
margin-bottom: 1rem;
margin-top: -1.5rem;
margin-left: 1rem;

@media (max-width: 425px) {
  margin-top:0.5rem;
}
`;
const ContentWrapper = Styled.div`
 display:flex;
 align-items:flex-start;
 flex-direction:column;
 margin-left:0.5rem
`;
const VersionWrapper = Styled.span`
margin-bottom:0.9rem;
color:#616161;
font-size:14px;
font-weight:400;
margin-left:0.6rem;
font-family: Inter;
font-style: normal;
font-weight: normal;
line-height: 24px;
`;
const TokenName = Styled.span`
color:#212121;
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
margin-left: 10px;
`;

const TvlWrapper = Styled.div`
position: static;
height: 66px;
left: 20px;
top: 25px;
flex: none;
order: 0;
flex-grow: 0;

`;

const TokenWrapper = Styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
width: 80px;
height: 24px;
left: 20px;
top: 25px;
@media (max-width: 425px) {
  width:155px;
}
`;

const TokenNameHeader = Styled.span`
position: static;
height: 24px;
left: 34px;
top: 0px;
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
const TokenPrice = Styled.div`
height: 24px;
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
display: flex;
align-items: center;
margin-top:1rem;
/* font/header */

color: #212121;
`;

interface IsCohort {
  TokenUrl: any;
  Version: any;
  Name: any;
  isUnstaked: boolean;
}
const StakedFarmDetails = ({
  TokenUrl,
  Version,
  Name,
  isUnstaked,
}: IsCohort) => {
  const history = useHistory();

  return (
    <>
      <IconeWrapper>
        <IconButton onClick={() => history.push("/v2/stakes")}>
          <ArrowBackIosIcon />
        </IconButton>
      </IconeWrapper>
      <Wrapper>
        <img src={TokenUrl} width={65} />
        <ContentWrapper>
          <VersionWrapper>
            {Version.toString().slice(0, 9)}
            {Version.toString().length > 9 ? (
              <>
                ...
                <Tippy theme="light" placement="top" content={Version}>
                  <InfoIcon
                    style={{
                      fontSize: "13px",
                      color: "#C4C4C4",
                    }}
                  />
                </Tippy>
              </>
            ) : null}
          </VersionWrapper>
          <TokenName>
            {Name.toString().slice(0, 5)}
            {Name.toString().length > 5 ? (
              <>
                ...
                <Tippy theme="light" placement="top" content={Name}>
                  <InfoIcon
                    style={{
                      fontSize: "13px",
                      color: "#C4C4C4",
                    }}
                  />
                </Tippy>
              </>
            ) : null}
          </TokenName>
        </ContentWrapper>
      </Wrapper>
      <HeaderWrapper>
        <InfoCont>
          <HeaderComponent
            title="TVL"
            value={"$" + 70000}
            content="Total value locked in this staking pool"
          />
          <HeaderComponent
            title="Amount"
            value={1212}
            content="Estimated APY Rewards you would potentially earn if you stake $100 worth of tokens"
          />
          <HeaderComponent
            title="Apy"
            value={94.08 + "%"}
            content="Estimated APY Rewards you would potentially earn if you stake $100 worth of tokens"
          />
          <HeaderComponent
            title="Pool Ends"
            value={23 + "D" + " " + 23 + "D" + " " + 23 + "D"}
            content="Number of days for which the pool will continue to earn rewards"
          />
        </InfoCont>

        <ButtonsCont>
          <UnstakeModal disabled={isUnstaked} />
          <StakeButton disabled={isUnstaked}>Stake</StakeButton>
        </ButtonsCont>
      </HeaderWrapper>
    </>
  );
};
export default StakedFarmDetails;

interface isHeaderComponent {
  title: string;
  value: string | number;
  content: string;
}
const HeaderComponent = ({ title, value, content }: isHeaderComponent) => {
  return (
    <TvlWrapper>
      <TokenWrapper>
        <TokenNameHeader>
          {title} &nbsp;&nbsp;
          <Tippy theme="light" placement="top" content={content}>
            <InfoIcon
              style={{
                position: "relative",
                top: "1px",
                fontSize: "13px",
                color: "#C4C4C4",
              }}
            />
          </Tippy>
        </TokenNameHeader>
      </TokenWrapper>
      <TokenPrice>{value}</TokenPrice>
    </TvlWrapper>
  );
};
