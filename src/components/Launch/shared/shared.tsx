import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import React from 'react';
import style from 'styled-components';

const CircularPoolFilledWrapper = style.div`
  width: 22px;
  height: 22px;
`;

const Price = style.span<{
  marginRight: string;
}>`
    color:#212121;
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    margin-left: ${(props) => props.marginRight};
    @media (max-width: 425px) {
        font-size: 18px;
      }

`;
interface CpbProps {
  poolFilledPercentage: string;
  marginRight: string;
}

export const CircularProgressbarandValue = ({
  poolFilledPercentage,
  marginRight,
}: CpbProps) => {
  return (
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
  );
};
