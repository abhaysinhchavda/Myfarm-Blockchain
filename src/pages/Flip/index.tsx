import Divider from '@mui/material/Divider';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import style from 'styled-components';
import PageHeader from '../../components/PageHeader';
import { device } from '../../constants/deviceSizes';
import { useOpenWalletPopUp } from '../../store/application/hooks';
import SelectBox from '../../components/Flip/SelectBox'
import TextValue from 'components/Flip/TextValue';
import TransactionSuccessModal from '../../components/Flip/TransactionSuccessModal'
const FlipCont = style.div`

`;
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
const FlipBody = style.div`
margin-top: 10px;
border-radius: 15px 15px 0 0;
background-color: #fbf8ff;
height: 70vh;
display: flex;
align-items: center;
justify-content: center;
`;
const FlipWrapper = style.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px;
background:white;
margin-top:1rem;
width: 516px;
height: auto;
left: 241px;
top: 441px;
overflow: hidden;
border: 1px solid #D5D5D5;
box-sizing: border-box;
border-radius: 10px;
@media (max-width: 425px) {
  width: 100%;
  overflow: hidden;
  height: 100%;
}
`;
const FlipHeading = style.h2`
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
position:relative;
top:-18px;
`;
const DividerLine = style(Divider)`
  position: relative;
  top: -20px;
  width: 550px;
  left: -20px;
`;
const Wrapper = style.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
width: 100%;
margin: 0 auto;
`;
const ConnectBtn = style.button`
display: flex;
    flex-direction: row;
    -webkit-box-pack: center;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 470px;
    height: 55px;
    color: #fff;
    background: #673AB7;
    box-shadow: 0px 7px 18px -2px rgb(103 58 183 / 56%);
    border-radius: 10px;
    cursor: pointer;
    flex: none;
    font-size: 15px;
    font-weight: 600;
    border: 1px solid #673AB7;
    margin-top: 25px;
    font-family:inter;
    :disabled{
      background: #EFEFEF;
      box-shadow: none;
      border-color: #EFEFEF;
      color: #616161;
    }
    @media (max-width: 425px) {
      width: 135px;
    }
`;
const ApproveBtn = style.button`
display: flex;
    flex-direction: row;
    -webkit-box-pack: center;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 221px;
    height: 55px;
    color: #fff;
    background: #673AB7;
    box-shadow: 0px 7px 18px -2px rgb(103 58 183 / 56%);
    border-radius: 10px;
    cursor: pointer;
    flex: none;
    font-size: 15px;
    font-weight: 600;
    border: 1px solid #673AB7;
    margin-top: 25px;
    font-family:inter;
    :disabled{
      background: #EFEFEF;
      box-shadow: none;
      border-color: #EFEFEF;
      color: #616161;
    }
    @media (max-width: 425px) {
      width: 135px;
    }
`;

const ButtonsCont = style.div`
display: flex;
width: 100%;
align-items: center;
justify-content: space-between;
`;
const ToeknDetailWrapper=style.div`
display: flex;
width: 100%;
align-items: center;
justify-content: space-between;
margin-bottom:1rem;
`
function Flip() {
  const { active } = useWeb3React();
  const open = useOpenWalletPopUp();
  const [is1Loading, set1Loading] = React.useState(false);
  const [is2Loading, set2Loading] = React.useState(false);

  const [approvedToken1, setToken1Approved] = React.useState(false);
  const [approvedToken2, setToken2Approved] = React.useState(false);
  const [isSuccess,setSuccess]=React.useState(false)
  const [isTokenSuccess,setTokenSuccess]=React.useState(false)

  const ConfirmToken1 = () => {
    set1Loading(true);
    setTimeout(() => {
      setToken1Approved(true);
      set1Loading(false);
      setSuccess(true)
    }, 1500);
  };
  const ConfirmToken2 = () => {
    set2Loading(true);
    setTimeout(() => {
      setToken2Approved(true);
      setTokenSuccess(true)
      set2Loading(false);
    }, 1500);
  };
  const CloseModal=()=>
  {
    setSuccess(false)
  }
  const CloseModal2=()=>
  {
    setTokenSuccess(false)
  }
  const getButtonType = () => {
    if (active) {
      return (
        <ButtonsCont>
          {approvedToken1 ? (
            <ApproveBtn
              disabled={approvedToken2}
              style={
                !approvedToken2
                  ? { backgroundColor: '#009F42', borderColor: '#009F42' }
                  : {
                    background: 'auto',
                  }
              }
            >
              Token Approved
            </ApproveBtn>
          ) : (
            <ApproveBtn onClick={ConfirmToken1}>
              {is1Loading && (
                <div style={{ marginRight: '0.2rem' }}>
                  <ClipLoader size={20} color="#fff" />
                </div>
              )}
              Approve Token
            </ApproveBtn>
          )}

          <ApproveBtn
            disabled={!approvedToken1 || approvedToken2}
            onClick={ConfirmToken2}
          >
            {is2Loading && (
              <div style={{ marginRight: '0.2rem' }}>
                <ClipLoader size={20} color="#fff" />
              </div>
            )}
            {approvedToken1 ? '  Approve Token' : 'Flip'}
          </ApproveBtn>
        </ButtonsCont>
      );
    } else {
      return <ConnectBtn onClick={open}>Connect Wallet</ConnectBtn>;
    }
  };
  return (
    <FlipCont>
      <LiquidityHeader>
        <PageHeader
          title="Flip"
          content="Trade tokens in an instant with order routing from the best exchanges"
          hasShowSwitch={false}
        />
      </LiquidityHeader>
      <FlipBody>
        <FlipWrapper>
          <FlipHeading>Flip</FlipHeading>
          <DividerLine />
          <ToeknDetailWrapper>
          <SelectBox/>
          <TextValue/>
          </ToeknDetailWrapper>
          
          <Wrapper>{getButtonType()}</Wrapper>
        </FlipWrapper>
      </FlipBody>
      <TransactionSuccessModal
      open={isSuccess}
      close={CloseModal}
      title="Approved"
      content='Transaction has been approved in  wallet'
      explorer={false}
      />
      <TransactionSuccessModal
      open={isTokenSuccess}
      close={CloseModal2}
      title="Congratulations"
      content='Weve successfully flipped old UFARM tokens to the new ones.'
      explorer={true}
      />
    </FlipCont>
  );
}

export default Flip;
