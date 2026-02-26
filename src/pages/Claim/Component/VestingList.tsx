import React from "react";
import Container from "./Container";
import Claim from "./Sub-Component/ClaimButton";
import Card from "./Sub-Component/Card";
import Styled from 'styled-components'

const CardContainer = Styled.div`
display:flex;
justify-content:space-between;
align-items:center;
@media only screen and (max-width: 768px) {
  flex-direction:column;
 }

`
const ListContainer = Styled.div`
display:flex;
justify-content:space-between;
width:90%;
@media only screen and (max-width: 768px) {
  flex-flow:wrap;
  width:100%;
 }
`
interface IsHeader {
  Token: number;
  Vested: number;
  Claimed: number;
  SChedule: any;
  climed: () => void;
}
const Header = (props: IsHeader) => {
return (
    <Container>
      <CardContainer>
        <ListContainer>
        <Card title="Total Alloted Tokens" value={props.Token} />
        <Card title="Total Vested" value={props.Vested} />
        <Card title="Total Claimed" value={props.Claimed} />
        <Card title="Avalaible to claim" value={props.Claimed} />
        <Card title="Unstake Schedule" value={props.SChedule} />
        </ListContainer>
        <Claim climed={() => alert("click")} />
      </CardContainer>
      
    </Container>
  );
};
export default Header;
