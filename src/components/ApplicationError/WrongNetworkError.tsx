import React from "react";
import Modal from "../../components/Modal";
import Styled from "styled-components";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { NETWORK } from "../../constants/chain";
import { useApplicationUserState } from "../../store/user/hooks";
//import Button  from "@material-ui/core/Button";

const Head = Styled.span`
font-size:18px;
font-weight:600;
color:#717980
`;

const Primary = Styled.span`
font-size:16px;
font-weight:500;
color:#717980
`;

/* const SwitchButton = Styled(Button)`
border:1px solid #6338BC;
background:transparent;
color:#6338BC;
font-size:14px;
font-weight:700;
text-transform: capitalize;
padding:10px 29px;
&:hover{
   background:#6338bc1f
}
`; */

export default function WrongNetworkError(): JSX.Element {
  const { error } = useWeb3React();
  const { appChainId } = useApplicationUserState();
  const [open,setOpen] = React.useState(true);

  return (
    error instanceof UnsupportedChainIdError && (
      <Modal
        open={open}
        headerClass="Switch-modal"
        className="Switch-wallete"
        close={() => setOpen(false)}
        title="Wrong network"
      >
        <Head>
          Please switch your wallet network {NETWORK[appChainId]} to use the app
        </Head>
        <br />
        <br />
        <Primary>
          If you still encounter problems, you may want to switch to a different
          wallet
        </Primary>
        <br />
        <br />
        {/* <SwitchButton>
                  Switch Wallet
                </SwitchButton> */}
      </Modal>
    )
  );
}
