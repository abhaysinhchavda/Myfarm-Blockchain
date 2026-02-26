import React from 'react'
import Style from 'styled-components'
const Container=Style.div`
display:flex;
justify-content:space-between;
padding-bottom:5rem;
position:absolute;
top:43rem;
width:500px;
`
const WrapperContent=Style.div`
display:flex;
flex-direction:column;
margin-right:-15px;

line-height:27px;
`
const WrapperTitle=Style.span`
text-align:left;
color:black;
`
const WrapperValue=Style.span`
text-align:right;
color:black;
`
interface IsWrapper{
    Recieved:any;
    Price:any;
    Network:any;
    Exchange:any
}
const Wrapper = ({Recieved,Price,Network,Exchange}:IsWrapper) => {
    return (
        <Container>
            <WrapperContent>
                <WrapperTitle>Minimum Recieved</WrapperTitle>
                <WrapperTitle>Price Impact</WrapperTitle>
                <WrapperTitle>Network Fee</WrapperTitle>
                <WrapperTitle>Exchange Fee</WrapperTitle>
            </WrapperContent>
            <WrapperContent>
                <WrapperValue>{Recieved}</WrapperValue>
                <WrapperValue>{Price}</WrapperValue>
                <WrapperValue>{Network}</WrapperValue>
                <WrapperValue>{Exchange}</WrapperValue>
            </WrapperContent>
        </Container>
    )
}
export default Wrapper