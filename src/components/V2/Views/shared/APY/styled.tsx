import Skeleton from '@mui/material/Skeleton';
import styled from 'styled-components';
import { Page } from '../types';

export const BoostTitle = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */
  cursor: pointer;
  /* primary brand/main */
  color: #005ad1;
`;

export const GridRoot = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 3px;
  align-items: flex-start;
`;

export const ListRoot = styled.div<{
  isboosteravailableornot: boolean;
  stakewithbooster: boolean;
  page: Page;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: ${(props) =>
    props.isboosteravailableornot === true &&
      props.stakewithbooster === true &&
      props.page === 1
      ? '35px'
      : props.isboosteravailableornot === true && props.page === 0
        ? '-12px'
        : props.isboosteravailableornot === true && props.page === 1
          ? '-16px'
          : props.isboosteravailableornot === false && props.page === 0
            ? '0px'
            : props.isboosteravailableornot === false && props.page === 1
              ? '110px'
              : '0px'};
`;

export const TipWrapper = styled.div`
  display: flex;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  @media (max-width: 425px) {
    margin-bottom: 0px;
  }
`;

export const ChildWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const RewardGridView = styled.span`
  color: #616161;
  font-size: 14px;
  font-weight: 400;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  margin-left: 0rem;
`;

export const RewardListView = styled.span`
  color: #616161;
  font-size: 14px;
  font-weight: 400;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  margin-left: 0.7rem;
`;

export const PriceGridView = styled.span`
  color: #212121;
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin-right: 100px;
  @media (max-width: 376px) {
    margin-right: 87px;
  }
`;

export const PriceListView = styled.span`
  color: #212121;
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  margin-right: 10px;
  @media (max-width: 425px) {
    margin-top: 8px;
    font-size: 18px;
  }
`;

export const ImgWrapperGridView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImgWrapperListView = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

export const InformationWrapper = styled.div<{
  isboosteravailableornot: boolean;
  page: Page;
}>`
  border: ${(props) =>
    props.isboosteravailableornot && props.page === 1
      ? `1px solid #03A9F4`
      : props.isboosteravailableornot && props.page === 0
        ? `1px solid #03A9F4`
        : props.isboosteravailableornot === false && props.page === 1
          ? ``
          : props.isboosteravailableornot === false && props.page === 0
            ? `1px solid #03A9F4`
            : ``};
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 8px 15px 8px 11px;
  justify-content: space-between;
  margin-left: 7px;
  width:100%;
  @media (max-width: 425px) {
    width: 130px;
  }
`;

export const SkeletonCssGridView = styled(Skeleton)`
  margin-right: 133px;
`;

export const SkeletonCssListView = styled(Skeleton)`
  margin-right: 10px;
`;
