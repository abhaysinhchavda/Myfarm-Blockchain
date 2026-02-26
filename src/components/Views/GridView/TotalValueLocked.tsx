import React, { Fragment } from "react";
import styled from "styled-components";
import { getTVL, roundValue, usdCurrencyFormat } from "../../../utilities";
import { TotalValueLockedProps } from "../ListView/TotalValueLocked";
import InfoIcon from "@material-ui/icons/Info";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

const TVLText = styled.div`
  position: relative;
  width: 51px;
  height: 19px;
  top: 30px;
  left: 21px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 19px;
  color: #5a5858;
`;

const TVLValue = styled.div`
  position: relative;
  width: 98px;
  height: 19px;
  top: 9px;
  right: -208px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: #000000;
`;

const StyledInfoIcon = styled(InfoIcon)`
  font-size: 13px;
  color: #c4c4c4;
  margin-left: 0.5rem;
`;

const Tvl = ({ totalStaking, usdPrice }: TotalValueLockedProps) => {
  const usdTotalValueLocked = roundValue(getTVL(totalStaking, usdPrice), 2);
  return (
    <Fragment>
      <TVLText>
        TVL
        <Tippy
          theme="light"
          placement="top"
          content="Total value locked in this staking pool"
        >
          <StyledInfoIcon />
        </Tippy>
      </TVLText>
      <TVLValue>{usdCurrencyFormat(usdTotalValueLocked)}</TVLValue>
    </Fragment>
  );
};

export default Tvl;
