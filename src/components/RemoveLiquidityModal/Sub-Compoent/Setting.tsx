import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React from 'react';
import style from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
const useStyles = makeStyles(() => ({
    Root: {
        "&>.MuiPaper-root": {
            width: '32%',
            height: '52%',
            left: '488px !important',
            borderRadius: '10px',
            top: '265px !important'
        }
    },
    ToggleButonRoot: {
        "&>.MuiToggleButton-root": {
            border: '1px solid rgb(154 79 230)',
            width: '106px',
            "&>span": {
                color: 'rgb(154 79 230)'
            }
        }
    }
}));
const HeaderContainer = style.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 17px;
    align-items:center;
`
const ContentWrapper = style.div`
padding-top:1.5rem;
padding-left:1rem;
`
const ToggleContainer = style.div`
margin-top:0.5rem
`
const TextValue = style.div`
color:rgb(154 79 230);
font-size:16px;
margin-top:5px
`
const ErrorValue = style.div`
color:red;
font-size:16px;
margin-top:5px
`
const TransactionContainer = style.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-top:1rem;
    
`
const DeadlineContainer = style.div`
padding-left: 1rem;
margin-top: 1rem;
`
const DeadLineContent = style.div`
    display: flex;
    justify-content: space-between;
    width: 96%;
    margin-top: 0.5rem;
    margin-bottom: 0.3rem;
`
export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const classes = useStyles()
    const [alignment, setAlignment] = React.useState<string | null>('left');
    const Error = false;
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
        setAlignment(newAlignment);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <SettingsIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.Root}
            >
                <div>
                    <HeaderContainer>
                        <span style={{ fontSize: 20, fontWeight: 700 }}>Settings</span>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </HeaderContainer>
                    <Divider style={{ height: 3 }} />
                    <ContentWrapper>
                        <span style={{ fontSize: 18,display:'flex',alignItems:'center'}}>Slippage Tolerance<ContactSupportIcon/></span>
                        <ToggleContainer>
                            <ToggleButtonGroup
                                value={alignment}
                                exclusive
                                onChange={handleAlignment}
                                aria-label="text alignment"
                                className={classes.ToggleButonRoot}
                            >
                                <ToggleButton value="left" aria-label="left aligned">
                                    0.1%
                                </ToggleButton>
                                <ToggleButton value="center" aria-label="centered">
                                    1.5%
                                </ToggleButton>
                                <ToggleButton value="right" aria-label="right aligned">
                                    03%
                                </ToggleButton>
                                <ToggleButton value="justify" aria-label="justified" >
                                    <TextField id="standard-basic" />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </ToggleContainer>

                        {
                            Error ? <ErrorValue>Enter valid slippage tolerance percentage</ErrorValue> : <TextValue>Your transaction may be frontrun</TextValue>
                        }

                    </ContentWrapper>
                    <TransactionContainer>
                        <DeadlineContainer>
                            <span style={{ fontSize: 16 }}>Transaction Deadline</span>
                            <DeadLineContent><span>20</span><span>mins</span>
                            </DeadLineContent>
                            <Divider style={{ height: 1, width: '96%', background: 'black' }} />
                        </DeadlineContainer>
                        <div style={{ marginTop: '1.8rem' }}>
                            <span style={{ fontSize: 15 }}>Unlock Tokens Permanently</span>
                            <Switch
                                checked={state.checkedA}
                                onChange={handleChange}
                                color="primary"
                                name="checkedA"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </div>
                    </TransactionContainer>

                </div>
            </Menu>
        </div>
    );
}
