import React from "react";
import styled from "styled-components";
import { PoolInformationProps } from "../ListView/PoolInformation";
import InfoIcon from "@material-ui/icons/Info";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { useApy } from "../../../hooks/useCohortHooks";
import { roundValue } from "../../../utilities";

const TokenFirstWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;
  height: 87px;
  color: "black !important";
  overflow: hidden;
`;

const TokenSecondWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.img`
  width: 20px;
  height: 20px;
  position: relative;
  top: -15px;
  left: -5px;
`;

const TokenNameWrapper = styled.div`
  width: 220px;
  height: 50px;
  position: relative;
  top: -3px;
  left: 0px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  color: #1a1a1a;
  text-align: left;
`;

const CohortWrapper = styled.div`
  position: relative;
  width: 108px;
  height: 22px;
  top: 20px;
  left: -220px;
  color: #a4a4a4;
  white-space: nowrap;
  text-align: left;
`;

const APYName = styled.div`
  width: 105px;
  height: 22px;
  position: relative;
  top: -14px;
  right: 105px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #5a5858;
  text-align: left;
`;

const APYPercent = styled.div`
  position: relative;
  height: 19px;
  width: 73px;
  top: 15px;
  right: 210px;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 23px;
  color: #9272ec;
  text-align: left;
`;

const StyledInfoIcon = styled(InfoIcon)`
  font-size: 13px;
  margin-left: 0.5rem;
  color: #c4c4c4;
`;

interface GridViewPoolInformation extends PoolInformationProps {
  action: "STAKE" | "UNSTAKE";
  APY: number;
  apyRange: number[];
}

export default function PoolInformation({
  poolName,
  poolTokenIcon,
  cohortVerison,
  action,
  APY,
  apyRange,
}: GridViewPoolInformation): JSX.Element {
  const apy = useApy(action, APY, apyRange);

  return (
    <TokenFirstWrapper>
      <TokenSecondWrapper>
        <ImageWrapper src={poolTokenIcon} alt={poolName} />
        <TokenNameWrapper>
          {poolName.toString().slice(0, 10)}
          {poolName.toString().length > 10 ? (
            <>
              ...
              <Tippy theme="light" placement="top" content={poolName}>
                <InfoIcon
                  style={{
                    fontSize: "13px",
                    color: "#C4C4C4",
                  }}
                />
              </Tippy>
            </>
          ) : null}
        </TokenNameWrapper>
        <CohortWrapper>
          Cohort {cohortVerison.toString().slice(0, 5)}
          {cohortVerison.toString().length > 5 ? (
            <>
              ...
              <Tippy theme="light" placement="top" content={cohortVerison}>
                <InfoIcon
                  style={{
                    fontSize: "13px",
                    color: "#C4C4C4",
                  }}
                />
              </Tippy>
            </>
          ) : null}
        </CohortWrapper>

        <APYName>
          APY
          <Tippy
            theme="light"
            placement="top"
            content="Estimated APY Rewards you would potentially earn if you stake 100$ worth of tokens"
          >
            <StyledInfoIcon />
          </Tippy>
        </APYName>
        <APYPercent>{roundValue(apy, 1)}%</APYPercent>
      </TokenSecondWrapper>
    </TokenFirstWrapper>
  );
}
