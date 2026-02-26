import DialogContent from "@material-ui/core/DialogContent";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import React from "react";
import style from "styled-components";
// import Boost from "../../../../assets/V2/Images/boost2.png";
// import Calc from "../../../../assets/V2/Images/calc.png";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import { TextColor } from "../../../stylevariable";
// import CloseIcon from "@mui/icons-material/Close";
import Token1 from "../../../assets/V2/Images/tk1.png";
// import IconButton from "@mui/material/IconButton";
import Modal from "../../Modal/index";

import BoosterPack from "./BoostedAPYDetails";
// import Duration from "./Duration";
import Duration from "./Duration";
// import APYValue from "./SubComponents/APYValue";
// import APYdetails from "./SubComponents/APYdetails";
import Input from "./Input";

const ModalContentDiv = style.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
  @media (max-width: 425px) {
    padding: 0;
  }
`;

const Wrapper = style.div`
width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    @media (max-width: 425px) {
      flex-direction: column;
    gap: 25px;
    }

}`;
const useStyle = makeStyles((theme) =>
  createStyles({
    Root: {
      overflow: "hidden",
      "&>.MuiDialog-container>.MuiPaper-root": {
        borderRadius: "15px",
        width: "550px",
        [theme.breakpoints.down("md")]: {
          margin: "0px",
          width: "330px",
        },
      },
    },

    DialogContent: {
      padding: "0px",
    },
  })
);
// const BoostTitle = style.span`
// font-family: Inter;
// font-style: normal;
// font-weight: normal;
// font-size: 12px;
// line-height: 15px;
// margin-left:9px;
// /* identical to box height */
// cursor: pointer;
// /* primary brand/main */
// color: #005AD1;
// `;
function ApyCalculator() {
  const classe = useStyle();
  const [open, setOpen] = React.useState(true);

  const [value, setValue] = React.useState();
  const [Month, setMonth] = React.useState("3");
  const [TokensInUS, setTokensInUS] = React.useState(1255.0);
  
  const OnChangeHandle = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
    setTokensInUS(e.target.value - 12.15);
  };
  const HandleValue = (e) => {
    console.log(e.target.value);
    if (e.target.value == "1") {
      setMonth("1");
    } else if (e.target.value == "3") {
      setMonth("3");
    } else {
      setMonth("6");
    }
  };
  const HandleClose = () => {
    setOpen(false);
    
  };

  return (
    <>
      <Modal
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classe.Root}
          open={open}
          close={HandleClose}
          title="APY Calculator"
          headerClass="SettingHeader"
        >
          <Box>
          <DialogContent className={classe.DialogContent}>
                <ModalContentDiv>
                  <Wrapper>
                    <Input
                      farmTokenIcon={Token1}
                      numberOfTokens={value}
                      numberOfTokensInUSD={TokensInUS}
                      inputHandler={OnChangeHandle}
                    />

                    <Duration
                      currentDuration={Month}
                      changeDuration={(e) => HandleValue(e)}
                    />
                   
                  </Wrapper>
                  <BoosterPack
                    aggregatedRewardBooster={94.8}
                    aggregatedRewardWithoutBooster={7862.00}
                    APY="223.25"
                    BoostedAPY="22.25"
                    BoosterShow={true}
                  />
                </ModalContentDiv>
              </DialogContent>
          </Box>
        </Modal>
    </>
  );
}

export default ApyCalculator;
