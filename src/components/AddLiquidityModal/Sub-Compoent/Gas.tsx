import React from 'react'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import style from 'styled-components'
const GasContainer=style.div`
display:flex;
align-items:center
`
const GasValue=style.span`
font-size:20;
font-weight:600
`
const Gas=()=>
{
    return(
        <GasContainer>
              <LocalGasStationIcon style={{ color: '#6338BC',fontSize:30 }} />
              <GasValue>111</GasValue>
        </GasContainer>
    )
}
export default Gas