import Boost from '../../../../../assets/V2/Images/boost2.png';
import Calc from '../../../../../assets/V2/Images/calc.png';
import { BoostTitle } from './styled';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';
import { Page } from '../types';

interface getApyButtonProps {
  hasBoosterAvailable: boolean;
  hasBoosterBuyed: boolean;
  boosterApy: number;
  page: Page;
  openModal: () => void;
}

export const getApyButton = ({
  hasBoosterAvailable,
  hasBoosterBuyed,
  boosterApy,
  page,
  openModal,
}: getApyButtonProps) => {
  return (
    <>
      {!hasBoosterAvailable ? (
        <img src={Calc} width={15} alt="calculator" />
      ) : (
        <img src={Boost} width={15} alt="rocket" />
      )}

      <BoostTitle onClick={openModal}>
        {hasBoosterAvailable === false ? (
          'Calculate APY'
        ) : page === 0 && hasBoosterBuyed === true ? (
          `Boost upto ${boosterApy}%`
        ) : page === 1 && hasBoosterBuyed === true ? (
          `Boosted`
        ) : (
          <div onClick={openModal}>Boost upto {boosterApy}%</div>
        )}
      </BoostTitle>
    </>
  );
};

export const getApyTippyContent = () => {
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
  );
};
