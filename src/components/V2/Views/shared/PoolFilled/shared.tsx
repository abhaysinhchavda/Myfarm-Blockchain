import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { CircularPoolFilledWrapper } from './styled';
import { Price } from './styled';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';


interface CpbProps{
    poolFilledPercentage:string;
    marginRight : string;
}

export const CircularProgressbarandValue = ({poolFilledPercentage,marginRight} : CpbProps) => {
    return(
        <>
        <CircularPoolFilledWrapper>
              <CircularProgressbar
                value={parseInt(poolFilledPercentage)}
                strokeWidth={25}
                styles={buildStyles({
                  pathColor:
                    parseInt(poolFilledPercentage) <= 30
                      ? '#C62828'
                      : parseInt(poolFilledPercentage) > 30 &&
                        parseInt(poolFilledPercentage) <= 70
                      ? '#FFC107'
                      : '#009F42',
                  textColor: 'black',
                  textSize: '28px',
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',
                })}
              />
            </CircularPoolFilledWrapper>
            <Price marginRight={marginRight}>
              {(Math.round(parseInt(poolFilledPercentage) * 100) / 100).toFixed(2)}%
            </Price>
            </>
    )
}

export const PoolFilledTippyContent = () => {
return(
    <Tippy
    theme="light"
    placement="top"
    content="This number tells what percentage of maximum staking limit has been reached"
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