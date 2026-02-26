import React, { Fragment } from "react";
import { explolers } from "../../constants/chain";
import { miniWalletAddress } from "../../utilities";
import { ExternalLink } from "../ExternalLink";
import Button from "@material-ui/core/Button";
import Style from "styled-components";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useDisconnect } from "../../hooks/useWeb3EagarConnect";
import useOnCopy from "../../hooks/useCopy";
import { useWeb3React } from "@web3-react/core";

const Container = Style.div`
border-radius: 10px;
border: 1px solid #B1B1B1;
margin-top: 15px;
margin-bottom : 15px;
`;
const ConnectWidth = Style.div`
justify-content:flex-start;
display: flex;
margin-top: 1rem;
margin-left: 1rem;
margin-bottom: 1rem;
color:black;
@media only screen and (max-width: 321px) {
   font-size:12px;
}
`;
const WalletIcon = Style.div`
display: flex;
justify-content: flex-start;
alig-iItems: center;
margin-bottom: 1rem;
margin-left: 0.9rem;
@media only screen and (max-width: 321px) {
  font-size:12px;
}
`;
const External = Style.div`
display: flex;
align-items: center;
justify-content: flex-start;
margin-left:1.2rem;
margin-top:0.5rem;
margin-bottom:1rem;
color:grey;
`;
const DisocnnectDiv = Style.div`
display: flex;
justify-content: center;
margin-top: 1rem;
margin-bottom: 1rem;
margin-left: 2rem;
@media only screen and (max-width: 600px) {
  margin-left: 0rem;
}
`;

const ThemeContainer = Style.div`
display: flex;
justify-content: space-between;
margin-right: 1rem;
margin-left: 0.3rem;
align-items: center;
`;

const CopyButton = Style.button`
  margin-right: 7px;
  display: flex;
  align-items: center;
  border: 0px;
  background: transparent;
  cursor: pointer;
  color:grey;
`;

const Connection = Style.div`
display: flex;
    flex-direction: column;
`;

const useStyles = makeStyles((theme: Theme) => ({
  ButtonStyle: {
    width: "126px",
    height: "36px",
    borderRadius: "5px",
    boxShadow: "0 8px 16px rgb(99 56 188 / 13%)",
    backgroundColor: "#F07474",
    color: "white",
    textTransform: "none",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#F07474",
    },
    [theme.breakpoints.between(321, 376)]: {
      width: "96px",
      top: "-15px",
      fontSize: "14px",
    },
    [theme.breakpoints.down(321)]: {
      width: "20px",
      fontSize: "10px",
      left: "2px",
      top: "-18px",
    },
    [theme.breakpoints.between(376, 415)]: {
      top: "-20px",
    },
  },
}));

interface AccountDetailsProps {
  providerName: string;
  providerLogo: string;
  userAddress: string;
  disconnectHandler?: () => void;
}

export const AccountDetails = ({
  providerName,
  providerLogo,
  userAddress,
}: AccountDetailsProps) => {
  const { chainId, account } = useWeb3React();
  const disconnect = useDisconnect();

  const [onCopy, isCopied] = useOnCopy(500, account);

  const classes = useStyles();

  return (
    <Fragment>
      <Container>
        <ThemeContainer>
          <Connection>
            <ConnectWidth>{`Connected with ${providerName}`}</ConnectWidth>
            <WalletIcon>
              <img src={providerLogo} width="28" height="26" />
              <div
                style={{
                  color: "#000000",
                }}
              >
                {miniWalletAddress(userAddress)}
              </div>
            </WalletIcon>
          </Connection>
          <DisocnnectDiv>
            <Button className={classes.ButtonStyle} onClick={disconnect}>
              Disconnect
            </Button>
          </DisocnnectDiv>
        </ThemeContainer>

        <External>
          <CopyButton onClick={onCopy}>
            <ContentCopyIcon />
            {isCopied ? "Copied" : "Copy Address"}
          </CopyButton>
          <ExternalLink
            url={`${explolers[chainId]}/address`}
            path={userAddress}
          />
        </External>
      </Container>
      <div>
        {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontWeight: 700 }}> Recent Transactions</p>
        <p>Clear All</p>
      </div> */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p>Stake 1233223 TKNX</p> <Check />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p>Stake 1233223 TKNX</p>
            <Refreesh />
          </div>
        </div> */}

          <div></div>
        </div>
        {/* <a href="#">See More</a> */}
      </div>
    </Fragment>
  );
};
