import React from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import InfoIcon from "@material-ui/icons/Info";

const ListItemFlexBox = styled.div`
  width: 16%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ListItemFlexWrapper = styled.div`
  display: flex;
  alignitems: center;
`;

const ListItemTitle = styled.div`
  font-size: 13;
  color: #5a5858;
  line-height: 15px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
`;

const StyledInfoIcon = styled(InfoIcon)`
  font-size: 13px;
  margin-left: 0.5rem;
  color: #c4c4c4;
`;

interface ListItemWithToolTipProps {
  title: string;
  children: React.ReactNode;
  tippyContent: string;
}

export default function ListItemWithToolTip({
  title,
  children,
  tippyContent,
}: ListItemWithToolTipProps) {
  return (
    <ListItemFlexBox>
      <ListItemFlexWrapper>
        <ListItemTitle>{title}</ListItemTitle>
        <Tippy theme="light" placement="top" content={tippyContent}>
          <StyledInfoIcon />
        </Tippy>
      </ListItemFlexWrapper>
      {children}
    </ListItemFlexBox>
  );
}
