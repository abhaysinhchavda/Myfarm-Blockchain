import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  useActionback,
  useActionScreenType,
} from "../../store/application/hooks";
import { useMediaQuery, makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useScreenContext } from "../../contexts/ScreenContext";
import { roundValue } from "../../utilities";
import { useApy } from "../../hooks/useCohortHooks";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import InfoIcon from "@material-ui/icons/Info";
import MobileTimer from "./MobileTimer";
import _ from "lodash";

const IconWrapperFlexBox = styled.div`
  display: flex;
  margin-top: -1.5rem;
`;

const TopFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TokenMetaWrapper = styled.div`
  display: flex;
  alignitems: center;
  fontsize: 20px;
  fontweight: 600;
`;

const StyledTokenLogo = styled.img`
  width: 40px;
`;

const StyledTokenName = styled.span`
  margin-left: 0.5rem;
  font-size: 20px;
`;

const RewardEndsInTimerFlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CurrentAPYWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const APYValue = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const APYText = styled.span``;

const useStyles = makeStyles((theme) => ({
  version: {
    marginLeft: "3.0rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
  },
  time: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
  },
}));
const InfoIconeMy = (name) => {
  return (
    <>
      {name.toString().slice(0, 9)}
      {name.toString().length > 9 ? (
        <Tippy theme="light" placement="top" content={name}>
          <InfoIcon
            style={{
              fontSize: "13px",
              color: "#C4C4C4",
            }}
          />
        </Tippy>
      ) : null}
    </>
  );
};
const InfoIconeMy2 = (name) => {
  return (
    <div style={{display:'flex',alignItems:'center'}}>
      Cohort&nbsp;{name.toString().slice(0, 2)}
      {name.toString().length > 2 ? (
        <Tippy theme="light" placement="top" content={name}>
          <InfoIcon
            style={{
              fontSize: "13px",
              color: "#C4C4C4",
            }}
          />
        </Tippy>
      ) : null}
    </div>
  );
};
export default function TopHeaderComponent(): JSX.Element {
  const back = useActionback();

  const theme = useTheme();

  const Mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const classes = useStyles();

  const { farm } = useScreenContext();

  const { farmDetails, cohortDetails, APY, apyRange } = farm;
  const { action } = useActionScreenType();

  const apy = useApy(action, APY, apyRange);

  return (
    <Fragment>
      <IconWrapperFlexBox>
        <IconButton onClick={() => back()}>
          <ArrowBackIosIcon style={{ fontSize: 18, color: "black" }} />
        </IconButton>
      </IconWrapperFlexBox>

      <TopFlexWrapper>
        <InnerWrapper>
          <TokenMetaWrapper>
            <StyledTokenLogo src={farmDetails.icon} alt={farmDetails.name} />
            <StyledTokenName>
              {Mobile ? InfoIconeMy(farmDetails.name) : farmDetails.name}
            </StyledTokenName>
          </TokenMetaWrapper>

          <RewardEndsInTimerFlexWrapper>
            <span className={classes.version}>
              
            {  Mobile ? InfoIconeMy2(cohortDetails.cohortVersion) : cohortDetails.cohortVersion}
              
            
            </span>
            {Mobile ? (
              <MobileTimer endTime={_.multiply(farm.farmEndTime, 1000)} />
            ) : null}
          </RewardEndsInTimerFlexWrapper>
        </InnerWrapper>
        <CurrentAPYWrapper>
          <APYText>Current APY</APYText>
          <APYValue>{roundValue(apy, 2)}%</APYValue>
        </CurrentAPYWrapper>
      </TopFlexWrapper>
    </Fragment>
  );
}
