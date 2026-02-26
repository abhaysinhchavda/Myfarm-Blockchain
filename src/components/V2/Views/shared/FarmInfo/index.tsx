import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import InfoIcon from '@material-ui/icons/Info';
import Fire from '../../../../../assets/V2/Images/fire.png';
import Skeleton from '@mui/material/Skeleton';
// import { useListSwitch } from '../../../../../store/V2/Toggle/hook';

const Wrapper = styled.div`
display:flex;
align-items:center;
width:235px;
max-width:235px;
@media (max-width: 425px) {
width:350px;
max-width:350px;
}
`;
const ContentWrapper = styled.div`
 display:flex;
 align-items:flex-start;
 flex-direction:column;
 margin-left:0.5rem;
`;
const VersionWrapper = styled.span`
margin-bottom:0.9rem;
color:#616161;
font-size:14px;
font-weight:400;
margin-left:0.6rem;
font-family: Inter;
font-style: normal;
font-weight: normal;
line-height: 24px;
@media (max-width: 425px) {
  margin-bottom:0.5rem;
}
`;
const TokenName = styled.span`
color:#212121;
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
margin-left: 10px;
@media (max-width: 425px) {
  margin-left: 24px;
  font-size: 15px;
}
`;

const FireImage = styled.img`
  position:relative;
  left:12px;
  top:4px;
  width: 15.72px;
  height: 20.5px;
`;

const SkeletonCss = styled(Skeleton)<{
  view: number;
}>`
        margin-right:${(props) => (props.view === 1 ? '20px' : '10px')};
`;

const SkeletonCss2 = styled(Skeleton)<{
  view: number;
}>`
        margin-right:${(props) => (props.view === 1 ? '40px' : '10px')};
`;

interface FarmInfoProps {
  farmIcon: string;
  cohortVersion: string;
  farmName: string;
  hotFarmsOrNot: boolean;
  view: number;
}
const FarmInfo = ({
  farmIcon,
  cohortVersion,
  farmName,
  hotFarmsOrNot,
  view,
}: FarmInfoProps) => {
  const isLoading = false;
  // const SwitchList = useListSwitch();

  return (
    <Wrapper>
      {isLoading ? (
        <SkeletonCss variant="circular" width={40} height={40} view={view}/>
      ) : (
        <img src={farmIcon} width={65} />
      )}
      <ContentWrapper>
        <VersionWrapper>
          {'Cohort' + ' ' + cohortVersion?.toString().slice(0, 3)}
          {cohortVersion?.toString().length > 3 ? (
            <>
              ...
              <Tippy
                theme="light"
                placement="top"
                content={'Cohort' + ' ' + cohortVersion}
              >
                <InfoIcon
                  style={{
                    fontSize: '13px',
                    color: '#C4C4C4',
                  }}
                />
              </Tippy>
            </>
          ) : null}
          {hotFarmsOrNot ? <FireImage src={Fire} /> : null}
        </VersionWrapper>
        <TokenName>
          {isLoading ? (
            <SkeletonCss2 variant="rectangular" width={70} height={20} view={view} />
          ) : (
            <div>
              {farmName?.toString().slice(0, 5)}
              {farmName?.toString().length > 5 ? (
                <>
                  ...
                  <Tippy theme="light" placement="top" content={farmName ?? farmName}>
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
export default FarmInfo;
