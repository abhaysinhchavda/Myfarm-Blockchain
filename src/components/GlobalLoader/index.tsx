import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import styled from "styled-components";

const LoderPosition = styled.div`
  display: flex;
  align-items: center;
  height: 50vh;
  justify-content: center;
  width: 100%;
`;

interface GlobalLoaderProps {
  color: string;
}

const GlobalLoader = ({ color }: GlobalLoaderProps) => {
  return (
    <LoderPosition>
      <FadeLoader color={color} />
    </LoderPosition>
  );
};
export default GlobalLoader;
