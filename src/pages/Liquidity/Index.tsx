import React, { useState } from "react";
import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
import PageHeader from "../../components/PageHeader";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Loader from "../../components/Loader";
import AddLiquidityModal from "../../components/AddLiquidityModal/Index";
import RemoveLiquidityModal from "../../components/RemoveLiquidityModal";

import LiquidityItem from "../../components/LiquidityItem/Index";
import Notification from "../../components/Notification/Index";
import EmptyLiquidityBody from "./EmptyLiquidityBody";
import style from "styled-components";
import ImportLiquidityModal from "../../components/ImportLiquidityModal/Index";
import { device } from "../../constants/deviceSizes";
const theme = createTheme({
  components: {
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
            margin: "20px",
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
            margin: "20px",
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

const LiquidityHeader = style.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media ${device.mobileL} { 
    flex-direction: row;
  }
  @media ${device.mobileM} { 
    flex-direction: row;
  }
  @media ${device.mobileS}{
    flex-direction: column; 
  }
  @media ${device.tablet}{
    flex-direction: row;
  }
`;
const LiquidityBody = style.div`
  margin-top: 10px;
  border-radius: 15px 15px 0 0;
  background-color: #fbf8ff;
  height: 100vh;
`;
const LiquidityTextP = style.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin-top: 35px;
`;
const ButtonsContainer = style.div`
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: column;


@media ${device.laptop} { 
  flex-direction: row;
width: 45%;

}
`;
function Liquidity() {
  const [loading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [liquidity] = useState([
    [
      {
        name: "ETH",
        img: "https://icons-for-free.com/iconfiles/png/512/eth+ethcoin+etherium+icon-1320162857971241492.png",
      },
      {
        name: "BTC",
        img: "https://www.iconpacks.net/icons/2/free-bitcoin-icon-2207-thumb.png",
      },
    ],
  ]);
  return (
    <div className="liquidity">
      <LiquidityHeader>
        <PageHeader
          title="Liquidity"
          content="Add Liquidity and earn a 0.3% fee on all trades proportional to your contribution in the pool"
          hasShowSwitch={false}
        />

        <ButtonsContainer>
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              onClick={() => {
                setIsAddModalOpen(true);
                setIsEmpty(true);
                setIsRemoveModalOpen(false);
                setIsImportModalOpen(false);
              }}
            >
              Create Pair
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setIsAddModalOpen(true);
                setIsRemoveModalOpen(false);
                setIsEmpty(true);
                setIsImportModalOpen(false);
              }}
            >
              Add Liquidity
            </Button>
          </ThemeProvider>
        </ButtonsContainer>
      </LiquidityHeader>

      <LiquidityBody>
        {loading && <Loader title="Loading pool data" />}
        {isEmpty &&
        !isImportModalOpen &&
        !isAddModalOpen &&
        !isRemoveModalOpen ? (
          <EmptyLiquidityBody />
        ) : (
          <></>
        )}
        {!isEmpty &&
          liquidity.map((item, index) => (
            <LiquidityItem
              pair={item}
              key={index}
              remove={() => {
                setIsEmpty(true);
                setIsRemoveModalOpen(true);
              }}
              add={() => {
                setIsAddModalOpen(true);
                setIsEmpty(true);
              }}
            />
          ))}
        {!isEmpty && (
          <LiquidityTextP>
            Didn’t see a pool you joined ?{" "}
            <span
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsAddModalOpen(false);
                setIsRemoveModalOpen(false);
                setIsEmpty(true);
                setIsImportModalOpen(true);
              }}
            >
              Import Here
            </span>
          </LiquidityTextP>
        )}
        {isAddModalOpen && (
          <AddLiquidityModal
            open={isAddModalOpen}
            close={() => {
              setIsAddModalOpen(false);
              setIsEmpty(false);
            }}
            title="Add Liquidity"
            headerClass=""
          />
        )}
        {isRemoveModalOpen && (
          <RemoveLiquidityModal
            open={isRemoveModalOpen}
            close={() => {
              setIsRemoveModalOpen(false);
              setIsEmpty(false);
            }}
            title="Remove Liquidity"
            headerClass=""
          />
        )}
        {isImportModalOpen && (
          <ImportLiquidityModal
            open={isImportModalOpen}
            close={() => {
              setIsImportModalOpen(false);
            }}
            title="Import Pool"
            headerClass=""
          />
        )}
      </LiquidityBody>

      {showNotification && (
        <Notification closeNotification={() => setShowNotification(false)} />
      )}
    </div>
  );
}

export default Liquidity;
