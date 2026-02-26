import React from 'react'
import style from 'styled-components'
const BalanceContainer=style.span`
display:flex;
justify-content:flex-end;
width:100%
`
interface IsBalance{
    mainBalance:any;
    secondaryBalance:any;
}
const Balance=(props:IsBalance)=>
{
    return(
        
        <BalanceContainer>Balance:{props.mainBalance.toFixed(2)}(${props.secondaryBalance.toFixed(2)})</BalanceContainer>
    )
}
export default Balance