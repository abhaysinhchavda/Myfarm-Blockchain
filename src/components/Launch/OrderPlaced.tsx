import React from "react";
import style from "styled-components";
import Divider from "@mui/material/Divider";
//import LaunchIcon from "@mui/icons-material/Launch";
import RewardSnackbar from "../Snackbar/RewardSnackBar";
const PlaceWrapper = style.div`
width: 454px;
height: 378px;
margin:0 auto;
margin-top:1rem;
background: #FFFFFF;
border-radius: 15px;
@media (max-width: 425px) {
  width: 100%;

}
`;

const Header = style.div`
padding:20px;
`;

const HeaderText = style.span`
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
display: flex;
align-items: center;
color: #212121;
`;

const ContainWrapper = style.div`
display:flex;
flex-direction:column;
align-items:center;
padding:30px;
`;

const BoldText = style.b`
margin-top:10px;
margin-bottom:10px;
`;

const DetailContent = style.span`
margin-bottom:15px;
color: #212121;
`;

/* const LinkWrapper = style.div`
display:flex;
align-items:center;
justify-content:center;
`; */

interface OrderPlacedProps {
  sellTokenName: string;
  sellTokenLogo: string;
  allocateTokens: number;
}

const OrderPlaced = ({
  sellTokenName,
  sellTokenLogo,
  allocateTokens,
}: OrderPlacedProps) => {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <PlaceWrapper>
        <Header>
          <HeaderText>Order Placed</HeaderText>
        </Header>
        <Divider />
        <ContainWrapper>
          <img src={sellTokenLogo} alt={sellTokenName} />
          <BoldText>Congratulations!</BoldText>
          <DetailContent>
            You have successfully placed the order for ${allocateTokens} worth
            of Gameyoo Tokens.
          </DetailContent>
          <span style={{ color: "#212121" }}>
            The {sellTokenName} team will transfer the tokens to your wallet
            shortly.
          </span>
        </ContainWrapper>
        {/* <LinkWrapper>
          <LaunchIcon style={{ fontSize: 20, color: "#616161" }} />
          &nbsp;
          <span style={{ color: "#616161" }}>View in Explorer</span>
        </LinkWrapper> */}
      </PlaceWrapper>
      <RewardSnackbar
        open={open}
        message="Order Placed Successfully"
        severity="success"
        handleClose={() => setOpen(false)}
      />
    </>
  );
};
export default OrderPlaced;
