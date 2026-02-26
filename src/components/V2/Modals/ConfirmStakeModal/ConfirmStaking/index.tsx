import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Modal from "../../../../Modal/index";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import UserStakingDetail from "../../Common/UserStakingDetails";

import Box from "@mui/material/Box";

import StakeAction from "../StakeAction/index";
import ChildModal from "../StakeTransactionCompleted/index";
import BoosterPack from "../../Common/BoosterPackDetails/index";

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

interface FarmData {
  farmId: number,
  cohortAddress: string,
  farmTokenName: string,
  farmTokenIcon: string,
  cohortVersion: string,
  farmTokenAddress: string,
  APY: number,
}

interface ConfirmStakingModalProps {
  closeModal: () => void;
  farmData: FarmData;
  stakeAmount: number;
  stakeAmountInUSD: number;
  referralAddress: string;
  boosters: Booster[];
};


export default function ConfirmStaking({
  closeModal,
  farmData,
  stakeAmount,
  stakeAmountInUSD,
  referralAddress,
  boosters
}: ConfirmStakingModalProps) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [boosterPackDetails, setBoosterPackDetails] = React.useState<Booster>({
    bpid: 0,
    boosterPackAmount: 0,
    boosterTokenIcon: "",
    boosterTokenName: "",
    boosterTokenTicker: "",
    address: ''
  });
  const [currentBtn, setCurrentBtn] = React.useState(1);
  
  const [complete, setComplete] = React.useState(false);
  const HandleClose = () => {
    setOpen(false);
    setComplete(false);
    closeModal();
  };

  if (complete) {
    return <ChildModal boosted={checked} />;
  } else {
    return (
      <div style={{ width: '100%' }}>
        <Modal
          open={open}
          title="Confirm Staking"
          close={HandleClose}
          className={classes.Modal}
          headerClass="SettingHeader"
        >
          <Box sx={styles}>
            <UserStakingDetail
              farmData={farmData}
              noOfTokensStake={stakeAmount}
              noOfTokensStakeUSD={stakeAmountInUSD}
            />

            <BoosterPack
              setChecked={setChecked}
              checked={checked}
              setBoosterPackDetails={setBoosterPackDetails}
              transaction={true}
              boosters={boosters} />
            <StakeAction
              type={currentBtn}
              setCurrent={setCurrentBtn}
              setComplete={setComplete}
              farmData={farmData}
              stakeAmount={stakeAmount}
              stakeAmountInUSD={stakeAmountInUSD}
              isBoosterPackAvailable={checked}
              transaction={true}
              referralAddress={referralAddress}
              booster={boosterPackDetails}
            />
          </Box>
        </Modal>  
      </div>
    );
  }
}