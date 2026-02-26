import React from "react";
import styled from "styled-components";
import Fire from "../../assets/images/New/fire.png";

const HotPoolLogoWrapper = styled.div`
  margin-top: -29px;
  margin-left: -29px;
`;

export default function HotPoolIcon() {
  return (
    <HotPoolLogoWrapper>
      <img src={Fire} width="20" alt="hotpool" />
    </HotPoolLogoWrapper>
  );
}
