import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory } from "react-router-dom";
import style from "styled-components";
import facebook from "../../../../../assets/images/New/Facebook.png";
import linkedin from "../../../../../assets/images/New/linkedin.png";
import telegram from "../../../../../assets/images/New/telegram.png";
import twitter from "../../../../../assets/images/New/twiteer.png";
import Congratulation from '../../Common/Congratulation/index';
import UserStakingDetail from "../../Common/UserStakingDetails/index";


const modalStyle = {
    top: "50%",
    pt: 2,
    px: 4,
    pb: 3,
    minWidth: "470px !important ",
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


const NotBoosted = style.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
`;

interface Props {
    boosted: boolean;

}

const farmData = {
	farmId: 0,
    cohortAddress: '',
    farmTokenName: '',
    farmTokenIcon: '',
    cohortVersion: '',
    farmTokenAddress: '',
    APY: 0,
}

export default function ChildModal({ boosted }: Props) {

    const [share, setShare] = React.useState(false);

    const history = useHistory();
   
    return (
        <>

            <React.Fragment>


                <Box sx={{ ...modalStyle, flexDirection: "column" }}>
                    {!share ? (
                        <>
                            <Congratulation message="You have successfully Staked"/>
                            <UserStakingDetail
                                farmData={farmData}
                                noOfTokensStake={5.59656}
                                noOfTokensStakeUSD={56.26}
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
                                    <BoostButton onClick={() => history.push("/mystakes")}>
                                        <RocketLaunchOutlinedIcon
                                            style={{ marginRight: "5px" }}
                                        />
                                        Boost upto 400%
                                    </BoostButton>
                                </NotBoosted>
                            )}
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
            </React.Fragment>
        </>
    );
}
