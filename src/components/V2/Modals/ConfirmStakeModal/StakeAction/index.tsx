import React, { useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { makeStyles } from '@material-ui/core/styles';
import style from 'styled-components';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { ClipLoader } from 'react-spinners';
import ErrorState from '../../../ErrorState';
import { useInfiniteApproval } from 'hooks/useInfiniteApproval';
import { useMint, useMintWithBoosterPack } from 'hooks/useMint';
import { useSetConfirmedStaking } from 'store/V2/staked/hooks';

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
const DotWrapper = style.div`
width: 210px;
    align-items: center;
    justify-content: center;
    display: flex;
    margin: 0 auto;
`;
const useStyles = makeStyles((theme) => ({
  timelineItem: {
    minHeight: '50px !important',
    '&:before': {
      display: 'none',
    },
  },
  activeTimelineContent: {
    height: '80px',
    margin: '5px 0px !important',
    border: '1px solid #E0E0E0',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      height: '100%',
    },
  },
  approvedTimelineContent: {
    height: '44px',
    margin: '5px 0px !important',
    border: '1px solid #009F42',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timelineContent: {
    height: '44px',
    margin: '5px 0px !important',
    justifyContent: 'space-between',
    border: '1px solid #E0E0E0',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  timelineConnector: {
    border: '1px dashed #bdbdbd',
    backgroundColor: 'transparent !important',
  },
  timeLine: {
    padding: '0 !important',
    margin: '8px 0px !important',
  },
  timeLineSeparator: {
    paddingRight: '5px',
  },
  timeLineDot: {
    background: '#FFF !important',
    marginTop: '0px !important',
    marginBottom: '0px !important',
  },
  timeLineDotActive: {
    background: '#673AB7 !important',
    marginTop: '0px !important',
    marginBottom: '0px !important',
  },
  timeLineDotApproved: {
    background: '#009F42 !important',
    marginTop: '0px !important',
    marginBottom: '0px !important',
  },
}));

interface FarmData {
  farmId: number;
  cohortAddress: string;
  farmTokenName: string;
  farmTokenIcon: string;
  cohortVersion: string;
  farmTokenAddress: string;
  APY: number;
}

interface Booster {
  bpid: number;
  boosterPackAmount: number;
  boosterTokenIcon: string;
  boosterTokenName: string;
  boosterTokenTicker: string;
  address: string;
}
interface Props {
  type: number;
  setCurrent: Function;
  setComplete: Function;
  farmData: FarmData;
  stakeAmount: number;
  stakeAmountInUSD: number;
  isBoosterPackAvailable: boolean;
  transaction: boolean;
  referralAddress: string;
  booster: Booster;
}

function StakeAction({
  type,
  setCurrent,
  setComplete,
  farmData,
  stakeAmount,
  stakeAmountInUSD,
  isBoosterPackAvailable,
  referralAddress,
  transaction,
  booster,
}: Props) {
  const classes = useStyles();

  // use hooks
  const { approvalStatus, onApprove } = useInfiniteApproval(farmData.farmTokenAddress);

  const ApproveBoosterToken = useInfiniteApproval(booster.address);

  const {
    mintTransactionStatus,
    tokenId,
    transactionHashWithoutBooster,
    onStakeOnUnifarm,
  } = useMint(
    referralAddress,
    stakeAmount,
    farmData.cohortAddress,
    farmData.farmTokenAddress,
    farmData.farmId
  );

  const {
    mintWithBoosterTransactionStatus,
    transactionHashWithBooster,
    onStakeAndBuyBoosterPackOnUnifarm,
  } = useMintWithBoosterPack(
    farmData.cohortAddress,
    farmData.farmTokenAddress,
    referralAddress,
    farmData.farmId,
    booster.bpid,
    stakeAmount
  );

  const setStakedTransaction = useSetConfirmedStaking();

  // handles change when staking token approval called
  useEffect(() => {
    approvalStatus.completed ? setCurrent(2) : null;

    approvalStatus.error ? setCurrent(1) : null;
  }, [approvalStatus, setCurrent]);

  // handles change on staking without booster
  useEffect(() => {
    console.log(tokenId, transactionHashWithoutBooster);
    mintTransactionStatus.completed
      ? setStakedTransaction({
          cohortVersion: farmData.cohortVersion,
          farmName: farmData.farmTokenName,
          sAmount: stakeAmount,
          sAmountInUSD: stakeAmountInUSD,
          transactionHash: transactionHashWithoutBooster,
          tokenId,
        })
      : null;

    mintTransactionStatus.completed ? setComplete(true) : null;

    mintTransactionStatus.error ? setComplete(false) : null;
  }, [
    mintTransactionStatus,
    stakeAmountInUSD,
    transactionHashWithoutBooster,
    setComplete,
    stakeAmount,
    farmData,
    setStakedTransaction,
    tokenId,
  ]);

  // handle change when booster token approvel called
  useEffect(() => {
    ApproveBoosterToken.approvalStatus.completed ? setCurrent(3) : null;

    ApproveBoosterToken.approvalStatus.error ? setCurrent(2) : null;
  }, [ApproveBoosterToken.approvalStatus, setCurrent]);

  // handle changes on staking with booster
  useEffect(() => {
    mintWithBoosterTransactionStatus.completed ? setComplete(true) : null;
    mintWithBoosterTransactionStatus.completed
      ? setStakedTransaction({
          cohortVersion: farmData.cohortVersion,
          farmName: farmData.farmTokenName,
          sAmount: stakeAmount,
          sAmountInUSD: stakeAmountInUSD,
          transactionHash: transactionHashWithBooster,
        })
      : null;

    mintWithBoosterTransactionStatus.error ? setComplete(false) : null;
  }, [
    mintWithBoosterTransactionStatus,
    farmData,
    setComplete,
    transactionHashWithBooster,
    setStakedTransaction,
    stakeAmount,
    stakeAmountInUSD,
  ]);

  // console.log(tokenId);

  if (!isBoosterPackAvailable) {
    return (
      <>
        {type === 1 && (
          <>
            {transaction ? (
              <DotWrapper>
                <TimelineDot className={classes.timeLineDotActive} />
                <TimelineConnector className={classes.timelineConnector} />
                <TimelineDot className={classes.timeLineDot} />
              </DotWrapper>
            ) : null}
            <ErrorState show={approvalStatus.error} error={approvalStatus.errorMessage} />
            <Timeline className={classes.timeLine}>
              <TimelineItem className={classes.timelineItem}>
                <TimelineContent className={classes.activeTimelineContent}>
                  <img src={farmData.farmTokenIcon} width={40} />
                  <VersionWrapper>
                    Please approve the {farmData.farmTokenName} tokens
                  </VersionWrapper>
                  <BoosterStakeButton onClick={onApprove}>
                    {approvalStatus.loading ? (
                      <>
                        <ClipLoader color="white" size={20} />
                        &nbsp;Approve {farmData.farmTokenName}
                      </>
                    ) : (
                      `Approve ${farmData.farmTokenName}`
                    )}
                  </BoosterStakeButton>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </>
        )}
        {type === 2 && (
          <>
            {transaction ? (
              <DotWrapper>
                <TimelineDot className={classes.timeLineDotApproved} />
                <TimelineConnector className={classes.timelineConnector} />
                <TimelineDot className={classes.timeLineDotActive} />
              </DotWrapper>
            ) : null}
            <ErrorState
              show={false}
              error="Please approve the transaction from your wallet"
            />
            <Timeline className={classes.timeLine}>
              <TimelineItem className={classes.timelineItem}>
                <TimelineContent className={classes.activeTimelineContent}>
                  {/* <img src={booster.boosterTokenIcon} width={40} /> */}
                  <VersionWrapper>
                    {/* Please approve the {booster.boosterTokenName} tokens */}
                    Stake the token without booster pack
                  </VersionWrapper>
                  <BoosterStakeButton onClick={() => onStakeOnUnifarm()}>
                    {mintTransactionStatus.loading ? (
                      <>
                        <ClipLoader color="white" size={20} />
                        &nbsp;Stake
                      </>
                    ) : (
                      ` Stake`
                    )}
                  </BoosterStakeButton>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </>
        )}
      </>
    );
  } else
    return (
      <div>
        {type === 1 && (
          <>
            <DotWrapper>
              <TimelineDot className={classes.timeLineDotActive} />
              <TimelineConnector className={classes.timelineConnector} />
              <TimelineDot className={classes.timeLineDot} />
              <TimelineConnector className={classes.timelineConnector} />
              <TimelineDot className={classes.timeLineDot} />
            </DotWrapper>
            <ErrorState
              show={false}
              error="Please approve the transaction from your wallet"
            />
            <Timeline className={classes.timeLine}>
              <TimelineItem className={classes.timelineItem}>
                <TimelineContent className={classes.activeTimelineContent}>
                  <img src={farmData.farmTokenIcon} width={40} />
                  <VersionWrapper>Approve {farmData.farmTokenName} tokens</VersionWrapper>
                  <BoosterStakeButton onClick={() => onApprove()}>
                    {approvalStatus.loading ? (
                      <>
                        <ClipLoader color="white" size={20} />
                        &nbsp;Approve {farmData.farmTokenName}
                      </>
                    ) : (
                      `Approve ${farmData.farmTokenName}`
                    )}
                  </BoosterStakeButton>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </>
        )}
        {type === 2 && (
          <>
            <DotWrapper>
              <TimelineDot className={classes.timeLineDotApproved} />
              <TimelineConnector className={classes.timelineConnector} />
              <TimelineDot className={classes.timeLineDotActive} />
              <TimelineConnector className={classes.timelineConnector} />
              <TimelineDot className={classes.timeLineDot} />
            </DotWrapper>
            <ErrorState
              show={false}
              error="Please approve the transaction from your wallet"
            />
            <Timeline className={classes.timeLine}>
              <TimelineItem className={classes.timelineItem}>
                <TimelineContent className={classes.activeTimelineContent}>
                  <img src={booster.boosterTokenIcon} width={40} />
                  <VersionWrapper>
                    Approve{booster.boosterTokenName} tokens
                  </VersionWrapper>
                  <BoosterStakeButton onClick={() => ApproveBoosterToken.onApprove()}>
                    {ApproveBoosterToken.approvalStatus.loading ? (
                      <>
                        <ClipLoader color="white" size={20} />
                        &nbsp;Approve {booster.boosterTokenName}
                      </>
                    ) : (
                      ` Approve ${booster.boosterTokenName}`
                    )}
                  </BoosterStakeButton>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </>
        )}
        {type === 3 && (
          <>
            <DotWrapper>
              <TimelineDot className={classes.timeLineDotApproved} />
              <TimelineConnector className={classes.timelineConnector} />
              <TimelineDot className={classes.timeLineDotApproved} />
              <TimelineConnector className={classes.timelineConnector} />
              <TimelineDot className={classes.timeLineDotActive} />
            </DotWrapper>
            <ErrorState
              show={false}
              error="Please approve the transaction from your wallet"
            />
            <Timeline className={classes.timeLine}>
              <TimelineItem className={classes.timelineItem}>
                <TimelineContent className={classes.activeTimelineContent}>
                  <VersionWrapper>Stake with Booster Package</VersionWrapper>
                  <BoosterStakeButton onClick={() => onStakeAndBuyBoosterPackOnUnifarm()}>
                    {mintWithBoosterTransactionStatus.loading ? (
                      <>
                        <ClipLoader color="white" size={20} />
                        &nbsp;Stake Now{' '}
                        <RocketLaunchOutlinedIcon style={{ marginLeft: '5px' }} />
                      </>
                    ) : (
                      <>
                        {' '}
                        Stake Now{' '}
                        <RocketLaunchOutlinedIcon style={{ marginLeft: '5px' }} />
                      </>
                    )}
                  </BoosterStakeButton>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </>
        )}
      </div>
    );
}

export default StakeAction;
