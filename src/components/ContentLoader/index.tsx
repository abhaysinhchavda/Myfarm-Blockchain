import React from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const LoaderPosition = styled.div`
  display: flex;
  align-items: center;
  height: 50vh;
  justify-content: center;
  width: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PrintMessage = styled.p`
  font-size: 14px;
  font-color: #222;
  margin-right: 8px;
  margin-top: 0px;
`;

interface ContentLoaderProps {
  color: string;
  message: string;
}

export default function ContentLoader({ color, message }: ContentLoaderProps) {
  return (
    <LoaderPosition>
      <FlexWrapper>
        <ClipLoader color={color} size={30} />
        {message ? <PrintMessage>{message}</PrintMessage> : null}
      </FlexWrapper>
    </LoaderPosition>
  );
}
