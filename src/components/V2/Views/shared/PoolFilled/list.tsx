import { PoolFilledProps } from "../types";
import { FillNameListView, Fillwraper } from "./styled";
import  {PoolFilledTippyContent, CircularProgressbarandValue } from "./shared";
import { PricewraperListView } from "./styled";
import React from 'react';

export const PoolFilledList = ({ poolFilledPercentage } : PoolFilledProps) => {

  const marginRight = "0.4rem";
return(
    <div>
          <Fillwraper>
            <FillNameListView>
              Pool Filled &nbsp;&nbsp;
              {PoolFilledTippyContent()}
            </FillNameListView>
          </Fillwraper>
          <PricewraperListView>
            {CircularProgressbarandValue({poolFilledPercentage,marginRight})}
          </PricewraperListView>
        </div>
)
}