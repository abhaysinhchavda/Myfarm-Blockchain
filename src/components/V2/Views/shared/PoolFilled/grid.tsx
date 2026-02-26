import { PoolFilledProps } from "../types";
import { FillNameGridView, RootWrapperGridView } from "./styled";
import { Fillwraper } from "./styled";
import { PoolFilledTippyContent, CircularProgressbarandValue } from "./shared";
import { PricewraperGridView } from "./styled";
import React from 'react';


export const PoolFilledGrid = ({ poolFilledPercentage }: PoolFilledProps) => {
  const marginRight = "0.2rem";
    return(
        <RootWrapperGridView>
          <Fillwraper>
            <FillNameGridView>
              Pool Filled&nbsp;&nbsp;
              {PoolFilledTippyContent()}
            </FillNameGridView>
          </Fillwraper>
          <PricewraperGridView>
            {CircularProgressbarandValue({poolFilledPercentage,marginRight})}
          </PricewraperGridView>
        </RootWrapperGridView>
    )
}