import React from "react";
import Styled from "styled-components";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoIcon from "@material-ui/icons/Info";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useHistory } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
const HeaderWrapper = Styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 25px 20px;
background:white;
margin-top:1rem;
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
}

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

const TokenName = Styled.span`
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
const TokenNameM = Styled.span`
color:#212121;
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
margin-left: 10px;
display: flex;
gap: 10px;
`;
interface FarmDetailsProps {
  /** farm name */
  farmName: string;
  /** farm icon */
  farmIcon: string;
  /** particular cohort version */
  cohortVersion: string;
  /** particular cohort status */
  cohortLockStatus: boolean;
  /** total value locked in USD */
  totalValueLockedInUsd: number;
  /** maximum staking limit */
  maxStakingLimit: number;
  /** derived APY */
  APY: number;
  /** intialStakedAmount */
  intialStakedAmount: number;
  /** farm ends in */
  farmEnds: string;
}

interface TippyComponentProps {
  /** title of tool tip */
  title: string;
  /** value of tool tip */
  value: string | number;
  /** content */
  content: string;
}

const TippyComponent = ({ title, value, content }: TippyComponentProps) => {
  return (
    <TvlWrapper>
      <TokenWrapper>
        <TokenName>
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
        </TokenName>
      </TokenWrapper>
      <TokenPrice>{value}</TokenPrice>
    </TvlWrapper>
  );
};

const FarmDetails = ({
  farmName,
  farmIcon,
  cohortVersion,
  cohortLockStatus,
  totalValueLockedInUsd,
  maxStakingLimit,
  APY,
  intialStakedAmount,
  farmEnds,
}: FarmDetailsProps) => {
  const history = useHistory();

  return (
    <>
      <IconeWrapper>
        <IconButton onClick={() => history.push("/V2/farms")}>
          <ArrowBackIosIcon />
        </IconButton>
      </IconeWrapper>
      <Wrapper>
        <img src={farmIcon} width={65} />

        <ContentWrapper>
          <VersionWrapper>
            {cohortVersion.toString().slice(0, 9)}
            {cohortVersion.toString().length > 9 ? (
              <>
                ...
                <Tippy theme="light" placement="top" content={cohortVersion}>
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
          <TokenNameM>
            {farmName.toString().slice(0, 5)}
            {farmName.toString().length > 5 ? (
              <>
                ...
                <Tippy theme="light" placement="top" content={farmName}>
                  <InfoIcon
                    style={{
                      fontSize: "13px",
                      color: "#C4C4C4",
                    }}
                  />
                </Tippy>
              </>
            ) : null}
            {cohortLockStatus ? (
              <LockOutlinedIcon style={{ width: "20px" }} />
            ) : (
              <LockOpenIcon style={{ width: "20px" }} />
            )}
          </TokenNameM>
        </ContentWrapper>
      </Wrapper>
      <HeaderWrapper>
        <TippyComponent
          title="TVL"
          value={"$" + totalValueLockedInUsd}
          content="Total value locked in this staking pool"
        />
        <TvlWrapper>
          <TokenWrapper>
            <TokenName>Max Staking Limit</TokenName>
          </TokenWrapper>
          <TokenPrice>{maxStakingLimit}</TokenPrice>
        </TvlWrapper>
        {intialStakedAmount > 0 && (
          <TvlWrapper>
            <TokenWrapper>
              <TokenName> Staked Amount </TokenName>
            </TokenWrapper>
            <div style={{ display: "flex", marginTop: "1rem" }}>
              <Tippy
                theme="light"
                content={<span>Some Content write here</span>}
              >
                <InfoOutlinedIcon style={{ color: "grey" }} />
              </Tippy>
              &nbsp;&nbsp;
              <TokenPrice>{intialStakedAmount}</TokenPrice>
            </div>
          </TvlWrapper>
        )}
        <TippyComponent
          title="APY"
          value={APY + "%"}
          content="Estimated APY Rewards you would potentially earn if you stake $100 worth of tokens"
        />
        <TippyComponent
          title="Pool Ends"
          value={farmEnds}
          content="Number of days for which the pool will continue to earn rewards"
        />
      </HeaderWrapper>
    </>
  );
};
export default FarmDetails;




