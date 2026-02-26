import React from "react";
import Box from "@mui/material/Box";
import Modal from "../../../../Modal/index";
import warning from "../../../../../assets/V2/Detail/warning.png";

import { makeStyles } from "@material-ui/core/styles";
import style from "styled-components";

import ClaimRewards from "../UnStakeTransactionCompleted/index";
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
    text-align: center;
`;

const UnStakeButton = style.button`
display: flex;
    flex-direction: row;
    -webkit-box-pack: center;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 193px;
    height: 55px;
    color: #673AB7;
    background: white;
    border-radius: 10px;
    cursor: pointer;
    flex: none;
    font-size: 15px;
    font-weight: 600;
    border: 1px solid;
    margin: 0px 15px;
    font-family:inter;
    :disabled{
        background: white;
        box-shadow: none;
        border-color: #EFEFEF;
        color: #EFEFEF;
    }
    @media (max-width: 425px) {
      width: 140px;
    }
`;
const NotBoosted = style.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
@media (max-width: 425px) {
  flex-direction: column-reverse;
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
font-weight: 600;
height: 55px;
cursor: pointer;
border:none;
color:white;
background: #673AB7;
box-shadow: 0px 7px 18px -2px rgba(103, 58, 183, 0.56);
border-radius: 10px;
width: 270px;
margin: 10px;
margin-top: 0px;

`;
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
    font-family:inter;
    position: absolute;
    right: 0px;
}
`;
const useStyles = makeStyles((theme) => ({
  Modal: {
    overflow: "hidden",
    "&>.MuiDialog-container>.MuiPaper-root": {
      borderRadius: "15px",
      minWidth: "650px",
      opacity: "1",
      [theme.breakpoints.down("sm")]: {
        width: "340px",
        minWidth: "300px",
      },
    },
  },
  ModalClosed: {
    overflow: "hidden",
    "&>.MuiDialog-container>.MuiPaper-root": {
      borderRadius: "15px",
      minWidth: "650px",
      opacity: "0",
    },
  },
}));

interface Props {
  disabled: boolean;
}

export default function UnstakeModal({ disabled }: Props) {
  const [open, setOpen] = React.useState(false);
  const unStake = true;
  const [congrest, setCongrest] = React.useState(true);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <UnStakeButton disabled={disabled} onClick={handleOpen}>
        Unstake & Claim
      </UnStakeButton>

      <Modal
        open={open}
        close={() => handleClose()}
        title={"Confirm Unstaking"}
        headerClass="SettingHeader"
        className={classes.Modal}
      >
        <Box sx={{ ...modalStyle, flexDirection: "column" }}>
          {congrest ? (
            <>
              <img src={warning} alt="img" />
              <Title>Are you sure you want to unstake</Title>
              <Message>
                This is an irreversable action are you sure you want to unstake
                and claim rewards
              </Message>

              <NotBoosted>
                {unStake ? (
                  <BoostButton onClick={() => setCongrest(false)}>
                    Unstake and Claim rewards
                  </BoostButton>
                ) : (
                  <MyClaimRewardButton>Claim Rewards</MyClaimRewardButton>
                )}

                <ViewStakeButtonN onClick={() => handleClose()}>
                  No, Keep staking
                </ViewStakeButtonN>
              </NotBoosted>
            </>
          ) : (
            <ClaimRewards />
          )}
        </Box>
      </Modal>
    </>
  );
}
