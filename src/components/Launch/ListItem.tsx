import React from 'react';
import styled from 'styled-components';
import EndsIn from './shared/EndsIn';
import IdoFilled from './shared/IDOFilled';
import PayIn from './shared/PayIn';
import PoolInformation from './shared/PoolInformation';
import Eligibility from './shared/Eligibility';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Status from './shared/SaleStatusComponent';
import { ViewProps } from './GridItem';
import { Views } from 'store/user/reducer';

const ListItemCont = styled.div`
  width: 100%;
  height: 99px;
  display: flex;
  flex-direction: row;
  //   background: #ffffff;
  box-sizing: border-box;
  padding: 0px;
  align-items: start;
  box-shadow: 0px 1px 1px rgb(0 0 0 / 25%);
`;
const ButtonsCont = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const DetailsButton = styled.button`
  font-weight: 600;
  font-size: 15px;
  line-height: 26px;
  color: #673ab7;
  text-decoration-line: underline;
  width: 120px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;
const MainButton = styled.button`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #616161;
  background: transparent;
  border-radius: 10px;
  justify-content: center;
  font-weight: 600;
  font-size: 15px;
  line-height: 26px;
  border: none;
  cursor: pointer;
`;

function ListItem({
  projectIcon,
  projectSymbol,
  projectName,
  saleStatus,
  endTime,
  paymentTokenName,
  paymentTokenIcon,
  idoFilled,
  redirectionHandler,
  eligibilityLabel
}: ViewProps) {
  return (
    <ListItemCont>
      <PoolInformation
        farmIcon={projectIcon}
        farmName={projectName}
        farmSymbol={projectSymbol}
        state={saleStatus}
        view={Views.LIST}
      />
      <Status saleStatus={saleStatus} viewType={Views.LIST} />
      <EndsIn endTime={endTime} saleStatus={saleStatus} viewType={Views.LIST} />
      <Eligibility eligiblityLabel={eligibilityLabel} viewType={Views.LIST} />
      <PayIn
        paymentTokenName={paymentTokenName}
        paymentTokenIcon={paymentTokenIcon}
        viewType={Views.LIST}
      />
      <IdoFilled idoFilled={idoFilled} viewType={Views.LIST} />
      <ButtonsCont>
        <DetailsButton>More Details</DetailsButton>
        <MainButton onClick={redirectionHandler}>
          <ArrowForwardIosIcon height={20} />
        </MainButton>
      </ButtonsCont>
    </ListItemCont>
  );
}

export default ListItem;
