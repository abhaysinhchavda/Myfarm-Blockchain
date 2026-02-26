import React from "react";
import style from "styled-components";
import tick from "../../../../../assets/V2/Detail/tick.svg";
const Title = style.h4`
font-size: 15px;
font-weight: 600;
line-height: 26px;
margin-bottom: 0;
`;
const Message = style.h6`
margin: 5px;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 20px;
`;
interface props{
  message:string
}
const Congratulations = ({message}:props) => {
  return (
    <>
      <img src={tick} alt="img" />
      <Title>Congratulations</Title>
      <Message>{message}</Message>
    </>
  );
};
export default Congratulations;
