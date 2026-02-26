import React from 'react';
import { SaleStatus } from 'store/ido/reducer';
import { Views } from 'store/user/reducer';
import styled from 'styled-components';

const Timer = styled.div<{
  saleStatus: string;
}>`
  width: ${(props) => props.saleStatus === SaleStatus.ACTIVE && '67px'};
  width: ${(props) => props.saleStatus === SaleStatus.UPCOMING && '93px'};
  width: ${(props) => props.saleStatus === SaleStatus.SOLD_OUT && '83px'};
  width: ${(props) => props.saleStatus === SaleStatus.CLOSED && '72px'};

  height: 32px;
  border-radius: 56px;
  border: 1px solid;
  background: ${(props) => props.saleStatus === SaleStatus.ACTIVE && '#f0ebf8'};
  background: ${(props) => props.saleStatus === SaleStatus.SOLD_OUT && '#e0e0e0'};
  background: ${(props) => props.saleStatus === SaleStatus.UPCOMING && '#e5eefa'};
  background: ${(props) => props.saleStatus === SaleStatus.CLOSED && '#FFEAEA'};

  color: ${(props) => props.saleStatus === SaleStatus.ACTIVE && '#673ab7'};
  color: ${(props) => props.saleStatus === SaleStatus.SOLD_OUT && '#212121'};
  color: ${(props) => props.saleStatus === SaleStatus.UPCOMING && '#03a9f4'};
  color: ${(props) => props.saleStatus === SaleStatus.CLOSED && '#C62828'};

  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  justify-content: center;
  gap: 10px;
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #616161;
  display: flex;
  justify-content: flex-start;
`;
const Wrapper = styled.div<{
  viewType: Views;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: ${(props) => (props.viewType === Views.GRID ? '10px 0px' : '0px')};
  flex-direction: ${(props) => (props.viewType === Views.GRID ? 'row' : 'column')};
  height: ${(props) => props.viewType === Views.LIST && '78px'};
`;

interface SaleStatusComponentProps {
  /** end time */
  saleStatus: SaleStatus;
  /** View Type : "List" or "Grid" **/
  viewType: Views;
}

function SaleStatusComponent({ saleStatus, viewType }: SaleStatusComponentProps) {
  return (
    <Wrapper viewType={viewType}>
      <Title>Status</Title>
      <Timer saleStatus={saleStatus}>{saleStatus}</Timer>
    </Wrapper>
  );
}

export default SaleStatusComponent;
