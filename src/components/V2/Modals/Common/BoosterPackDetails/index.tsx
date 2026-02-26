import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import rocketImage from "../../../../../assets/images/BoosterPackRocket.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import style from "styled-components";
const BoosterPackBannerCont = style.div`
display: flex;
    padding: 0px 20px;
    margin: 5px 0px;
    margin-bottom: 20px;
    align-items: center;
    
    justify-content: left;
`;
const Row = style.div`
display: flex;
width: 100%;
align-items: center;
justify-content: space-between;
`;
const RocketImage = style.img`

object-fit: cover;
width: 70px;
margin: 10px 10px 0px 0px;
@media (max-width: 425px) {
  width: 0px;
 
 }
`;

const BannerDetails = style.div`
width: 50%;
@media (max-width: 425px) {
  width: 100%;
 
 }
`;

const Column = style.h6`
flex: 0.5;
    font-size: 14px;
    font-weight: 400;
    color: #616161;
    margin: 5px 0px;
`;
const BannerValues = style.h2`
flex: 0.5;
font-size: 20px;
font-weight: 700;
color: #4527A0;
margin: 0px;
`;
const DropdownCont = style.div`
display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 15px;
    margin-top: 15px;
`;
const BoosterPackCont = style.div`
width: 100%;
    border: 1px solid #E0E0E0;
    margin: 15px 0px;
    border-radius: 10px;
margin-top:40px;
`;

interface Booster {
  bpid: number;
  boosterPackAmount: number;
  boosterTokenIcon: string;
  boosterTokenName: string;
  boosterTokenTicker: string;
  address: string;
}

interface Props {
  setBoosterPackDetails: Function;
  setChecked: Function;
  checked: boolean;
  transaction: boolean;
  boosters: Booster[];
}

function BoosterPack({ setChecked, checked, transaction, boosters, setBoosterPackDetails }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const [selectedToken, setSelectedToken] = React.useState("");

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSelectedToken(event.target.value);
    const booster = boosters.filter(b => b.bpid === Number(event.target.value))
    setBoosterPackDetails(booster[0]);
  };

  return (
    <>
      {
        transaction ?
          <BoosterPackCont>
            <div
              style={
                checked
                  ? {
                    padding: "20px 30px",
                    borderBottom: "2px solid #E0E0E0",
                  }
                  : {
                    border: "none !important",
                    padding: "20px 30px",
                  }
              }
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name="gilda"
                    sx={{
                      color: "#6338BC",
                      "&.Mui-checked": {
                        color: "#6338BC",
                      },
                    }}
                  />
                }
                label="Earn higher APY with booster packs"
              />
            </div>
            {checked && (
              <div>
                {/* <TokenDropDownTitle>
          Choose Token for Booster
        </TokenDropDownTitle>
        <TokenSelector /> */}
                <DropdownCont>
                  <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Choose Token for Booster
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={selectedToken}
                      onChange={handleChangeSelect}
                    >
                      <MenuItem value={""} disabled>
                        Select Token
                      </MenuItem>
                      { 
                        boosters.map((booster, i) => <MenuItem key={i} value={booster.bpid} >{booster.boosterTokenName}</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                </DropdownCont> 
               <BoosterPackBannerCont>
                  <RocketImage src={rocketImage} width={70} alt="Rocket" />
                  <BannerDetails>
                    <Row>
                      <Column>Boosted APY</Column>
                      <Column>Boosted Tokens</Column>
                    </Row>
                    <Row>
                      <BannerValues>200%</BannerValues>
                      <BannerValues>20 UFarm</BannerValues>
                    </Row>
                  </BannerDetails>
                </BoosterPackBannerCont>
              </div>
            )}
          </BoosterPackCont>

          :
          <BoosterPackCont>
            <DropdownCont>
              <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Choose Token for Booster
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedToken}
                  onChange={handleChangeSelect}
                >
                  <MenuItem value={""} disabled>
                    Select Token
                  </MenuItem>

                  { 
                    boosters.map((booster, i) => <MenuItem key={i} value={booster.bpid} >{booster.boosterTokenName}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </DropdownCont>

            <BoosterPackBannerCont>
              <RocketImage src={rocketImage} width={70} alt="Rocket" />
              <BannerDetails>
                <Row>
                  <Column>Boosted APY</Column>
                  <Column>Boosted Tokens</Column>
                </Row>
                <Row>
                  <BannerValues>200%</BannerValues>
                  <BannerValues>20 UFarm</BannerValues>
                </Row>
              </BannerDetails>
            </BoosterPackBannerCont>
          </BoosterPackCont>
      }
    </>

  );
}

export default BoosterPack;
