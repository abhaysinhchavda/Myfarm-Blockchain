import React from 'react';
import style from 'styled-components';
import { Button, makeStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { ClipLoader } from 'react-spinners';
import InputAdornment from '@mui/material/InputAdornment';
import { BUY_STATE } from '../../hooks/useBuyToken';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import RewardSnackbar from '../Snackbar/RewardSnackBar';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import FormHelperText from '@mui/material/FormHelperText';

const CardWrapper = style.div`
display: flex;
flex-direction: column;
align-items: flex-start;
margin:0 auto;
margin-top:2rem;
width: 454px;
height: 499.09px;


/* background/main */

background: #FFFFFF;
/* font/disabled */

border: 1px solid  rgba(224, 224, 224, 1);
box-sizing: border-box;
box-shadow: 4px 4px 25px #E0E0E0;
border-radius: 15px;
@media (max-width: 425px) {
  width: 100%;

}
    `;

const CardTitle = style.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:0 auto;
    margin-top:2rem;
    width: 454px;
    height: 96px;

    font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 22px;
text-align: center;

/* font/body */

color: #616161;

    
    
    /* background/main */
    
    background: #FFFFFF;
    /* font/disabled */
    
    border: 1px solid  rgba(224, 224, 224, 1);
    box-sizing: border-box;
    box-shadow: 4px 4px 25px #E0E0E0;
    border-radius: 15px;
    @media (max-width: 425px) {
      width: 100%;
    
    }
        `;
const TextHeader = style.span`
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
margin-top:1rem;
margin-bottom:1rem;
margin-left:20px;
`;
const AligableText = style.span`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 19px;
margin-top:2rem;
text-align:left
`;
const LinkWrapper = style.div`
display:flex;
align-items:center;
margin-top:2rem;
margin-bottom:2rem;
`;
const LinkText = style.span`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 19px;

`;
const ButtonWrapper = style.div`
display:flex;
align-items:center;
justify-content:space-between;
width:100%;
`;

interface PurchaseProps {
  approvalLoading: boolean;
  approvalStatus: boolean;
  approveCallback: () => void;
  buyStatus: BUY_STATE;
  buyCallback: () => void;
  idoTokenIcon: string;
  idoTokenTicker: string;
  sellTokenIcon: string;
  sellTokenTicker: string;
  notEligible: boolean;
  allocateTokens: number;
  balance: number;
  errorMessage: string
  solanaAddress: string,
  solanaInputHandler: (solanaAddress: string) => void;
}

const Purchase = ({
  approvalLoading,
  approvalStatus,
  approveCallback,
  buyStatus,
  buyCallback,
  idoTokenIcon,
  idoTokenTicker,
  sellTokenTicker,
  sellTokenIcon,
  notEligible,
  allocateTokens,
  balance,
  errorMessage,
  solanaAddress,
  solanaInputHandler
}: PurchaseProps) => {
  const useStyles = makeStyles((theme) => ({
    ApproveButton: {
      width: '196px',
      height: '55px',
      color: 'white',
      background: approvalStatus ? 'Green' : notEligible ? '#EFEFEF' : '#673AB7',
      textTransform: 'capitalize',
      boxShadow: notEligible ? 'unset' : '0px 7px 18px -2px rgba(103, 58, 183, 0.56)',
      borderRadius: '10px',
      [theme.breakpoints.down('xs')]: {
        width: '48%',
      },
      '&:hover': {
        background: approvalStatus ? 'Green' : notEligible ? '#EFEFEF' : '#673AB7',
      },
      '&:disabled':{
        color: 'white !important',
        cursor: 'not-allowed !important'
      }
    },
    PurchaseButton: {
      width: '196px',
      height: '55px',
      textTransform: 'capitalize',
      color: 'white',
      background: approvalStatus ? '#673AB7' : '#EFEFEF',
      borderRadius: '10px',
      [theme.breakpoints.down('xs')]: {
        width: '48%',
      },
      '&:hover': {
        background: '#673AB7',
      },
    },
    Devider: {
      width: '100%',
      height: '1px',
      marginTop: '2rem',
      background: 'black',
    },
    InsufficiantButton: {
      width: '402px',
      height: '55px',
      left: '0px',
      top: '0px',
      color: 'white !important',
      textTransform: 'capitalize',
      background: '#C62828',
      borderRadius: '10px',
      flex: 'none',
      order: 0,
      flexGrow: 0,
      margin: '0px 10px',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
      '&:hover': {
        background: '#C62828',
      },
    },
    cardTitle: {
      width: '424px',
      height: '66px',
      marginTop: '10px',
    },
    link: {
      color: '#673AB7',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  }));
  const classes = useStyles();
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down('xs'));
  const [Open, setOpen] = React.useState(notEligible);

  const [Open2, setOpen2] = React.useState(true);

  const helperTextStyles = makeStyles((theme) => ({
    root: {
      margin: 4,
      '&$error': {
        color: 'red'
      }
    },
    error: {
      '&.MuiFormHelperText-root.Mui-error': {
        color: theme.palette.error.main,
      },
    },
  }));

  const helperTestClasses = helperTextStyles();
  return (
    <>
      <CardTitle>
        <div className={classes.cardTitle}>
          Participate in Cohort v36 to be eligible for the upcoming Gameyoo IDO.{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://unifarm.co/launch"
            className={classes.link}
          >
            Click here
          </a>
          &nbsp; to know more.
        </div>
      </CardTitle>
      <CardWrapper>
        <TextHeader>Purchase Token</TextHeader>
        {mobile ? null : <Divider className={classes.Devider} />}
        <div style={{ padding: 20, width: '100%', textAlign: 'left' }}>
          <AligableText>You are eligible for ${allocateTokens} worth token</AligableText>
          <LinkWrapper>
            <img src={sellTokenIcon} width={55} />
            &nbsp;&nbsp;&nbsp;
            <LinkText>{sellTokenTicker}</LinkText>
          </LinkWrapper>
          <TextField
            id="input-with-icon-textfield"
            label="Pay using"
            value={idoTokenTicker}
            style={{ width: '100%', marginBottom: '3rem' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={idoTokenIcon} width={25} />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <div style={{ width:"412px", height:"77.91px"}}>
          <TextField
            id="input-with-icon-textfield"
            label="Enter the solana address"
            style={{ width: '100%', marginBottom: '3rem' }}
            variant="standard"
            value={solanaAddress}
            onChange={(e) => solanaInputHandler(e.target.value)}
            FormHelperTextProps={{ classes: helperTestClasses }}
          />
          <FormHelperText id="component-error-text" error style={{marginTop:"-40px"}}>
              {errorMessage}
            </FormHelperText>

          </div>
          <div style={{ marginTop: '10px', marginBottom: '1rem' }}>
            <a style={{ color: '#673AB7', textDecoration: 'underline' }}>Click here</a> to
            know how to copy solana address
          </div>
          {balance > 0 || notEligible == true ? (
            <ButtonWrapper>
              {approvalStatus || notEligible ? (
                <Button className={classes.ApproveButton}>
                  Aprrove {idoTokenTicker}
                </Button>
              ) : (
                <Button
                  className={classes.ApproveButton}
                  onClick={approveCallback}
                  disabled={notEligible || errorMessage ? true : false}
                >
                  {approvalLoading ? (
                    <>
                      <ClipLoader size={20} color="white" />
                      &nbsp;&nbsp;Aprrove {idoTokenTicker}
                    </>
                  ) : (
                    'Aprrove' + ' ' + idoTokenTicker + ''
                  )}
                </Button>
              )}
              <Button
                className={classes.PurchaseButton}
                onClick={buyCallback}
                disabled={approvalStatus || !notEligible ? false : true}
              >
                {buyStatus === BUY_STATE.LOADING ? (
                  <>
                    <ClipLoader size={20} color="white" />
                    &nbsp;&nbsp;Purchase
                  </>
                ) : (
                  'Purchased'
                )}
              </Button>
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              <Button className={classes.InsufficiantButton} disabled>
                Insufficient Balance
              </Button>
            </ButtonWrapper>
          )}
        </div>
      </CardWrapper>
      {mobile ? null : notEligible ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          <a href="https://unifarm.co/launch" style={{ color: '#212121' }}>
            How To Participate
          </a>
          &nbsp;
          <Tippy theme="light" placement="top" content="Help Content">
            <HelpOutlineIcon style={{ fontSize: 20 }} />
          </Tippy>
        </div>
      ) : (
        false
      )}
      {notEligible ? (
        <RewardSnackbar
          open={Open}
          severity="error"
          message="You are not eligible for IDO"
          handleClose={() => setOpen(false)}
        />
      ) : (
        <RewardSnackbar
          open={Open2}
          severity="success"
          message="You are eligible for IDO"
          handleClose={() => setOpen2(false)}
        />
      )}
    </>
  );
};

export default Purchase;
