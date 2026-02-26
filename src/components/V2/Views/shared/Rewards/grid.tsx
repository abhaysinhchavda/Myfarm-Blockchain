import { RootWrapperGridView } from './styled';
import { RewardGridView, SkeletonCssGridView, Wrapper } from './styled';
import { RewardsProps } from '../types';
import { RewardsAndTippy, TippyContent } from './shared';
import { ImgWrapperGridView } from './styled';
import React from 'react';

export const RewardsGridView = ({ rewards, remainingRewards }: RewardsProps) => {
  return (
    <RootWrapperGridView>
      <Wrapper>
        <RewardGridView>
          Rewards &nbsp;&nbsp;
          {TippyContent()}
        </RewardGridView>
      </Wrapper>

      {!rewards ? (
        <ImgWrapperGridView>
          <SkeletonCssGridView variant="rectangular" width={90} height={25} />
        </ImgWrapperGridView>
      ) : (
        <ImgWrapperGridView>
          {RewardsAndTippy({ rewards, remainingRewards })}
        </ImgWrapperGridView>
      )}
    </RootWrapperGridView>
  );
};
