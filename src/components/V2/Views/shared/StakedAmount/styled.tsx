import styled from 'styled-components';
import Skeleton from '@mui/material/Skeleton';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;
export const ChildWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0rem;
  margin-top: 0.5rem;
`;
export const RewardGridView = styled.span`
  color: #616161;
  font-size: 14px;
  font-weight: 400;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  margin-left:  0rem ;
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
`

;
export const AmountGrid = styled.span`
  color: #212121;
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin-right: 62px;
  margin-top: 9px;
`;

export const AmountList = styled.span`
  color: #212121;
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  margin-right: 10px;
`;

export const SkeletonCssGrid = styled(Skeleton)`
  margin-right: 62px;
  margin-top: 9px;
`;

export const SkeletonCssList = styled(Skeleton)`
  margin-right: 10px;
`;

export const ImageWrperGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImgWrperList = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

export const RootWrapperGridView = styled.div`
display:flex;
justify-content:space-between;
margin-top:20px;
margin-left:3px;
align-items:flex-start;
`;

export const RootWrapperListView = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`;