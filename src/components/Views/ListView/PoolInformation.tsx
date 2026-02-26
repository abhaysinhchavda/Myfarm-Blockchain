import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import InfoIcon from "@material-ui/icons/Info";
import styled from "styled-components";

const PoolInformationWrapper = styled.div`
  display: flex;
  width: 25%;
  margin-top:-6px;
`;

const PoolTokenLogo = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 1rem;
  margin-top:2px;
`;

const PoolFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  textalign: left;
`;

const StyledPoolName = styled.span`
  font-size: 18px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  line-height: 25px;
  display: flex;
  align-items: center;
  text-align:left;
  color: black;
`;

const CohortVersion = styled.div`
  width: 130px;
  height: 58px;
  left: -20;
  font-size: 15;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  align-items: center;
  color: #a4a4a4;
  text-align:left;
`;

export interface PoolInformationProps {
  poolTokenIcon: string;
  poolName: string;
  cohortVerison: string;
}

export default function PoolInformation({
  poolTokenIcon,
  poolName,
  cohortVerison,
}: PoolInformationProps): JSX.Element {
  return (
    <PoolInformationWrapper>
      <PoolTokenLogo src={poolTokenIcon} alt={poolName} />
      <PoolFlexBox>
        <StyledPoolName>
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
        </StyledPoolName>

        <CohortVersion>
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
         
          
        </CohortVersion>
      </PoolFlexBox>
    </PoolInformationWrapper>
  );
}
