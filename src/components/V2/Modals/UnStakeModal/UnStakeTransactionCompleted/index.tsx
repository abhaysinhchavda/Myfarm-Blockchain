import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory } from "react-router-dom";
import style from "styled-components";
import facebook from "../../../../../assets/images/New/Facebook.png";
import linkedin from "../../../../../assets/images/New/linkedin.png";
import telegram from "../../../../../assets/images/New/telegram.png";
import twitter from "../../../../../assets/images/New/twiteer.png";
import Congratulations from "../../Common/Congratulation";
import TransactionViewer from "../../Common/TransactionViewer";
import UserStakingDetail from "../../Common/UserStakingDetails";
import { useTheme } from "@material-ui/core";

const ViewStakeButton = style.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 15px;
text-transform: capitalize;
font-size: 15px;
font-weight: 500;
height: 55px;
cursor: pointer;
border:none;
color:white;
background: #673AB7;
box-shadow: 0px 7px 18px -2px rgba(103, 58, 183, 0.56);
border-radius: 10px;
width: 424px;
margin-top: 1rem;
@media (max-width: 425px) {
    width: 200px;
}
`;

const Links = style.div`
    display: flex;
    margin-top: 25px;
    width: 100%;
    justify-content:center
`;
const Link = style.div`

display: flex;
align-items: center;
margin: 0px 10px;
cursor: pointer;
gap: 10px;
`;

const ShareCont = style.div`
display: flex;
align-items: center;
width: 100%;
justify-content: space-around;
flex-wrap: wrap;

`;
const ShareItem = style.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 50%;
cursor: pointer;

margin: 30px 0px;
`;
const ShareIconImg = style.img`
    width: 67px;
    height: 67px;
    margin: 10px;
    margin: 10px;
    @media (max-width: 425px) {
      width: 50px;
    height: 50px;
  }
`;
const ShareIconText = style.div`
font-size: 14px;
font-weight: 400;
@media (max-width: 425px) {
  font-size: 13px;
  font-weight: 600;
}
`;

const RewardsCont = style.div`
display: flex;
width: 100%;
flex-direction: column;
margin-top: 10px;


`;
const UserStakingDetailCont = style.div`
margin-top: -1.8rem; 
width: 100%; 
margin-bottom: 1rem; 
@media (max-width: 425px) {
display: none;
}
`;

const farmData = {
	farmId: 0,
  cohortAddress: '',
  farmTokenName: '',
  farmTokenIcon: '',
  cohortVersion: '',
  farmTokenAddress: '',
  APY: 0,
}

export default function ClaimRewards() {
  const [share, setShare] = React.useState(true);
  const [approved, setApproved] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false)
  const Theme = useTheme();
  // const Mobile=useMediaQuery(Theme.breakpoints.down('xs'))
  const history = useHistory();
  const modalStyle = {
    top: "50%",
    px: 4,

    width: "100% !important ",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    [Theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  };
  const AddMetamask = () => {
    
    setLoading(true)
    setTimeout(() => {
      setApproved(true)
      setLoading(false)
    }, 1500);
  }
  return (
    <>
      <Box sx={{ ...modalStyle, flexDirection: "column" }}>
        {share ? (
          <>
            <Congratulations message="You have successfully Unstaked" />
            <UserStakingDetailCont>
              <UserStakingDetail
                farmData={farmData}
                noOfTokensStake={5.59656}
                noOfTokensStakeUSD={56.26}
              />
            </UserStakingDetailCont>
            <ViewStakeButton onClick={() => history.push("/mystakes")}>
              View My stake
            </ViewStakeButton>

            <Links>
              <Link>
                <OpenInNewIcon style={{ color: "#616161" }} />
                View in Explorer{" "}
              </Link>
              <Link onClick={() => setShare(false)}>
                <ShareIcon style={{ color: "#616161" }} />
                Share
              </Link>
            </Links>

            <RewardsCont>
              <TransactionViewer 
               approved={approved}
               isLoading={isLoading}
               shareHandler={AddMetamask}
               transactionUrl="#"

              />
             
            </RewardsCont>
          </>
        ) : (
          <>
            <ShareCont>
              <ShareItem>
                <ShareIconImg src={twitter} alt="imgs" />
                <ShareIconText>Share on Twitter</ShareIconText>
              </ShareItem>
              <ShareItem>
                <ShareIconImg src={facebook} alt="facebook" />
                <ShareIconText>Share on Facebook</ShareIconText>
              </ShareItem>
              <ShareItem>
                <ShareIconImg src={telegram} alt="tg" />
                <ShareIconText>Share on Facebook</ShareIconText>
              </ShareItem>
              <ShareItem>
                <ShareIconImg src={linkedin} alt="facebook" />
                <ShareIconText>Share on Facebook</ShareIconText>
              </ShareItem>
            </ShareCont>
          </>
        )}
      </Box>
    </>
  );
}
