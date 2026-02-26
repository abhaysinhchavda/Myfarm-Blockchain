import React from "react";
import Style from "styled-components";
interface StakeButtonProps {
  onClick: () => void;
  textOnButton: string;
 
}

const StakeButton = ({ onClick, textOnButton }: StakeButtonProps) => {




  const MyButton = Style.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
width:50%;
position: static;

height: 50px;
left: 63px;
top: 0px;
background: transparent;
/* primary brand/main */

border: 1px solid #673AB7;
box-sizing: border-box;
border-radius: 10px;

/* Inside auto layout */
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 15px;
color: #673AB7;
flex: none;
order: 1;
flex-grow: 1;

&:hover {
    background-color: #6338BC;
    color:white;
    cursor:pointer;
  }






`;





  return (
    <>
      <MyButton onClick={onClick}>{textOnButton}</MyButton>
    </>
  );
};
export default StakeButton;
