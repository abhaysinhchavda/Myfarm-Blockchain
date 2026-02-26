import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import InfoIcon from '@material-ui/icons/Info';
import Skeleton from '@mui/material/Skeleton';
import { SaleStatus } from 'store/ido/reducer';
import { Views } from 'store/user/reducer';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 0.5rem;
`;

const VersionWrapper = styled.span`
  margin-bottom: 0.9rem;
  color: #212121;
  font-size: 16px;
  font-weight: 600;
  margin-left: 0.6rem;
  font-family: Inter;
  font-style: normal;
  line-height: 19px;
  @media (max-width: 425px) {
    margin-bottom: 0.5rem;
  }
`;

const TokenName = styled.span`
  color: #212121;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  margin-left: 10px;
  @media (max-width: 425px) {
    margin-left: 24px;
    font-size: 15px;
  }
`;

const StateActive = styled.div`
  position: absolute;
  right: 12px;
  top: 4px;
  width: 67px;
  height: 32px;
  background: #f0ebf8;
  border: 1px solid #673ab7;
  box-sizing: border-box;
  border-radius: 56px;
  display: flex;
  font-weight: 400;
  font-size: 14px;
  color: #673ab7;
  align-items: center;
  justify-content: center;
`;

const StateUpcoming = styled.div`
  position: absolute;
  right: 12px;
  top: 4px;
  width: 93px;
  height: 32px;
  background: #e5eefa;
  border: 1px solid #03a9f4;
  box-sizing: border-box;
  border-radius: 56px;
  display: flex;
  color: #03a9f4;
  font-weight: 400;
  font-size: 14px;
  align-items: center;
  justify-content: center;
`;

const StateSold = styled.div`
  position: absolute;
  right: 12px;
  top: 4px;
  width: 83px;
  height: 32px;
  background: #e0e0e0;
  border: 1px solid #616161;
  box-sizing: border-box;
  border-radius: 56px;
  display: flex;
  color: #616161;
  font-weight: 400;
  font-size: 14px;
  align-items: center;
  justify-content: center;
`;

const StateClosed = styled.div`
  position: absolute;
  right: 12px;
  top: 4px;
  width: 83px;
  height: 32px;
  background: #ffeaea;
  border: 1px solid;
  box-sizing: border-box;
  border-radius: 56px;
  display: flex;
  color: #c62828;
  font-weight: 400;
  font-size: 14px;
  align-items: center;
  justify-content: center;
`;

const ProjectLogo = styled.img`
  max-height: 60px;
  object-fit: contain;
`;

const SkeletonCss = styled(Skeleton)<{
  view: number;
}>`
  margin-right: ${(props) => (props.view === 1 ? '20px' : '10px')};
`;

const SkeletonCss2 = styled(Skeleton)<{
  view: number;
}>`
  margin-right: ${(props) => (props.view === 1 ? '40px' : '10px')};
`;

interface FarmInfoProps {
  farmIcon: string;
  farmSymbol: string;
  farmName: string;
  state: SaleStatus;
  view: Views;
}

const PoolInformation = ({
  farmIcon,
  farmSymbol,
  farmName,
  state,
  view,
}: FarmInfoProps) => {
  const isLoading = false;
  // const SwitchList = useListSwitch();
  const getState = () => {
    if (state === SaleStatus.ACTIVE) {
      return <StateActive>Active</StateActive>;
    }
    if (state === SaleStatus.UPCOMING) {
      return <StateUpcoming>Upcoming</StateUpcoming>;
    }
    if (state == SaleStatus.SOLD_OUT) {
      return <StateSold>Sold Out</StateSold>;
    }
    if (state == SaleStatus.CLOSED) {
      return <StateClosed>Closed</StateClosed>;
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <SkeletonCss variant="circular" width={40} height={40} view={view} />
      ) : (
        <ProjectLogo src={farmIcon} alt={farmName} width={65} />
      )}
      <ContentWrapper>
        <VersionWrapper>
          {farmName}
          {view === Views.GRID && getState()}
        </VersionWrapper>
        <TokenName>
          {isLoading ? (
            <SkeletonCss2 variant="rectangular" width={70} height={20} view={view} />
          ) : (
            <div>
              {farmSymbol?.toString().slice(0, 5)}
              {farmSymbol?.toString().length > 5 ? (
                <>
                  ...
                  <Tippy theme="light" placement="top" content={farmSymbol ?? farmSymbol}>
                    <InfoIcon
                      style={{
                        fontSize: '13px',
                        color: '#C4C4C4',
                      }}
                    />
                  </Tippy>
                </>
              ) : null}
            </div>
          )}
        </TokenName>
      </ContentWrapper>
    </Wrapper>
  );
};
export default PoolInformation;
