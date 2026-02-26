import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createStyles, makeStyles } from "@material-ui/core/styles";
interface Isprops {
  currentDuration: string
  changeDuration: (e) => void
}
const useStyle = makeStyles((theme) =>
  createStyles({
    root2: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: -25,
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    text: {
      fontFamily: "Inter", color: "#212121"
    },
    root: {
      "&>.MuiButtonBase-root": {
        textTransform: "capitalize !important",
        border: "1px solid #673AB7 !important",
        color: "#673AB7 !important",
        padding: '7px !important',
        borderRadius: 7,
        [theme.breakpoints.down('xs')]: {
          width: '100%'
        }

      },
      "&>.MuiButtonBase-root.Mui-selected": {
        backgroundColor: "#673AB7 !important", color: "white !important"
      }
    }
  })
);

const Duretion2 = ({ changeDuration, currentDuration }: Isprops) => {
  // const [alignment, setAlignment] = React.useState('web');
  const classes = useStyle()


  return (
    <div className={classes.root2}>
      <span className={classes.text}>Stake For</span>
      <ToggleButtonGroup
        color="primary"
        value={currentDuration}
        exclusive
        onChange={changeDuration}
        className={classes.root}
      >
        <ToggleButton value="1">1 Month</ToggleButton>
        <ToggleButton value="3">3 Month</ToggleButton>
        <ToggleButton value="6">6 Month</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
export default Duretion2
