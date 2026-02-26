import { RootWrapperList,Wrapper,RewardListView, ImageWrperList, DateList } from './styled';
import { StakedOnProps } from '../types';
import React from 'react';

export const StakedOnList = ( {date } : StakedOnProps) => {
  return (
    <RootWrapperList>
      <Wrapper>
        <RewardListView>Staked On</RewardListView>
      </Wrapper>

      <ImageWrperList>
        <DateList>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</DateList>
      </ImageWrperList>

    </RootWrapperList>
  );
};
