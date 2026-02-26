import styled from "styled-components";
import React from 'react';

interface ProposalStatusProps {
    status:any;
}

const ProposalStatusContainer = styled.div<{
    status:string;
  }>`
width:95px;
height:32px;
border-radius:16px;
text-align:center;
padding:5px;
background-color :  ${(props) => (props.status === "Voting Live" ? "#E2E3FF" : props.status === "Scheduled" ?  "#F5F5F5" : props.status === "Passed" ? "#E5F9EE" : props.status === "Cancelled" ? "#FCEDE5" : props.status === "Failed" ? "#FFE7E5" : null)};
color : ${(props) => (props.status === "Voting Live" ? "#6338BC" : props.status === "Scheduled" ?  "#616161" : props.status === "Passed" ? "#00C853" : props.status === "Cancelled" ? "#FFC107" : props.status === "Failed" ? "#C62828" : null)};
font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 18px;
padding-top: 7px;
letter-spacing: 0.16px;


`;


const ProposalStatus = (props:ProposalStatusProps) => {
   return(
     <ProposalStatusContainer status={props.status}>
        {props.status} 
     </ProposalStatusContainer>
   );
}

export default ProposalStatus;