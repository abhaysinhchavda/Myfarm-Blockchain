import React, { useEffect, useState } from "react";
import Error from "../../assets/images/others/errorer.png";
import ConnectWallet from "../../components/Header/ConnectWallet";
import styled from "styled-components";

const OuterWrapper = styled.div`
  margin-top: 150px;
  width: 378px;
  height: 231px;
  margin-left: 350px;
  border: 1px solid;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`;

const ImageStyling = styled.img`
  width: 41px;
  height: 41px;
  margin-left: -20px;
  margin-top: 50px;
`;

const TextMsg = styled.div`
  margin-top: 20px;
`;

const ConnectWalleter = styled.div`
  margin-top: 20px;
  margin-left: -20px;
`;

const WalletNotConnected = () => {
  const [show, setShow] = useState<boolean>(false);
  // display wallet connection issue after 3s

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 3000);
  }, []);

  return (
    show && (
      <OuterWrapper>
        <ImageStyling src={Error} />
        <TextMsg>Connect Wallet to view staked pools </TextMsg>
        <ConnectWalleter>
          <ConnectWallet />
        </ConnectWalleter>
      </OuterWrapper>
    )
  );
};

export default WalletNotConnected;
