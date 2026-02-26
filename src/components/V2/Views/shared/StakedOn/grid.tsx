import { StakedOnProps } from '../types';
import { RootWrapperGrid, Wrapper2, RewardGridView, ImageWrperGrid, DateGrid } from './styled';
import React from 'react';
export const StakedOnGrid = ({ date}: StakedOnProps) => {
  return (
    <RootWrapperGrid>
      <Wrapper2>
        <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
          <RewardGridView>Staked On</RewardGridView>
        </div>
      </Wrapper2>

      <ImageWrperGrid>
        <DateGrid>
          {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
        </DateGrid>
      </ImageWrperGrid>
    </RootWrapperGrid>
  );
};
