import React from 'react';
import { Button, makeStyles, Theme } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import trees from '../../assets/V2/Images/trees.png';
import { useOpenWalletPopUp } from '../../store/application/hooks';
import Timer from '../../assets/V2/Images/timer.png';
import QnMark from '../../assets/V2/Images/qnmark.png';
import { useCountDown } from 'hooks/useMiscellaneous';

const Empty = ({ startTime }: { startTime: number }) => {
  const countDown = useCountDown(new Date(startTime));

  const useStyles = makeStyles((theme: Theme) => ({
    muiGrid: {
      '&>.MuiGrid-root .MuiPaper-root': {
        boxShadow: 'none',
        background: 'transparent',
        borderRadius: 10,
        marginTop: '1.5rem',
        [theme.breakpoints.down('xs')]: {
          background: '#FFFFFF',
        },
      },
    },
    paperOn: {
      ...theme.typography.body2,
      border: '1px solid #E0E0E0',
      marginTop: '10px',
      height: '396px',
      padding: theme.spacing(4),
      borderRadius: 20,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 0.5px rgba(6, 10, 13, 0.4), 0 8px 16px rgba(113, 121, 128, 0.08)',
    },
    trees: {},
    noff: {
      width: '274px',
      height: '55px',
      color: 'white',
      background: '#673AB7',
      marginTop: '1rem',
      boxShadow: '0px 7px 18px -2px rgba(103, 58, 183, 0.56)',
      borderRadius: '10px',

      '&:hover': {
        background: '#673AB7',
      },
    },

    participation: {
      marginTop: '20px',
      display: 'flex',
      alignItems: 'space-between',
      justifyContent: 'space-between',
      width: '500px',
    },
    howto: {
      marginTop: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '500px',
    },
    gameyoo: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '24px',

      color: '#212121',
    },
    timer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '200px',
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '24px',

      color: '#212121',
    },
  }));

  const classes = useStyles();

  const openWalletModal = useOpenWalletPopUp();
  return (
    <>
      <Grid container className={classes.muiGrid}>
        <Grid item xs={12}>
          <Paper className={classes.paperOn}>
            <img src={trees} width={406} height={160} className={classes.trees} />
            <Button
              className={classes.noff}
              style={{ textTransform: 'capitalize' }}
              onClick={() => openWalletModal()}
            >
              Connect Wallet
            </Button>
            {countDown.days > 0 && (
              <>
                <div className={classes.participation}>
                  <span className={classes.gameyoo}>
                    GameYoo IDO participation starting
                  </span>
                  <span className={classes.timer}>
                    <img
                      src={Timer}
                      width={20}
                      height={20}
                      style={{ marginTop: '2px' }}
                    />
                    1{countDown.days} Days {countDown.hours} Hours {countDown.minutes}{' '}
                    Mins
                  </span>
                </div>
                <div className={classes.howto}>
                  How to participate? &nbsp;&nbsp; <img src={QnMark} />
                </div>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default Empty;
