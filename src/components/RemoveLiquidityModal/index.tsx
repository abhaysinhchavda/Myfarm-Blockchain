import React, { useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextColor } from "../../stylevariable";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { alpha, styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// import SettingsIcon from "@mui/icons-material/Settings";
// import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import Selector from "./Selector";
import MySetting from "../AddLiquidityModal/Sub-Compoent/Setting";
import AmmModal from "../AddLiquidityModal/AmmModal";
import Box from "@mui/material/Box";

import style from "styled-components";
import { createGlobalStyle } from "styled-components";
// import TokenDropDown from "../Exchange/Component/TokenDropdown";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
const GlobalStyle = createGlobalStyle`
  .ConnectDilog .MuiDialog-paperWidthSm {
    width: 429px !important;
    height: 240px !important;
    border-radius: 20px;
  }
  .PoolModal .MuiDialog-paperWidthSm {
    width: 395px !important;
    border-radius: 20px;
    height: auto;
  }
  .StakeModal .MuiDialog-paperWidthSm {
    width: 438px !important;
    border-radius: 20px;
  }
  .SwitchNetworkDilog .MuiDialog-paperWidthSm {
    width: 431px;
    height: 182px;
    border-radius: 20px;
  }
  .myHeaderClass {
    border-bottom: 1px solid rgba(128, 128, 128, 0.34);
    color: black;
    padding: 0.8rem 1rem !important;
    background: linear-gradient(91.69deg, #ecfdff -5.48%, #f2f0ff 111.08%);
  }
  .MuiButton-containedPrimary:hover{
    background-color: #673ab7 !important;
  }
`;

const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            fontSize: "15px",
            borderRadius: "10px",
            color: "#FFF",
            fontWeight: "bold",
            width: "218px",
            height: "55px",
            lineHeight: "26px",
            fontFamily: "Inter",
            margin: "5px",
            backgroundColor: "#673AB7",
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            fontSize: "15px",
            borderRadius: "10px",
            color: "#00C853",
            fontWeight: "normal",
            borderColor: "#00C853",
            width: "218px",
            height: "55px",
            lineHeight: "26px",
            fontFamily: "Inter",
            margin: "5px",
            "&:hover": {
              borderColor: "#00C853",
            },
          },
        },
      ],
    },
  },
});

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    spanText: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px !important",
      },
    },
    Root: {
      width: "515px",
      maxWidth: "100%",
      borderRadius: "18px",
      margin: "0px auto",
      backgroundColor: "#fff",
      boxShadow:
        " 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
      "&>.MuiBackdrop-root": {
        opacity: "0 !important",
      },
      ".MuiDialog-paperWidthSmt": {
        width: "560px",
      },
    },
  })
);

const GasSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#673AB7",
    "&:hover": {
      backgroundColor: alpha("#673AB7", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#673AB7",
  },
}));

declare type ModalProps = {
  open: boolean;
  close: () => void;
  headerClass: string;
  title: string;
};

const ModalContentDiv = style.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
  padding: 0px 15px;
  @media only screen and (max-width: 600px) {
    margin: 0px;
    padding: 10px 0px;
  }
`;

const ModalHeaderIconsDiv = style.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  padding: 20px;
`;
const ModalHeaderDiv = style.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  color:${TextColor.textColor};
  font-weight: 700;
  padding-left: 30px;
  @media only screen and (max-width: 600px) {
        
    padding-left:5px;
   }
`;
const SliderContainer = style.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
        
    flex-direction: column;
   }
    
`;
const SliderHeaderDiv = style.div`
flex: 0.3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const SliderHeaderText = style.div`
font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
`;
const SliderHeaderText2 = style.div`
font-family: 'Inter';
    font-weight: 700;
    font-size: 20px;
`;
const SliderWrapper = style.div`
flex: 0.7;
`;
const SliderContentDiv = style.div`
margin-bottom: 10px;
`;
const SliderContentButtons = style.div`
display: flex;
align-items: center;
justify-content: space-between;
}
`;
const SliderContentButton = style.button`
width: 65px;
height: 34px;
border-radius: 5px;
border: 1px solid #CFCFCF;
display: flex;
align-items: center;
justify-content: center;
background: transparent;
`;
const MainButtons = style.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
@media only screen and (max-width: 600px) {
        
  flex-direction: column;
 }
`;
const CoinContainer = style.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
margin-top:5px;
`;
const CoinContainerInfo = style.div`
display: flex;
align-items: center;

`;
const CoinContainerName = style.p`
font-family: 'Inter';
    font-size: 14px;
    margin: 5px;
`;
const CoinContainerAmount = style.p`
font-weight: 700;
font-family: 'Inter';
font-size: 20px;
`;
const CoinImage = style.img`
width: 54px;
height: 54px;
border-radius: 50%;
margin-right: 10px;
`;
const UnderlinedBtn = style.button`
font-size: 14px;
border: none;
background: none;
color: #673AB7;
text-decoration: underline;
font-weight: 700;
cursor: pointer;
`;
const BtnCont = style.div`
display: flex;
justify-content: left;
width: 100%;
margin-top: 10px;
`;
const DetailsCont = style.div`
width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media only screen and (max-width: 600px) {
        
      flex-direction: column;
     }

`;
function RemoveLiquidityModal(props: ModalProps) {
  const classe = useStyle();
  // const [btnDisabled] = useState(false);
  const [gasSwitch, setGasSwitch] = useState(true);
  const [sliderValue, setSliderValue] = useState<number>(25);
  const [isApproved, setIsApproved] = useState(false);
  const [AmmModaler, setAmmModaler] = useState({
    modal: false,
    addedValue: false,
    unstake: true,
    sucess: false,
    error: false,
    loder: false,
    reward: false,
    msg: <div></div>,
    stakMsg: "",
    transactionStatus: "initial",
  });

  const amm = () => {
    setAmmModaler({ ...AmmModaler, loder: true, unstake: false });
    setTimeout(() => {
      setAmmModaler({ ...AmmModaler, loder: false, unstake: false });
      setAmmModaler({
        ...AmmModaler,
        sucess: true,
        unstake: false,
        reward: true,
        transactionStatus: "submitted",
        msg: <div>Transaction has been submitted successfully</div>,
      });
    }, 1500);
  };

  const addIt = () => {
    setAmmModaler({ ...AmmModaler, addedValue: true });
  };
  const handleSliderChange = (event: Event, newValue: number) => {
    setSliderValue(newValue);
  };
  const handleSliderButtonClick = (value: number) => {
    setSliderValue(value);
  };
  return (
    <div>
      <GlobalStyle />
      <Box
        //open={props.open}
        //onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classe.Root}
      >
        <DialogTitle
          id="alert-dialog-title"
          className={props.headerClass}
          style={{
            borderBottom: "1px solid #80808057",
            color: "black",
            paddingBottom: "0.2rem",
            paddingTop: "0.2rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <ModalHeaderDiv>
            {props.title}
            <ModalHeaderIconsDiv>
              <LocalGasStationIcon
                style={{
                  color: gasSwitch ? "#673AB7" : "#616161",
                  fontWeight: 800,
                  marginRight: "0.5rem",
                }}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <GasSwitch
                      defaultChecked
                      onChange={(event) => {
                        setGasSwitch(event.target.checked);
                      }}
                    />
                  }
                  label={gasSwitch ? "YES" : "NO"}
                />
              </FormGroup>

              <MySetting />
            </ModalHeaderIconsDiv>
          </ModalHeaderDiv>
        </DialogTitle>

        <DialogContent>
          <ModalContentDiv>
            <SliderContainer>
              <SliderHeaderDiv>
                <SliderHeaderText>Amount</SliderHeaderText>
                <SliderHeaderText2>{sliderValue}%</SliderHeaderText2>
              </SliderHeaderDiv>
              <SliderWrapper>
                <SliderContentDiv>
                  <Slider
                    size="small"
                    value={sliderValue}
                    aria-label="Small"
                    valueLabelDisplay="off"
                    onChange={handleSliderChange}
                  />
                </SliderContentDiv>
                <SliderContentButtons>
                  <SliderContentButton
                    onClick={() => handleSliderButtonClick(25)}
                    style={
                      sliderValue === 25
                        ? { color: "#fff", backgroundColor: "#673AB7" }
                        : { color: "#CFCFCF" }
                    }
                  >
                    25%
                  </SliderContentButton>
                  <SliderContentButton
                    onClick={() => handleSliderButtonClick(50)}
                    style={
                      sliderValue === 50
                        ? { color: "#fff", backgroundColor: "#673AB7" }
                        : { color: "#CFCFCF" }
                    }
                  >
                    50%
                  </SliderContentButton>
                  <SliderContentButton
                    onClick={() => handleSliderButtonClick(75)}
                    style={
                      sliderValue === 75
                        ? { color: "#fff", backgroundColor: "#673AB7" }
                        : { color: "#CFCFCF" }
                    }
                  >
                    75%
                  </SliderContentButton>
                  <SliderContentButton
                    onClick={() => handleSliderButtonClick(100)}
                    style={
                      sliderValue === 100
                        ? { color: "#fff", backgroundColor: "#673AB7" }
                        : { color: "#CFCFCF" }
                    }
                  >
                    MAX
                  </SliderContentButton>
                </SliderContentButtons>
              </SliderWrapper>
            </SliderContainer>
            <CoinContainer>
              <CoinContainerInfo>
                <CoinImage
                  src="https://icons-for-free.com/iconfiles/png/512/eth+ethcoin+etherium+icon-1320162857971241492.png  "
                  alt="eth"
                />
                <CoinContainerName>USDT</CoinContainerName>
              </CoinContainerInfo>
              <CoinContainerAmount>0.00</CoinContainerAmount>
            </CoinContainer>
            <Divider style={{ width: "100%" }} />

            <CoinContainer>
              <CoinContainerInfo>
                <CoinImage
                  src="https://www.iconpacks.net/icons/2/free-bitcoin-icon-2207-thumb.png "
                  alt="eth"
                />
                <CoinContainerName>BTC</CoinContainerName>
              </CoinContainerInfo>
              <CoinContainerAmount>0.00</CoinContainerAmount>
            </CoinContainer>
            <BtnCont>
              <UnderlinedBtn>Receive ETH</UnderlinedBtn>
            </BtnCont>
            <DetailsCont>
              <CoinContainerName>Price : 1 ETH = 4221 USDT</CoinContainerName>
              <CoinContainerName>1 USDT = 0.334% ETH</CoinContainerName>
            </DetailsCont>
            <MainButtons>
              <ThemeProvider theme={theme}>
                <Button
                  disabled={!(sliderValue > 0 && !isApproved)}
                  variant="outlined"
                  onClick={() => {
                    setIsApproved(true);
                  }}
                >
                  {isApproved ? " Approved" : " Approve"}
                </Button>
                <Button
                  disabled={!isApproved}
                  variant="contained"
                  onClick={() => {
                    props.close;

                    setAmmModaler({ ...AmmModaler, modal: true });
                  }}
                >
                  Remove
                </Button>
              </ThemeProvider>
            </MainButtons>
          </ModalContentDiv>
        </DialogContent>
      </Box>
      <AmmModal
        title="Swap Confirmation"
        close={() => setAmmModaler({ ...AmmModaler, modal: false })}
        open={AmmModaler.modal}
        unstake={AmmModaler.unstake}
        stakMsg={AmmModaler.stakMsg}
        sucsess={AmmModaler.sucess}
        error={AmmModaler.error}
        msg={AmmModaler.msg}
        loder={AmmModaler.loder}
        addedValue={AmmModaler.addedValue}
        clickUnstake={amm}
        transactionStatus={AmmModaler.transactionStatus}
        click={() => setAmmModaler({ ...AmmModaler, modal: false })}
        class="PoolModal"
        clickAddIt={addIt}
        reward={AmmModaler.reward}
        value1="1 Eth"
        value2="3995USDT"
      />
    </div>
  );
}

export default RemoveLiquidityModal;
