import { makeStyles } from "@material-ui/core/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Konfettikanone } from "react-konfettikanone";
import { useHistory } from "react-router-dom";
import style from "styled-components";
import facebook from "../../../../../assets/images/New/Facebook.png";
import linkedin from "../../../../../assets/images/New/linkedin.png";
import telegram from "../../../../../assets/images/New/telegram.png";
import twitter from "../../../../../assets/images/New/twiteer.png";
import Modal from "../../../../Modal/index";
import Congratulation from '../../Common/Congratulation/index';
import UserStakingDetail from "../../Common/UserStakingDetails/index";
import BoostAction from './CompleteTransaction';
import { useConfirmStaking } from "store/V2/staked/hooks";

const modalStyle = {
  top: "50%",
  pt: 2,
  px: 4,
  pb: 3,
  width: "100% !important ",
  padding: "25px 0px",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
};


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
 margin-top: 20px;
 @media (max-width: 425px) {
  width: 100%;
 
 }
 

`;
const ViewStakeButtonN = style.button`
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
width: 200px;
margin: 10px;
margin-top: 60px;
@media (max-width: 425px) {
  width: 100%;
 
 }

`;
const BoostButton = style.button`
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
border:1px solid;
color:#03A9F4;
background: #FFF;

border-radius: 10px;
width: 200px;
margin: 10px;
margin-top: 60px;
@media (max-width: 425px) {
  width: 100%;
  font-size: 13px;
 }

`;

const Links = style.div`
display: flex;
    margin-top: 25px;

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
}`
const StakeButton = style.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

position: static;
width: 100%;
height: 55px;
left: calc(50% - 400px/2);
top: calc(50% - 55px/2 + 97px);
border:none;
/* primary brand/main */
color:white;
background: #673AB7;
box-shadow: 0px 7px 18px -2px rgba(103, 58, 183, 0.56);
border-radius: 10px;
cursor: pointer;
/* Inside auto layout */

flex: none;
order: 2;
flex-grow: 0;
margin: 42px 0px;
@media (max-width: 425px) {
  width: 100%;
 
 }
`;

const NotBoosted = style.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
`;
const useStyles = makeStyles(() => ({
  Modal: {
    overflow: "hidden",
    "&>.MuiDialog-container>.MuiPaper-root": {
      borderRadius: "15px",
      width: "620px",
    },
  },
}));
interface Props {
  boosted: boolean;
}
export default function ChildModal({ boosted }: Props) {
  const [open, setOpen] = React.useState(true);
  const [share, setShare] = React.useState(false);
  const [success, setSuccess] = useState(false);
  const [Boosted,setBoosetd]=useState(false)
  const history = useHistory();
  const classes = useStyles();
  const stakingDetails = useConfirmStaking();

  useEffect(() => {
    setSuccess(true);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setSuccess(true);
  };
  const handleClose = () => {
    setOpen(false);
    setShare(false);
  };

  const OpenLink = (url) => {
    window.open(`https://rinkeby.etherscan.io/tx/${url}`)
  }

  return (
    <>
      <Konfettikanone
        onLaunchEnd={() => setSuccess(false)}
        launch={success}
      ></Konfettikanone>
      <React.Fragment>
        {window.location.pathname === '/v2/stakes' ?null: <StakeButton onClick={handleOpen}>Stake Approved</StakeButton>}
      <Modal
          open={open}
          close={() => handleClose()}
          title={share ? `Share` : "Confirm Staking"}
          headerClass="SettingHeader"
          className={classes.Modal}
        >
          {
            Boosted?<BoostAction/>:
            <Box sx={{ ...modalStyle, flexDirection: "column" }}>
            {!share ? (
              <>
                <Congratulation message="You have successfully Staked" />
                <UserStakingDetail
                  farmData={
                    {
                      farmId: 1,
                      cohortAddress: '',
                      farmTokenName: stakingDetails.farmName,
                      farmTokenIcon: '',
                      cohortVersion: stakingDetails.cohortVersion,
                      farmTokenAddress: '',
                      APY: 46
                    }
                  }
                  noOfTokensStake={stakingDetails.sAmount}
                  noOfTokensStakeUSD={stakingDetails.sAmountInUSD}
                />

                {boosted ? (
                  <ViewStakeButton onClick={() => history.push("/mystakes")}>
                    View My stake
                  </ViewStakeButton>
                ) : (
                  <NotBoosted>
                    <ViewStakeButtonN onClick={() => history.push("/mystakes")}>
                      View My stake
                    </ViewStakeButtonN>{" "}
                    <BoostButton onClick={() => setBoosetd(true)}>
                      <RocketLaunchOutlinedIcon
                        style={{ marginRight: "5px" }}
                      />
                      Boost upto 400%
                    </BoostButton>
                  </NotBoosted>
                )}
                <Links>
                  <Link onClick={()=>OpenLink(stakingDetails.transactionHash)}>
                    <OpenInNewIcon style={{ color: "#616161" }} />
                    View in Explorer{" "}
                  </Link>
                  <Link onClick={() => setShare(true)}>
                    <ShareIcon style={{ color: "#616161" }} />
                    Share
                  </Link>
                </Links>
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
          }
         
        </Modal>
      </React.Fragment>
    </>
  );
}
