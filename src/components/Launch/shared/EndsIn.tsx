import React, { useMemo } from 'react';
import styled from 'styled-components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useCountDown } from 'hooks/useMiscellaneous';
import { Views } from 'store/user/reducer';
import { SaleStatus } from 'store/ido/reducer';

const Timer = styled.div<{
  saleStatus: SaleStatus;
}>`
  width: 173px;
  height: 39px;
  background: ${(props) => props.saleStatus === SaleStatus.ACTIVE && '#f0ebf8'};
  background: ${(props) => props.saleStatus === SaleStatus.SOLD_OUT && '#e0e0e0'};
  background: ${(props) => props.saleStatus === SaleStatus.UPCOMING && '#e5eefa'};
  background: ${(props) => props.saleStatus === SaleStatus.CLOSED && '#FFEAEA'};

  color: ${(props) => props.saleStatus === SaleStatus.ACTIVE && '#673ab7'};
  color: ${(props) => props.saleStatus === SaleStatus.SOLD_OUT && '#212121'};
  color: ${(props) => props.saleStatus === SaleStatus.UPCOMING && '#03a9f4'};
  color: ${(props) => props.saleStatus === SaleStatus.CLOSED && '#C62828'};

  border-radius: 5px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  justify-content: center;
  gap: 10px;
  flex: 0.5;
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #616161;
  display: flex;
  justify-content: flex-start;
  flex: 0.5;
`;
const Wrapper = styled.div<{
  viewType: Views;
}>`
  display: flex;
  align-items: ${(props) => (props.viewType === Views.GRID ? 'center' : 'baseline')};
  justify-content: space-between;
  width: 100%;
  margin: ${(props) => (props.viewType === Views.GRID ? '10px 0px' : '0px 30px 0px 0px')};

  flex-direction: ${(props) => (props.viewType === Views.GRID ? 'row' : 'column')};
  height: ${(props) => props.viewType === Views.LIST && '78px'};
`;

interface EndsInProps {
  /** end time */
  endTime: number;
  /** sale status */
  saleStatus: SaleStatus;
  /** View Type : "List" or "Grid" **/
  viewType: Views;
}

function EndsIn({ endTime, saleStatus, viewType }: EndsInProps) {
  const countDown = useCountDown(endTime * 1000);

  const timeString = useMemo(() => {
    return `${countDown.days}D ${countDown.hours}H ${countDown.minutes}M`;
  }, [countDown]);

  return (
    <Wrapper viewType={viewType}>
      <Title>Ends In</Title>
      <Timer saleStatus={saleStatus}>
        <AccessTimeIcon /> {timeString}
      </Timer>
    </Wrapper>
  );
}

export default EndsIn;
