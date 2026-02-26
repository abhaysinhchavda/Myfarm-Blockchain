import { StakedAmountProps } from '../types';
import {
  ImageWrperGrid,
  AmountGrid,
  RewardGridView,
  RootWrapperGridView,
  SkeletonCssGrid,
  ChildWrapper,
} from './styled';
import React from 'react';

export const StakedAmountGrid = ({ amount }: StakedAmountProps) => {
  return (
    <RootWrapperGridView>
      <ChildWrapper>
        <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
          <RewardGridView>Staked Amount</RewardGridView>
        </div>
      </ChildWrapper>
      <ImageWrperGrid>
        {!amount ? (
          <SkeletonCssGrid variant="rectangular" width={100} height={25} />
        ) : (
          <AmountGrid>{amount}%</AmountGrid>
        )}
      </ImageWrperGrid>{' '}
    </RootWrapperGridView>
  );
};
