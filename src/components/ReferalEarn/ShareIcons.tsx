import React from "react";
import {
  TwitterShareButton,
  TelegramShareButton,
  TwitterIcon,
  TelegramIcon,
} from "react-share";
import styled from "styled-components";

const Sharewrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

interface ShareIconsProps {
  referralLink: string;
}
const ShareIcons = ({ referralLink }: ShareIconsProps): JSX.Element => {
  return (
    <Sharewrapper>
      <TwitterShareButton
        url={referralLink}
        title="Refer & Earn Rewards"
        via="unifarm_"
      >
        <TwitterIcon
          round={true}
          size={35}
          style={{ outline: "none", marginRight: 5 }}
        />
      </TwitterShareButton>
      <TelegramShareButton url={referralLink} title="Refer & Earn Rewards">
        <TelegramIcon round={true} size={35} style={{ outline: "none" }} />
      </TelegramShareButton>
    </Sharewrapper>
  );
};
export default ShareIcons;
