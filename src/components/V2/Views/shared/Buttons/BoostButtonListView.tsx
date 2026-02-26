import React from 'react';
import { ApyProps } from '../types';
import { getApyButton } from '../APY/shared';
import { Button } from '@material-ui/core';

export const BoostButtonListView = ({
  hasBoosterAvailable,
  page,
  hasBoosterBuyed,
  boosterApy,
  openModal,
}: ApyProps) => {
  return (
    <div style={{  maxWidth: '200px',borderRadius:20 }}>
      {page === 1 && !hasBoosterAvailable ? null : (
        <Button style={{ border: '1px solid #03A9F4',borderRadius:10,height:40}}>
          {page === 0 || hasBoosterAvailable === true ? (
            <div style={{ display: 'flex', alignItems: 'center',columnGap:5 }}>
              {getApyButton({
                hasBoosterAvailable,
                hasBoosterBuyed,
                boosterApy,
                page,
                openModal,
              })}
            </div>
          ) : null}
        </Button>
      )}
    </div>
  );
};
