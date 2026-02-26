import React from "react";
import Styled from "styled-components";
import Copy from "../../assets/images/New/copy.png";
import useOnCopy from "../../hooks/useCopy";
const LinkButton = Styled.button`
background: #6338BC;
  border-radius: 10px;
  border: 2px solid #6338BC;
  color: white;
  margin: 0 1em;
  padding: 0.25em 1em;
  height:40px;
  width:170px;
  &:hover {
      cursor:pointer
  }
`;
const IconWrapeer = Styled.div`
display:flex;
align-items:center;
`;
interface ReferralCopyButtonProps {
  referralLink: string;
}

const RefferalCopyButton = ({ referralLink }: ReferralCopyButtonProps) => {
  const [copy, copied] = useOnCopy(500, referralLink);
  return (
    <LinkButton onClick={copy}>
      <IconWrapeer>
        <img src={Copy} width="20" style={{ marginRight: "10px" }} />
        {copied ? "Copied" : "Copy Link"}
      </IconWrapeer>
    </LinkButton>
  );
};
export default RefferalCopyButton;
