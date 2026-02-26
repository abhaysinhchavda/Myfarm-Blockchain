import React from 'react'
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import MySkeleton from "../../../components/skeleton";
import StakedAmtROI from './StakedAmtROI';
import RewardsClaimedOn from './RewardsClaimedOn';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(4),
    borderRadius: 10,
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "space-between",
    boxShadow:
      "0 0 0.5px rgba(6, 10, 13, 0.4), 0 8px 16px rgba(113, 121, 128, 0.08)",
  }));





  interface IsMyStatics{
    StakeAmount:number
    ROI:any
    CalimedDate:string
   
}
const MyStatics=({StakeAmount,ROI,CalimedDate}:IsMyStatics)=>
{
    const isLoading=true
    return(
        <>
        {
            isLoading?
            <Grid item xs={6}>
          <Item>
            <div style={{ width: "100%" }}>
              <span
                style={{
                  display: "flex",
                  fontSize: 25,

                  marginTop: "-1rem",
                  marginBottom: "1rem",
                  top: "21px",
                  left: "29px",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "29px",
                }}
              >
                My Statistics
              </span>
              <StakedAmtROI stakedAmt={StakeAmount} ROI={ROI} />
              <div style={{display:'flex',alignItems:'center',marginBottom: "1rem",marginTop:35}}>
                <RewardsClaimedOn claimedDate={CalimedDate} />
                <div style={{marginLeft:65,fontSize:20,textDecoration:'underline'}}>
                View on Explorer
                </div>
              </div>
            </div>
          </Item>
        </Grid>
        :
        <MySkeleton width='47%' height={600} top="-7rem" left="1rem"/>
        }
        </>
    )
}
export default MyStatics