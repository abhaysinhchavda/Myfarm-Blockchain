import Skeleton from '@mui/material/Skeleton';
import React from 'react'
interface IsSkeleton{
    width:any,
    height:any,
    top:any,
    left:any
}
const MySkeleton=({width,height,top,left}:IsSkeleton)=>
{
    return(
        <Skeleton animation="wave" width={width} height={height} style={{marginTop:top,marginLeft:left}}/>
    )
}
export default MySkeleton