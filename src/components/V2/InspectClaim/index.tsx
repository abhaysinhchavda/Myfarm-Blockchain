import React from "react";
import Box from "@mui/material/Box";
import Modal from "../../Modal/index";
import tick from "../../../assets/V2/Detail/tick.svg";
import twitter from "../../../assets/images/New/twiteer.png";
import facebook from "../../../assets/images/New/Facebook.png";
import telegram from "../../../assets/images/New/telegram.png";
import linkedin from "../../../assets/images/New/linkedin.png";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ShareIcon from "@mui/icons-material/Share";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import style from "styled-components";
import TransactionViewer from "../Modals/Common/TransactionViewer";

const modalStyle = {
  top: "50%",
  pt: 2,
  px: 4,
  pb: 3,
  minWidth: "470px !important ",
  padding: "25px",
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
 margin-top: 0px;

`;

const Title = style.h4`
font-size: 15px;
font-weight: 600;
line-height: 26px;
margin-bottom: 0;
`;
const Message = style.h6`
margin: 5px;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 20px;
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
`;
const ShareIconText = style.div`
font-size: 14px;
font-weight: 400;
`;

const MyClaimRewardButton = style.button`
display: flex;
flex-direction: row;
-webkit-box-pack: center;
justify-content: center;
align-items: center;
padding: 0px;
width: 212px;
height: 42px;
color: #673AB7;
background: white;
border-radius: 10px;
cursor: pointer;
flex: none;
font-size: 15px;
font-weight: 600;
border: 1px solid;
margin: 0px 15px;
margin-top:-13px;
margin-right: 0;
font-family:inter;
position: absolute;
right: 0px;

@media (max-width: 425px) {
  width: 130px;
  margin-right: 0px;
}
`;
const RewardsCont = style.div`
display: flex;
width: 100%;
flex-direction: column;
margin-top: 10px;


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
const BoostButton = style.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 15px;
text-transform: capitalize;
font-size: 15px;
font-weight: 600;
height: 55px;
cursor: pointer;
border:1px solid;
color:#673AB7;
background: #FFF;

border-radius: 10px;
width: 270px;
margin: 10px;
margin-top: 0px;

`;
interface Props {
  unStake: boolean;
  setIsModalOpen: Function;
}

export default function ClaimRewards({ unStake, setIsModalOpen }: Props) {
  const [open, setOpen] = React.useState(false);
  const [share, setShare] = React.useState(false);
  const [approved, setApproved] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false)
  const history = useHistory();
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setShare(false);
    setIsModalOpen(false);
  };
  const AddMetamask = () => {
    
    setLoading(true)
    setTimeout(() => {
      setApproved(true)
      setLoading(false)
    }, 1500);
  }
  const getBoostButton = () => {
    if (unStake) {
      return (
        <BoostButton onClick={handleOpen}>
          Unstake and Claim rewards
        </BoostButton>
      );
    } else {
      return (
        <MyClaimRewardButton onClick={handleOpen}>
          Claim Rewards
        </MyClaimRewardButton>
      );
    }
  };

  return (
    <>
      {getBoostButton()}
      <Modal
        open={open}
        close={() => handleClose()}
        title={share ? `Share` : "Transaction Successful"}
        headerClass="SettingHeader"
        className={classes.Modal}
      >
        <Box sx={{ ...modalStyle, flexDirection: "column" }}>
          {!share ? (
            <>
              <img src={tick} alt="img" />
              <Title>Congratulations</Title>
              <Message>You Have Successfully Claimed Rewards</Message>

              <ViewStakeButton onClick={() => history.push("/mystakes")}>
                View My stake
              </ViewStakeButton>

              <Links>
                <Link>
                  <OpenInNewIcon style={{ color: "#616161" }} />
                  View in Explorer{" "}
                </Link>
                <Link onClick={() => setShare(true)}>
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
      </Modal>
    </>
  );
}
