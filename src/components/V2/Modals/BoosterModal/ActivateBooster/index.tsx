import { makeStyles } from "@material-ui/core/styles";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import Box from "@mui/material/Box";
import React from "react";
import style from "styled-components";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import Modal from "../../../../Modal/index";
// import ChildModal from "../TimelineButton/ChildModal";
import BoosterPack from "../../Common/BoosterPackDetails/index";
import UserStakingDetail from "../../Common/UserStakingDetails";
import ChildModal from "../../ConfirmStakeModal/StakeTransactionCompleted/index";
// import CohortItem from "./SubComponents/CohortItem";
import BoostButton from './BoostButton';
import BoostedTrasaction from '../BoosterTransactionCompleted/index'

// const StakeButton = style.button`
// display: flex;
// flex-direction: row;
// justify-content: center;
// align-items: center;
// padding: 0px;

// position: static;
// width: 100%;
// height: 55px;
// left: calc(50% - 400px/2);
// top: calc(50% - 55px/2 + 97px);
// border:none;
// /* primary brand/main */
// color:white;
// background: #673AB7;
// box-shadow: 0px 7px 18px -2px rgba(103, 58, 183, 0.56);
// border-radius: 10px;
// cursor: pointer;
// /* Inside auto layout */
// font-family:inter;
// flex: none;
// order: 2;
// flex-grow: 0;
// margin: 42px 0px;
// `;

const BoostTitle = style.span`
font-family: Inter;
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
margin-left:9px;
border: 1px solid;
width: 180px;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 10px;
color: #03A9F4;
`;
// const CohortCont = style.div`

// display: flex;
// width: 100%;
// justify-content: space-evenly;
// align-items: center;
// margin-top: 40px;
// `;

// const CohortInnerCont = style.div`
// width: 80%;
// display: flex;
//     align-items: center;
//     justify-content: space-between;
// `;

const styles = {
  padding: "0px 0px",
  borderRadius: "20px !important",
};

const useStyles = makeStyles(() => ({
  Modal: {
    overflow: "hidden",
    "&>.MuiDialog-container>.MuiPaper-root": {
      borderRadius: "15px",
      width: "620px",
    },
  },
}));

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

const farmData = {
	farmId: 0,
  cohortAddress: '',
  farmTokenName: '',
  farmTokenIcon: '',
  cohortVersion: '',
  farmTokenAddress: '',
  APY: 0,
}

export default function ConfirmStaking() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [show, setShow] = React.useState(true)
  const [boosterPackDetails, setBoosterPackDetails] = React.useState<Booster>({
    bpid: 0,
    boosterPackAmount: 0,
    boosterTokenIcon: "",
    boosterTokenName: "ETH",
    boosterTokenTicker: "ETH",
    address: ''
  });

  const [complete, setComplete] = React.useState(false);
  const HandleOpen = () => {
    setOpen(true);
  };
  const HandleClose = () => {
    setOpen(false);
    setComplete(false);
  };
  const ShowCongretulation=()=>
  {
    setShow(false)
  }

  console.log(boosterPackDetails);
  const Transaction=()=>
  {
     if(show)
     {
       return(
        <>
        <UserStakingDetail
          farmData={farmData}
          noOfTokensStake={5.59656}
          noOfTokensStakeUSD={56.26}
        />
        <BoosterPack 
          setChecked={setChecked} 
          checked={checked} 
          transaction={true}
          boosters={boosters}
          setBoosterPackDetails={setBoosterPackDetails}/>
        <BoostButton click={ShowCongretulation}/>
      </>
       )
     }
     else
     {
      <BoostedTrasaction boosted={true}/>
     }
  }

  if (complete) {
    return <ChildModal boosted={checked} />;
  } else {
    return (
      <div >
        <BoostTitle onClick={HandleOpen}>
          <RocketLaunchOutlinedIcon style={{ marginRight: "5px" }} /> Get
          upto 156%
        </BoostTitle>
        {/* <StakeButton onClick={HandleOpen}>Stake</StakeButton> */}
        <Modal
          open={open}
          title="Confirm Transaction"
          close={HandleClose}
          className={classes.Modal}
          headerClass="SettingHeader"
        >
          <Box sx={styles}>
            {
             Transaction()
            }

          </Box>
        </Modal>
      </div>
    );
  }
}
