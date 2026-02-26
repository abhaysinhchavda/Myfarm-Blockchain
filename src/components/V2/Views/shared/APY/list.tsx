import { ApyProps } from '../types';
// import { getApyButton } from './shared';
import { ListRoot, SkeletonCssListView } from './styled';
import { Wrapper } from './styled';
import { RewardListView } from './styled';
import { getApyTippyContent } from './shared';
import { ImgWrapperListView } from './styled';
import { PriceListView } from './styled';

import React from 'react';

export const ListAPYView = ({
  Apy,
  hasBoosterAvailable,
  page,
  hasBoosterBuyed,
}: ApyProps) => {
  return (
    <ListRoot
      isboosteravailableornot={hasBoosterAvailable}
      stakewithbooster={hasBoosterBuyed}
      page={page}
    >
      <Wrapper>
        <RewardListView>
          APY &nbsp;&nbsp;
          {getApyTippyContent()}
        </RewardListView>
      </Wrapper>

      <ImgWrapperListView>
        {!Apy ? (
          <SkeletonCssListView variant="rectangular" width={30} height={25} />
        ) : (
          <PriceListView>{Apy}%</PriceListView>
        )}

        
      </ImgWrapperListView>
    </ListRoot>
  );
};
