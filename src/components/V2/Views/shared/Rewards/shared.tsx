import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
// import { useListSwitch } from "../../../../../store/V2/Toggle/hook";
import InfoIcon from '@material-ui/icons/Info';
import { TolltipWrapper } from "./styled";
import { RewardsandTippyProps } from '../types';
import { RemainingReward } from './styled';
import { Reward } from './styled';
import React from 'react';




export const TippyContent = () => {
    return (
        <Tippy
                theme="light"
                placement="top"
                content="Estimated APY Rewards you would potentially earn if you stake $100 worth of tokens"
              >
                <InfoIcon
                  style={{
                    position: 'relative',
                    top: '1px',
                    fontSize: '13px',
                    color: '#C4C4C4',
                  }}
                />
              </Tippy>
    )
}

export const RewardsAndTippy = ({rewards, remainingRewards} : RewardsandTippyProps) => {
    return (
        <>
        {rewards.slice(0, 3).map((tk, index) => {
            return <img src={tk.icon} width={36} height={36} key={index} />;
          })}
          <Tippy
            theme="light"
            placement="bottom"
            content={
              <TolltipWrapper>
                {remainingRewards.slice(0, Reward.length).map((tk, index) => {
                  return (
                    <img
                      src={tk.icon}
                      width={36}
                      height={36}
                      key={index}
                      style={{ marginTop: '0.5rem' }}
                    />
                  );
                })}
              </TolltipWrapper>
            }
          >
            <RemainingReward>+{remainingRewards.length}</RemainingReward>
          </Tippy>
          </>
    )
}