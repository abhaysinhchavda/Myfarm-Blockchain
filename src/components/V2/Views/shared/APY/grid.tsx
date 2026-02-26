import { ApyProps } from '../types';
import { ChildWrapper, SkeletonCssGridView,GridRoot,RewardGridView,ImgWrapperGridView,PriceGridView } from './styled';
import { getApyTippyContent } from './shared';
import React from 'react';

export const GridApyView = ({ Apy }: ApyProps) => {
  return (
    <GridRoot>
      <ChildWrapper>
        <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
          <RewardGridView>
            APY &nbsp;&nbsp;
            {getApyTippyContent()}
          </RewardGridView>
        </div>
      </ChildWrapper>

      <ImgWrapperGridView>
        {!Apy ? (
          <SkeletonCssGridView variant="rectangular" width={30} height={25}  />
        ) : (
          <PriceGridView>{Apy}%</PriceGridView>
        )}
      </ImgWrapperGridView>
    </GridRoot>
  );
};
