import React from 'react'
import TextField from '@material-ui/core/TextField'
interface ReferralLinkInput{
    link:string
}
const ReferralLinkInput=(props:ReferralLinkInput)=>
{
    return(
        <TextField
         variant="outlined"
         size="small"
         value={props.link}
         fullWidth
         InputProps={{
           readOnly: true,
         }}
        />
    )
}
export default ReferralLinkInput