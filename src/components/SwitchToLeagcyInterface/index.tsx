import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useApplicationUserState } from "../../store/user/hooks";
import { legacyAppUrls } from "../../constants/chain";

const StyledSwitchButton = styled(Button)`
  background-color: #f8f4ff;
  text-transform: none;
  border-radius: 14px;
  color: #787878;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledFiberManualRecordIcon = styled(FiberManualRecordIcon)`
  font-size: 8px;
  margin-left: -7px;
  margin-right: 3px;
  color: #53d746;
`;

const SwitchLegacyLink = styled.a`
  text-decoration: none;
  color: #6338bc;
  margin-left: 10px;
  font-weight: 600;
`;

export default function SwitchToLegacyInterface() {
  const { appChainId } = useApplicationUserState();

  return (
    <div>
      <StyledSwitchButton>
        <FlexWrapper>
          <StyledFiberManualRecordIcon />
          Beta
        </FlexWrapper>
      </StyledSwitchButton>
      <SwitchLegacyLink href={legacyAppUrls[appChainId]} target="_blank">
        Switch To Legacy Interface
      </SwitchLegacyLink>
    </div>
  );
}
