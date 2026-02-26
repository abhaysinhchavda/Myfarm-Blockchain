import React, { Fragment } from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import InfoIcon from "@material-ui/icons/Info";


interface MyStakeProps {
  mystake: any;
}

const TVLText = styled.div`
  position: relative;
  width: 101px;
  height: 19px;
  top: 30px;
  left: 16px;
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

const MyStake = (props: MyStakeProps) => {
  return (
    <Fragment>
      <TVLText>
        My Stake
        <Tippy
          theme="light"
          placement="top"
          content="User Staked Amount"
        >
          <StyledInfoIcon />
        </Tippy>
      </TVLText>
      <TVLValue>{props.mystake}</TVLValue>
    </Fragment>
  );
};

export default MyStake;
