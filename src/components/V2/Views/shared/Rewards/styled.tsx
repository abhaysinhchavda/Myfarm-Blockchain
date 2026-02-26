import styled from 'styled-components';
import Skeleton from '@mui/material/Skeleton';


export const RootWrapperGridView = styled.div`
display:flex;
justify-content:space-between;
margin-top:20px;
margin-bottom:10px;
margin-left:3px;
align-items:center;
`;

export const Wrapper = styled.div`
display:flex;
align-items:center;
margin-bottom:1rem
`;

export const Reward = styled.span<{
  view: number;
}>`
color:#616161;
font-size:14px;
font-weight:400;
margin-left:${(props) => (props.view === 1 ? '0rem' : '0.2rem')};
font-family: Inter;
font-style: normal;
font-weight: normal;
line-height: 24px;
`;


export const RewardsListView = styled.span`
color:#616161;
font-size:14px;
font-weight:400;
margin-left: 0.2rem;
font-family: Inter;
font-style: normal;
font-weight: normal;
line-height: 24px;
`;

export const RewardGridView = styled.span`
color:#616161;
font-size:14px;
font-weight:400;
margin-left: 0rem;
font-family: Inter;
font-style: normal;
font-weight: normal;
line-height: 24px;
`;

export const TolltipWrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  @media (max-width: 425px) {
    margin-top:-5px
  }
  `;
  export const RemainingReward = styled.div`
  cursor: pointer;
  margin-left:0.5rem;
`;

export const ImgWrapperGridView = styled.div`
display:flex;
align-items:center;
justify-content:flex-start;
margin-right:2rem;

@media (max-width:376px){
    margin-right: 1.1rem;
    margin-top:-5px
}
`;

export const ImgWrapperListView = styled.div`
display:flex;
align-items:center;
`;

export const SkeletonCssGridView = styled(Skeleton)`
          margin-right: 40px  ;
      `;

      export const SkeletonCssListView = styled(Skeleton)`
          margin-right: 10px  ;
      `;