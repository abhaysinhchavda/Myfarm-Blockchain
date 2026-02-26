import React from "react";
import style from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import styled from "styled-components";

const StakeButton = style.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

position: static;
width: 100%;
height: 55px;
left: calc(50% - 400px/2);
top: calc(50% - 55px/2 + 97px);
border:none;
/* primary brand/main */
color:white;
background: #673AB7;
box-shadow: 0px 7px 18px -2px rgba(103, 58, 183, 0.56);
border-radius: 10px;
cursor: pointer;
/* Inside auto layout */
font-family:inter;
flex: none;
order: 2;
flex-grow: 0;
margin: 42px 0px;
`;



const StatkeWrapper = style.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px;
background:white;
margin-top:1rem;
width: 500px;
height: 289px;
left: 241px;
top: 441px;
border: 1px solid #D5D5D5;
box-sizing: border-box;
border-radius: 10px;
box-shadow: 4px 4px 15px rgb(0 0 0 / 10%);
@media (max-width: 425px) {
 width: 100%;

}
`;
const Wrapper = style.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
margin-top:0.5rem;
justify-content:space-between;
width: 100%;
height: 17px;
left: 20px;
top: 155px;
`;

const DividerLine = styled(Divider)`
  position: relative;
  top: -20px;
  width: 500px;
  left: -20px;
  @media (max-width: 425px) {
    width: 111%;
  }
`;

const StakeHeading = style.h2`
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
position:relative;
top:-18px;
`;
const BalanceLink = styled.div`
  position: static;
  width: 250px;
  height: 17px;
  left: 190px;
  top: 0px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;

  text-decoration: underline;
  text-decoration-color: #673ab7;
`;
const BalanceTitle = styled.a`
  left: 0%;
  right: 18.67%;
  top: 0%;
  bottom: 0%;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* primary brand/main */
  color: #673ab7;
  &:hover {
    cursor: pointer !important;
  }
`;

interface StakeProps {
  /** stake input handler */
  stakeInputHandler: (stakedAmount: string | number) => void;
  /** stake input value */
  stakeInputValue: string | number;
  /** farm token name */
  farmTokenName: string,
  /** farm token icon */
  farmTokenIcon: string;
  /** stake modal handler */
  stakeModalHandler : () => void;  
  /** user farm token balance in usd */
  userFarmTokenBalanceInUsd: number
  /** user total staking limit */  
  userStakeLimitInUsd: number; 
}

const Stake = ({
  stakeInputHandler,
  stakeInputValue,
  farmTokenName,
  farmTokenIcon,
  userFarmTokenBalanceInUsd,
  userStakeLimitInUsd,
  stakeModalHandler,
}: StakeProps) => {
  return (
    <>
      <StatkeWrapper>
        <StakeHeading>Stake</StakeHeading>
        <DividerLine />
        <TextField
          id="input-with-icon-textfield"
          label="Enter Amount"
          style={{ fontFamily: "Inter !important", width: "100%" }}
          value={stakeInputValue}
          onChange={(e) => stakeInputHandler(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                style={{ marginTop: "1.5rem", marginBottom: "1.8rem" }}
              >
                <img src={farmTokenIcon} width={40} alt={farmTokenName} />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        <Wrapper>
          <BalanceLink>
            <BalanceTitle>Staking Limit : {userStakeLimitInUsd}</BalanceTitle>
          </BalanceLink>
          <BalanceLink>
            <BalanceTitle>My Balance : {userFarmTokenBalanceInUsd}</BalanceTitle>
          </BalanceLink>
        </Wrapper>
          
        <div style={{width:"100%"}}>
        <StakeButton onClick={stakeModalHandler}>Stake</StakeButton>
        </div>
      </StatkeWrapper>
    </>
  );
};
export default Stake;
