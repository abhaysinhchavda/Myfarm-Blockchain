import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import SortBy, { SortByProps } from './SortBy/index';
import SwitchView from './Switch/index';
import { useTheme, useMediaQuery } from '@material-ui/core'

const DesktopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChildWrapper = styled.div`
  align-items: center;
  display: flex;
  width: 65%;
`;

const SelectWrapper = styled.div`
  text-align: left;
  align-items: center;
  border-radius: 10;
  display: flex;
  & .css-1s2u09g-control {
    border-radius: 10px;
  }
`;


export interface UtilityProps {
  /** search value */
  searchValue: string;
  /** search handler for search input */
  searchHandler: (seachKey: string) => void;
  /** sorting Props  */
  sortingProps: SortByProps;
}

export default function Utility({ searchValue, searchHandler, sortingProps }: UtilityProps) {
  const theme = useTheme()
  const Mobile = useMediaQuery(theme.breakpoints.down('xs'))
  // eslint-disable-next-line
  function MobileUtility() {
    return (
      <DesktopWrapper>
        <ChildWrapper>
          <Search searchHandler={searchHandler} searchValue={searchValue} />
          <SortBy {...sortingProps} />
        </ChildWrapper>
        <SelectWrapper>
          <SwitchView />
        </SelectWrapper>
      </DesktopWrapper>
    )
  }

  return (
    <>
      {
        Mobile ?
          <>
            {
              MobileUtility()
            }
          </>
          :
          <DesktopWrapper>
            <ChildWrapper>
              <Search searchHandler={searchHandler} searchValue={searchValue} />
              <SortBy {...sortingProps} />
            </ChildWrapper>
            <SelectWrapper>
              <SwitchView />
            </SelectWrapper>
          </DesktopWrapper>
      }

    </>

  );
}
