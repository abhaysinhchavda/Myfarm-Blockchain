
import React from "react";
import Container from "./Container";
import AirDropToken from "./Sub-Component/AirdropToken";
import Card from "./Sub-Component/Card";
import Claim from "./Sub-Component/ClaimButton";
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
width:50%;
@media only screen and (max-width: 768px) {
    flex-flow: wrap;
    width: 100%
}
`
interface IsAirDropList {
    Token: number;
    Amount: number;
    AirDropOn: any;
    TokenImage: string;
    climed: () => void;
}
const AirDropList = (props: IsAirDropList) => {


    return (
        <Container>

            <CardContainer>
                <ListContainer>
                    <AirDropToken
                        title="Tokens"
                        TokenImage={props.TokenImage}
                        value={props.Token}
                    />
                    <Card title="Amount" value={props.Amount} />
                    <Card title="Airdropped On" value={props.AirDropOn} />
                </ListContainer>

                <Claim climed={props.climed} />
            </CardContainer>

        </Container>
    );
};
export default AirDropList;
