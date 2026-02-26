import React from 'react';
import styled from 'styled-components';
import EndsIn from './shared/EndsIn';
import IdoFilled from './shared/IDOFilled';
import PayIn from './shared/PayIn';
import PoolInformation from './shared/PoolInformation';
import Eligibility from './shared/Eligibility';
import { SaleStatus } from 'store/ido/reducer';
import { Views } from 'store/user/reducer';

export interface ViewProps {
  /** project name */
  projectName: string;
  /** project Icon */
  projectIcon: string;
  /** project symbol */
  projectSymbol: string;
  /** eligibilityLabel */
  eligibilityLabel: string;
  /** sale status */
  saleStatus: SaleStatus;
  /** sale end time */
  endTime: number;
  /** payment token icon  */
  paymentTokenIcon: string;
  /** payment token name */
  paymentTokenName: string;
  /** ido filled */
  idoFilled: string;
  /** redirect handler */
  redirectionHandler: () => void;
}

const GridItemCont = styled.div`
  width: 369px;
  height: 367px;
  padding: 30px 17px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 13px;
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
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background: #673ab7;
  box-shadow: 0px 7px 18px -2px rgba(103, 58, 183, 0.56);
  border-radius: 10px;
  justify-content: center;
  font-weight: 600;
  font-size: 15px;
  line-height: 26px;
  border: none;
  cursor: pointer;
`;
const MainButtonComing = styled.button`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #673ab7;
  background: #fff;
  border-radius: 10px;
  justify-content: center;
  font-weight: 600;
  font-size: 15px;
  line-height: 26px;
  border: none;
  border: 1px solid;
  cursor: pointer;
`;

function GridItem({
  projectIcon,
  projectSymbol,
  projectName,
  eligibilityLabel,
  saleStatus,
  endTime,
  paymentTokenName,
  paymentTokenIcon,
  idoFilled,
  redirectionHandler,
}: ViewProps) {
  const getButtons = () => {
    if (saleStatus === SaleStatus.ACTIVE) {
      return (
        <ButtonsCont>
          <DetailsButton>More Details</DetailsButton>
          <MainButton onClick={redirectionHandler}>Check Eligibility</MainButton>
        </ButtonsCont>
      );
    }
    if (saleStatus === SaleStatus.UPCOMING) {
      return (
        <ButtonsCont>
          <DetailsButton>More Details</DetailsButton>
          <MainButtonComing onClick={redirectionHandler}>
            Participate in the IDO
          </MainButtonComing>
        </ButtonsCont>
      );
    }
    if (saleStatus == SaleStatus.SOLD_OUT || SaleStatus.CLOSED) {
      return (
        <ButtonsCont>
          <DetailsButton>More Details</DetailsButton>
        </ButtonsCont>
      );
    }
  };
  return (
    <GridItemCont>
      <PoolInformation
        farmIcon={projectIcon}
        farmName={projectName}
        farmSymbol={projectSymbol}
        state={saleStatus}
        view={Views.GRID}
      />
      <EndsIn endTime={endTime} saleStatus={saleStatus} viewType={Views.GRID} />
      <Eligibility eligiblityLabel={eligibilityLabel} viewType={Views.GRID} />
      <PayIn
        paymentTokenName={paymentTokenName}
        paymentTokenIcon={paymentTokenIcon}
        viewType={Views.GRID}
      />
      <IdoFilled idoFilled={idoFilled} viewType={Views.GRID} />
      {getButtons()}
    </GridItemCont>
  );
}

export default GridItem;
