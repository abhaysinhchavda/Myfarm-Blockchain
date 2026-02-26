import React from "react";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import style from "styled-components";
import { device } from "../../constants/deviceSizes";

declare type Props = {
  pair: object;
  remove: () => void;
  add: () => void;
};
interface LiquidityItemDetailsProps {
  display: boolean;
}
const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            fontSize: "15px",
            borderRadius: "10px",
            color: "#673AB7",
            fontWeight: "bold",
            border: "1px solid #673AB7",
            width: "250px",
            height: "55px",
            lineHeight: "26px",
            fontFamily: "Inter",
            margin: "25px",
          },
        },
        {
          props: { variant: "contained" },
          style: {
            fontSize: "15px",
            borderRadius: "10px",
            color: "#FFF",
            fontWeight: "bold",
            border: "1px solid #673AB7",
            width: "250px",
            height: "55px",
            margin: "25px",
            lineHeight: "26px",
            fontFamily: "Inter",
            backgroundColor: "#673AB7",
            boxShadow: "0px 7px 18px -2px rgba(103, 58, 183, 0.56)",
          },
        },
      ],
    },
  },
});

const LiquidityItemDiv = style.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 110px;
  border-radius: 10px;
  background: #fff;
  padding: 25px;
  margin: 30px 0;
  cursor: pointer;
`;
const PairInfoDiv = style.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const PairIconsImg = style.img`
  width: 45px;
  height: 45px;
  margin-right: 20px;
`;
const PairNameH = style.h1`
  margin-left: 10px;
  color: #212121;
  font-size: 20px;
  line-height: 24px;
  font-weight: normal;
  font-family: "Inter";
`;

const LiquidityItemDetailsDiv = style.div<LiquidityItemDetailsProps>`
  padding: 0px 25px;
  cursor: pointer;
  ${({ display }) =>
    display &&
    `
    display: none;
  `}
`;
const LiquidityItemContentDiv = style.div<LiquidityItemDetailsProps>`
${({ display }) =>
  display &&
  `
    background: #fff;
    padding-bottom: 30px;
    border-radius: 10px;
  `}

`;
const ItemDetails = style.div`
  display: flex;
  flex-wrap: wrap;
  
`;
const DetailName = style.div`
font-family: "Inter";
font-style: normal;
font-weight: normal;
font-size: 14px;
color: #616161;
display: flex;
flex-direction: column;
align-items: center;
margin: 10px 0px;
width: 25%;
  @media ${device.mobileM} { 
    width:50%;
  }
  @media ${device.laptop} { 
    width:25%;
  }
`;
const DetailValue = style.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  @media ${device.mobileM} { 
    width:50%;
  }
`;
const DetailValueImg = style.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const DetailButtonsDiv = style.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media ${device.mobileS} { 
    flex-direction: column;
  }
  @media ${device.mobileL} { 
    flex-direction: row;
  }
`;
export default function LiquidityItem(props: Props) {
  const [showDetails, setShowDetails] = React.useState(false);
  return (
    <LiquidityItemContentDiv display={showDetails}>
      <LiquidityItemDiv onClick={() => setShowDetails(!showDetails)}>
        <PairInfoDiv>
          <div className="pair-icons">
            <PairIconsImg src={props.pair[0].img} alt={props.pair[0].name} />
            <PairIconsImg src={props.pair[1].img} alt={props.pair[1].name} />
          </div>
          <div className="pair-name">
            <PairNameH>
              {props.pair[0].name + "/" + props.pair[1].name}
            </PairNameH>
          </div>
        </PairInfoDiv>
        <KeyboardArrowDownSharpIcon
          style={{ width: "45px ", height: "45px", color: "#673AB7" }}
        />
      </LiquidityItemDiv>

      <LiquidityItemDetailsDiv display={!showDetails}>
        <ItemDetails>
          <DetailName>
            Your total {props.pair[0].name}/{props.pair[1].name} Pool
            <DetailValue>0.0000001545515</DetailValue>
          </DetailName>
          <DetailName>
            Pooled {props.pair[0].name}
            <DetailValue>
              <DetailValueImg
                src={props.pair[0].img}
                alt={props.pair[0].name}
              />
              515
            </DetailValue>
          </DetailName>
          <DetailName>
            Pooled {props.pair[1].name}
            <DetailValue>1.5</DetailValue>
          </DetailName>
          <DetailName>
            Your Pool share
            <DetailValue>0.001%</DetailValue>
          </DetailName>
        </ItemDetails>

        <DetailButtonsDiv>
          <ThemeProvider theme={theme}>
            <Button variant="outlined" onClick={props.remove}>
              Remove
            </Button>
            <Button variant="contained" onClick={props.add}>
              Add
            </Button>
          </ThemeProvider>
        </DetailButtonsDiv>
      </LiquidityItemDetailsDiv>
    </LiquidityItemContentDiv>
  );
}
