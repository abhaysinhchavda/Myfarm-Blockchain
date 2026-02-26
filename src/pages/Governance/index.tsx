import React from "react";
import Governance from "./Governance";
import Imageofrwd from "../../assets/images/others/rwd.png";
import GovernanceDetails from "./GovernanceDetails";
import Eth from "../../assets/images/others/eths.png";
import Ufarm from "../../assets/images/others/ufarmf.png";
import CreateProposal from "./CreateProposal";


const proposals = [
  {
    proposal:
      "Upgrade Governance Contract to Compound's Gover nor Bravo GovernoR",
    status: "Voting Live",
    pollFor: 49,
    pollAgainst: 51,
    totalVotesNumber: 888888,
    totalVotesAddress: 122,
    ImageofRwd: Imageofrwd,
    startsIn: "Starts On 01/12/2021",
  },
  {
    proposal:
      "Upgrade Governance Contract to Compound's Gover nor Bravo GovernoR",
    status: "Scheduled",
    pollFor: 49,
    pollAgainst: 51,
    totalVotesNumber: 888888,
    totalVotesAddress: 122,
    ImageofRwd: Imageofrwd,
    startsIn: "Starts On 01/12/2021",
  },
];

const DetailsData = {
  name: "Defi Education Fund",
  proposedBy: "Defig4745",
  tokenstoBeWhitelisted: "Ethereum(Eth)",
  imageOfToken: Eth,
  RewardsImage: Ufarm,
  totalRewards: 2000,
  votingEndsIn: "01/12/2021",
  addresses:[{
      tokenName: "ETH",
      tokenAddress : "0x9e24415d1e549ebc626a13a482bb117a2b43e9cf"
  },
  {
    tokenName: "ETH",
    tokenAddress : "0x9e24415d1e549ebc626a13a482bb117a2b43e9cf"
  },
  {
    tokenName: "ETH",
    tokenAddress : "0x9e24415d1e549ebc626a13a482bb117a2b43e9cf"
  }
  ]
};


const votersData = [
  {
    voters: "0x0...5B",
    proposalVoted:"For",
    votingPower: 0.03
  },
  {
    voters: "Dr Laurence",
    proposalVoted:"Against",
    votingPower: 0.526
  },
  {
    voters: "Dr Laurence",
    proposalVoted:"For",
    votingPower: 1.353
  },
  {
    voters: "Dr Laurence",
    proposalVoted:"For",
    votingPower: 1.353
  },

]

const GovernanceIndex = () => {
  const [pageName, setPageName] = React.useState("Homepage");
  const [arrayNo, setArrayNo] = React.useState(0);
  const [createdPageOrNot, setCreatedPageOrNot] = React.useState(false);

  const handleCallback = (childData) => {
    setPageName(childData);
  };

  const handleCallback2 = (childData) => {
    setArrayNo(childData);
  };

  const handleCallback4 = (childData) => {
    setCreatedPageOrNot(childData);
  }

  return (
    <div>
      {pageName === "Homepage" ? (
        <Governance
          parentCallback={handleCallback}
          parentCallback2={handleCallback2}
          parentCallback3 = {handleCallback}
          parentCallback4 = {handleCallback4}
          proposals={proposals}
        />
      ) : pageName === "Details" ? (
        <GovernanceDetails
          arrayObject={proposals[arrayNo]}
          parentCallback={handleCallback}
          detailsData = {DetailsData}
          votersData = {votersData}
          createdPageOrNot = {createdPageOrNot}
        />
      )  : pageName === "ProposalCreate" ? (
         <CreateProposal parentCallback={handleCallback} />
      )
      : (
        <div>Hello</div>
      )}
    </div>
  );
};

export default GovernanceIndex;
