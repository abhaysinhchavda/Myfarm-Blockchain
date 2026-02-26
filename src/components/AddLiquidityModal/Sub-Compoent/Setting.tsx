import { IconButton } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import SettingsIcon from "@material-ui/icons/Settings";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import style from "styled-components";
import Modal from "../../Modal/index";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

const useStyles = makeStyles((theme) => ({
  Root: {
    "&>.MuiPaper-root": {
      width: "32%",
      height: "52%",
      left: "488px !important",
      borderRadius: "10px",
      top: "265px !important",
    },
  },
  ToggleButonRoot: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    "&>.MuiToggleButton-root": {
      border: "1px solid rgb(154 79 230)",
      width: "106px",
      height: "42px",
      "&>span": {
        color: "rgb(154 79 230)",
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
  },
}));

const ContentWrapper = style.div`
padding-top:1rem;
padding-left:1rem;
`;
const ToggleContainer = style.div`
margin-top:0.5rem
`;
const TextValue = style.div`
color:rgb(154 79 230);
font-size:16px;
margin-top:5px
`;
const ErrorValue = style.div`
color:red;
font-size:16px;
margin-top:5px
`;
const TransactionContainer = style.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-top:1rem;
    padding-bottom:1.5rem;
padding-left:1rem;
    @media only screen and (max-width: 600px) {
        flex-direction:column
      }
`;
const DeadlineContainer = style.div`
padding-left: 1rem;
margin-top: 1rem;
@media only screen and (max-width: 600px) {
    width:100%
  }
`;
const DeadLineContent = style.div`
    display: flex;
    justify-content: space-between;
    width: 96%;
    margin-top: 0.5rem;
    margin-bottom: 0.3rem;
`;
export default function SimpleMenu() {
  const classes = useStyles();
  const [alignment, setAlignment] = React.useState<string | null>("left");
  const Error = false;
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const [open, setOpen] = React.useState(false);
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };
  const HandleOpen = () => {
    setOpen(true);
  };
  // const handleClose = () => {

  // };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={HandleOpen}
      >
        <SettingsIcon style={{ color: "black" }} />
      </IconButton>
      <Modal
        open={open}
        title="Settings"
        close={() => setOpen(false)}
        className="SettingModal"
        headerClass="SettingHeader"
      >
        <div>
          <ContentWrapper>
            <span
              style={{ fontSize: 18, display: "flex", alignItems: "center" }}
            >
              Slippage Tolerance
              <Tippy theme="light" placement="top" content="Some Text">
                <IconButton>
                  <ContactSupportIcon style={{ color: "black" }} />
                </IconButton>
              </Tippy>
            </span>
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
                <ToggleButton value="justify" aria-label="justified">
                  <TextField id="standard-basic" />
                </ToggleButton>
              </ToggleButtonGroup>
            </ToggleContainer>

            {Error ? (
              <ErrorValue>Enter valid slippage tolerance percentage</ErrorValue>
            ) : (
              <TextValue>Your transaction may be frontrun</TextValue>
            )}
          </ContentWrapper>
          <TransactionContainer>
            <DeadlineContainer>
              <span style={{ fontSize: 16 }}>Transaction Deadline</span>
              <DeadLineContent>
                <span>20</span>
                <span>mins</span>
              </DeadLineContent>
              <Divider
                style={{ height: 1, width: "96%", background: "black" }}
              />
            </DeadlineContainer>
            <div style={{ marginTop: "1.8rem" }}>
              <span style={{ fontSize: 12 }}>Unlock Tokens Permanently</span>
              <Switch
                checked={state.checkedA}
                onChange={handleChange}
                color="primary"
                name="checkedA"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </TransactionContainer>
        </div>
      </Modal>
    </div>
  );
}
