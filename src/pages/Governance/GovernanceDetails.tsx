import Box from "@mui/material/Box";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import React from "react";
import DetailsComponent from "../../components/ProposalDetails/DetailsComponent";
import CurrentResult from "../../components/ProposalDetails/CurrentResult";
import TableforDetails from "../../components/ProposalDetails/TableforDetails";
import VoteOptions from "../../components/ProposalDetails/VoteOptions";

const IconWrapperFlexBox = styled.div`
  display: flex;
  margin-top: -1.5rem;
`;

interface ArrayObject {
  proposal: any;
  status: any;
  pollFor: any;
  pollAgainst: any;
  totalVotesNumber: any;
  totalVotesAddress: any;
  ImageofRwd: any;
  startsIn: any;
}

interface Addresses {
  tokenName: any;
  tokenAddress: any;
}

interface DetailsData {
  name: any;
  proposedBy: any;
  tokenstoBeWhitelisted: any;
  imageOfToken: any;
  RewardsImage: any;
  totalRewards: any;
  votingEndsIn: any;
  addresses: Addresses[];
}

interface VotersData {
  voters: any;
  proposalVoted: any;
  votingPower: any;
}

interface GovernanceDetailsProps {
  arrayObject: ArrayObject;
  parentCallback: any;
  detailsData: DetailsData;
  votersData: VotersData[];
  createdPageOrNot:boolean;
}

const GovernanceDetails = (props: GovernanceDetailsProps) => {
  const handleCallback = () => {
    props.parentCallback("Homepage");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <IconWrapperFlexBox>
        <IconButton onClick={handleCallback}>
          <ArrowBackIosIcon style={{ fontSize: 18, color: "black" }} />
        </IconButton>
      </IconWrapperFlexBox>
      <Grid container spacing={2}>
        <DetailsComponent
          detailsData={props.detailsData}
          arrayObject={props.arrayObject}
          createdPageOrNot={props.createdPageOrNot}
        />
        <CurrentResult
          forer={50}
          against={25}
          abstain={25}
          status={props.arrayObject.status}
        />
        <TableforDetails
          status={props.arrayObject.status}
          votes={props.votersData}
        />
        <VoteOptions status={props.arrayObject.status} detailsData={props.detailsData} />
      </Grid>
    </Box>
  );
};

export default GovernanceDetails;
