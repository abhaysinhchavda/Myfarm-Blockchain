import React from "react";
import InputField from "../../components/Exchange/Component/Inputfield";
import  TokenDropDown  from "../../components/Exchange/Component/TokenDropdown";
import Balance from "../../components/Exchange/Component/Balance";
import style from "styled-components";

const ExchnageContainer = style.div`
display:flex;
justify-content:center;
margin-top:2rem;
@media only screen and (max-width: 600px) {
    flex-direction:column
  }
`;
const DropdownDiv = style.div`
margin-top:16px

`;
const InputDiv = style.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 600px) {
        margin-bottom:1.5rem
      }
    `;
const Receive = () => {
  const [value,setValue]=React.useState('0.0')
  const OnChange=(e)=>{
     setValue(e.target.value)
  }
  return (
    <ExchnageContainer>
      <DropdownDiv>
        <TokenDropDown   />
      </DropdownDiv>
      <InputDiv>
        <Balance mainBalance={2000} secondaryBalance={500} />
        <InputField value={value} onChange={()=>OnChange}/>
      </InputDiv>
    </ExchnageContainer>
  );
};
export default Receive;
