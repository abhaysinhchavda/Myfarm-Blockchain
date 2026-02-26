import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';
import { useTheme, useMediaQuery } from '@material-ui/core';
import Switch from '@mui/material/Switch';
import { useAppVersion, useSwitchAppVersion } from 'store/V2/dapp/hooks';
import Ave from '../../../assets/images/switch.png';
import { DappVersion } from 'store/V2/dapp/reducer';
import { useHistory } from 'react-router-dom';



const V2Switch = () => {
  const currentVerison = useAppVersion();
  const switchVersion = useSwitchAppVersion();

  const Theme2 = useTheme();
  const Mobile = useMediaQuery(Theme2.breakpoints.down('xs'));
  let history = useHistory();
  const MaterialUISwitch = styled(Switch)<{ version: DappVersion }>(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    fontFamily: 'inter',
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
       color:'#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url(${Ave})`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: currentVerison === DappVersion.V1 ? 'grey': '#6338BC',
      
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${Ave})`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MaterialUISwitch
            version={currentVerison}
            sx={{ m: 1 }}
            checked={currentVerison === DappVersion.V2}
            defaultChecked={currentVerison === DappVersion.V2}
            onChange={(e) => {
              switchVersion(currentVerison === DappVersion.V1 ? DappVersion.V2 : DappVersion.V1)
              if (e.target.checked && (location.pathname === "/farms/v2" || location.pathname === "/farms/v1" ) ) {
                history.push('/farms/v2')
              }
              else if (e.target.checked && location.pathname === "/stakes/v2" ) {
                history.push('/stakes/v2')
              }
              else if (e.target.checked === false && location.pathname === "/stakes/v2") {
                history.push('/stakes/v1')
              }
              else {
                history.push('/farms/v1')
              }
            }
            }
          />
        }
        label={Mobile ? (currentVerison === DappVersion.V1 ? 'V1': 'V2') : (currentVerison === DappVersion.V1 ? 'VERSION 1': 'VERSION 2')}
      />
    </FormGroup>
  );
};
export default V2Switch;
