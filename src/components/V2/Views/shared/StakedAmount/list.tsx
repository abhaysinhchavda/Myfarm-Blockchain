import { ImgWrperList, RewardListView, RootWrapperListView,AmountList, SkeletonCssList } from "./styled";
import { Wrapper } from "./styled";
import { StakedAmountProps } from "../types";
import React from 'react';


export const StakedAmountList = ({ amount }: StakedAmountProps) => {
    return(
        <RootWrapperListView>
          <Wrapper>
            <RewardListView>Staked Amount</RewardListView>
          </Wrapper>

          <ImgWrperList>
            {!amount ? (
              <SkeletonCssList variant="rectangular" width={100} height={25} />
            ) : (
              <AmountList>{amount}%</AmountList>
            )}
          </ImgWrperList>
        </RootWrapperListView>
    )
}