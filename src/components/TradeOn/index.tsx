import { Button, Divider } from "@material-ui/core";
import Menu, { MenuProps } from "@mui/material/Menu";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import Udfarm from "../../assets/images/others/ufarm_mob.png";
import Unifarmer from "../../assets/images/others/unifarmerer.png";
import useStyles from "../Header/style";

import one from "../../assets/images/New/1.png";
import two from "../../assets/images/New/2.png";
import three from "../../assets/images/New/3.png";
import { useHistory } from "react-router-dom";
import Style from "styled-components";
import { useUnifarmBreakDown } from "../../hooks/useUnifarmBreakDown";
import { formatCurrency, usdCurrencyFormat } from "../../utilities";
import { divide } from "lodash";

const MainPrice = Style.div`
display:flex;
flex-direction: column;
align-items: center;
width: 330px;
height: 130px;
justify-content: center;
`;
const PriceTitle = Style.div`
margin-top: 7px; font-size: 18px; font-weight: 700;
`;
const MenuContaint = Style.div`
display:flex;
width: 303px;
justify-content: space-between;
margin-left: 1rem;
margin-top: 1rem,
`;
const MenuContaintContainer = Style.div`
display: flex;
flex-direction: column;
margin-top: 5px;
`;
const MenuTitle = Style.span`
margin-bottom:0.5rem; font-size: 17px;
margin-top: 0.3rem;
`;
const TradeLink = Style.div`
display: flex; align-items: center
`;
const TradeLinkImage = Style.div`
display: flex;
flex-direction: column;
width: 45%;
align-items: flex-end;
margin-top: 5px;
`;
const TradeOntitle = Style.span`
margin-bottom:0.5rem,
font-size: 17px,
font-weight: 600,
color: #6338BC,
`;
const ActionDiv = Style.div`
display: flex;
justify-content: center;
margin-top: 1rem;
margin-bottom: -4px;
`;
const StyledMenu1 = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
    marginTop: theme.spacing(1),
    minWidth: "331px",
    minHeight: "332px",
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const TradeOn = () => {
  const classes = useStyles();
  const [anchorEl3, setAnchorEl3] = React.useState<null | HTMLElement>(null);
  const open3 = Boolean(anchorEl3);
  const history = useHistory();
  const handleClick3 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const unifarmBreakDown = useUnifarmBreakDown();

  return (
    <div>
      <Button className={classes.HeaderBtn} onClick={handleClick3}>
        <img src={Unifarmer} />
        &nbsp;&nbsp;
        {unifarmBreakDown?.unifarmPrice
          ? usdCurrencyFormat(unifarmBreakDown?.unifarmPrice)
          : "--"}
      </Button>
      <StyledMenu1
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl3}
        open={open3}
        onClose={handleClose3}
      >
        <MainPrice>
          <img src={Udfarm} width="44px" height="47px" />
          <PriceTitle>
            UFARM Price :{" "}
            {unifarmBreakDown?.unifarmPrice
              ? usdCurrencyFormat(unifarmBreakDown?.unifarmPrice)
              : "--"}
          </PriceTitle>
        </MainPrice>
        <Divider />
        <div>
          <MenuContaint>
            <MenuContaintContainer>
              <MenuTitle>Total circulation</MenuTitle>
              <MenuTitle>Total supply</MenuTitle>
              <MenuTitle>Market cap</MenuTitle>
              <MenuTitle>Your balance</MenuTitle>
              <TradeOntitle>Trade On</TradeOntitle>
            </MenuContaintContainer>
            <TradeLinkImage>
              <MenuTitle>
                {unifarmBreakDown?.unifarmMarketCap
                  ? formatCurrency(
                      divide(
                        unifarmBreakDown?.unifarmMarketCap,
                        unifarmBreakDown?.unifarmPrice
                      ),
                      ""
                    )
                  : "--"}
              </MenuTitle>
              <MenuTitle>
                {formatCurrency(unifarmBreakDown?.totalSupply, "")}
              </MenuTitle>
              <MenuTitle>
                {unifarmBreakDown?.unifarmMarketCap
                  ? usdCurrencyFormat(unifarmBreakDown?.unifarmMarketCap)
                  : "--"}
              </MenuTitle>
              <span
                style={{
                  marginBottom: "0.5rem",
                  fontSize: 17,
                  fontWeight: 600,
                  marginTop: "0.3rem",
                }}
              >
                {unifarmBreakDown?.userBalance}
              </span>
              <TradeLink>
                <a href="https://exchange.dfyn.network/#/swap">
                  <img src={one} width={30} style={{ marginRight: "0.6rem" }} />
                </a>
                <a href="https://app.uniswap.org/#/swap">
                  <img src={two} width={30} style={{ marginRight: "0.6rem" }} />
                </a>
                <a href="https://pancakeswap.finance/swap">
                  <img
                    src={three}
                    width={30}
                    style={{ marginRight: "0.6rem" }}
                  />
                </a>
              </TradeLink>
            </TradeLinkImage>
          </MenuContaint>
          <ActionDiv>
            <Button
              style={{ background: "#80808075", color: "black", width: "100%" }}
              onClick={() => {
                return history.push("claim"), setAnchorEl3(null);
              }}
              disabled
            >
              Claim Unifarm
            </Button>
          </ActionDiv>
        </div>
      </StyledMenu1>
    </div>
  );
};
export default TradeOn;
