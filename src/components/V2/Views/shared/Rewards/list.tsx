import { RewardsProps } from "../types";
import { RewardsAndTippy, TippyContent } from "./shared";
import { Wrapper } from "./styled";
import { RewardsListView } from "./styled";
import { ImgWrapperListView } from "./styled";
import { SkeletonCssListView } from "./styled";
import React from 'react';

export const RewardListView = ({ rewards, remainingRewards }: RewardsProps) => {

    return(
        <div>
          <Wrapper>
            <RewardsListView>
              Rewards &nbsp;&nbsp;
              {TippyContent()}
            </RewardsListView>
          </Wrapper>

          {!rewards ? (
            <ImgWrapperListView>
              <SkeletonCssListView variant="rectangular" width={90} height={25} />
            </ImgWrapperListView>
          ) : (
            <ImgWrapperListView>
              {RewardsAndTippy({rewards,remainingRewards})}
            </ImgWrapperListView>
          )}
        </div>
    )
}