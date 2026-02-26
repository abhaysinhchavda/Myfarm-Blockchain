import React from 'react'
import Style from 'styled-components'
const Container=Style.div`
display:flex;
flex-direction:column;
align-items:flex-start;
`

const ContainerDiv=Style.div`
display:flex;
align-items:center;
justify-content:space-between;
width:100%
`
interface IsReferedStatitcs{
    statsTitle:string;
    statsValue:number;
    statsIcon:any;
}
const ReferedStatitcs = ({statsTitle,statsValue,statsIcon}:IsReferedStatitcs) => {
    return (
        <Container>
            <span>
                {statsTitle}
            </span>
            <ContainerDiv>
                <span>
                    {statsValue}
                </span>
                <img src={statsIcon}  width={50}/>
            </ContainerDiv>

        </Container>
    )
}
export default ReferedStatitcs
