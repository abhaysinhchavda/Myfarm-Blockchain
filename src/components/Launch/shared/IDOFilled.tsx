import React from 'react';
import { Views } from 'store/user/reducer';
import styled from 'styled-components';
import { CircularProgressbarandValue } from './shared';

const Timer = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  flex: 0.5;
  display: flex;
  justify-content: flex-start;
  gap: 5px;
  align-items: flex-end;
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
  margin: ${(props) => (props.viewType === Views.GRID ? '10px 0px' : '0px')};
  flex-direction: ${(props) => (props.viewType === Views.GRID ? 'row' : 'column')};
  height: ${(props) => props.viewType === Views.LIST && '78px'};
`;

interface IDOFilledProps {
  /** ido filled percentage */
  idoFilled: string;
  /**  view type */
  viewType: Views;
}

function IDOFilled({ idoFilled, viewType }: IDOFilledProps) {
  const marginRight = '0rem';

  return (
    <Wrapper viewType={viewType}>
      <Title>IDO Filled </Title>
      <Timer>
        {CircularProgressbarandValue({ poolFilledPercentage: idoFilled, marginRight })}
      </Timer>
    </Wrapper>
  );
}

export default IDOFilled;
