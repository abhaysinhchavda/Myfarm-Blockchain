import { makeStyles } from "@material-ui/core/styles";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import Timeline from "@mui/lab/Timeline";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineItem from "@mui/lab/TimelineItem";
import React, { useEffect } from "react";
import { ClipLoader } from 'react-spinners';
import style from "styled-components";
import ErrorState from "../../../ErrorState";
import UserStakingDetail from "../../Common/UserStakingDetails";
import BoosterPack1 from "../../Common/BoosterPackDetails/index"
import BoostTransactionComplete from './BoostTransactionComplete'
import { useBuyBoosterPack } from "hooks/useBuyBoosterPack";

const BoosterStakeButton = style.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 15px;
text-transform: capitalize;
position: static;
font-size: 15px;
font-weight: 500;
height: 40px;
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
@media (max-width: 425px) {
width:100%;
 
 }

`;
const VersionWrapper = style.span`
color: #000000;
font-size: 14px;
font-weight: 400;
margin-left: 0.6rem;
font-family: Inter;
font-style: normal;
width:  100%;
line-height: 24px;
@media (max-width: 425px) {
  text-align:center;
  margin-top:5px;
  margin-bottom:5px;
 
 }
`;

interface Booster {
	bpid: number;
	boosterPackAmount: number;
	boosterTokenIcon: string;
	boosterTokenName: string;
	boosterTokenTicker: string;
	address: string;
}

const boosters: Booster[] = [
	{
		bpid: 1,
		boosterPackAmount: 100,
		boosterTokenIcon: "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/.github/assets/icons/ufarm.png",
		boosterTokenName: "Unifarm Token",
		boosterTokenTicker: "UFARM",
		address: "0xf7745D2e7FdE51c542568F718457d983F761e8C3"
	},
	{
		bpid: 10,
		boosterPackAmount: 150,
		boosterTokenIcon: "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/.github/assets/icons/Polkabridge.png",
		boosterTokenName: "PolkaBridge",
		boosterTokenTicker: "PBR",
		address: "0xC10bbe7DC1701B3f17276CD2665DE8de9EC73aC5"
	}
]

const useStyles = makeStyles((theme) => ({
    timelineItem: {
        minHeight: "50px !important",
        "&:before": {
            display: "none",
        },
    },
    activeTimelineContent: {
        height: "80px",
        margin: "5px 0px !important",
        border: "1px solid #E0E0E0",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            height: '100%'

        }
    },
    approvedTimelineContent: {
        height: "44px",
        margin: "5px 0px !important",
        border: "1px solid #009F42",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    timelineContent: {
        height: "44px",
        margin: "5px 0px !important",
        justifyContent: "space-between",
        border: "1px solid #E0E0E0",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",

    },
    timelineConnector: {
        border: "1px dashed #bdbdbd",
        backgroundColor: "transparent !important",
    },
    timeLine: {
        padding: "0 !important",
        margin: "8px 0px !important",
    },
    timeLineSeparator: {
        paddingRight: "5px",
    },
    timeLineDot: {
        background: "#FFF !important",
        marginTop: "0px !important",
        marginBottom: "0px !important",
    },
    timeLineDotActive: {
        background: "#673AB7 !important",
        marginTop: "0px !important",
        marginBottom: "0px !important",
    },
    timeLineDotApproved: {
        background: "#009F42 !important",
        marginTop: "0px !important",
        marginBottom: "0px !important",
    },
}));

const farmData = {
  farmId: 0,
  cohortAddress: '',
  farmTokenName: '',
  farmTokenIcon: '',
  cohortVersion: '',
  farmTokenAddress: '',
  APY: 0,
}

const tokenId: number = 1;

function BoostTransaction() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(true);
    const [Complete, setComplete] = React.useState(false);

    const [boosterPackDetails, setBoosterPackDetails] = React.useState<Booster>({
        bpid: 0,
        boosterPackAmount: 0,
        boosterTokenIcon: "",
        boosterTokenName: "ETH",
        boosterTokenTicker: "ETH",
        address: ''
    });

    const { buyBoosterStatus, onBuyBooster} = useBuyBoosterPack( farmData.cohortAddress, boosterPackDetails.bpid, tokenId);

    useEffect(() => {
        buyBoosterStatus.completed ? (
            setComplete(true)
        ) : null;
    }, [buyBoosterStatus])

    return (

        <>
            {
                Complete ? <BoostTransactionComplete /> :
                    <>
                        <UserStakingDetail
                            farmData={farmData}
                            noOfTokensStake={5.59656}
                            noOfTokensStakeUSD={56.26}
                        />

                        <BoosterPack1 
                            setChecked={setChecked}
                            checked={checked} 
                            transaction={false}
                            boosters={boosters}
                            setBoosterPackDetails={setBoosterPackDetails} />
                        <ErrorState
                            show={false}
                            error="Please approve the transaction from your wallet"
                        />
                        <Timeline className={classes.timeLine}>
                            <TimelineItem className={classes.timelineItem}>
                                <TimelineContent className={classes.activeTimelineContent}>
                                    <VersionWrapper>Boost the transaction made </VersionWrapper>
                                    <BoosterStakeButton onClick={onBuyBooster}>
                                        {
                                            buyBoosterStatus.loading ? <><ClipLoader color="white" size={20} />&nbsp;Boost Transaction <RocketLaunchOutlinedIcon style={{ marginLeft: "5px" }} /></> : <> Boost Transaction <RocketLaunchOutlinedIcon style={{ marginLeft: "5px" }} /></>
                                        }

                                    </BoosterStakeButton>
                                </TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </>
            }


        </>


    );
}
export default BoostTransaction
