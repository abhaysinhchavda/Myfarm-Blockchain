import React, { Fragment, useMemo } from 'react';
import Empty from '../../components/Launch/Empty';
import OrderPlaced from '../../components/Launch/OrderPlaced';
import ProjectDetail from '../../components/Launch/ProjectDetail';
import Purchase from '../../components/Launch/Purchase';
import SaleClosed from '../../components/Launch/SaleClosed';
import SoldOut from '../../components/Launch/SoldOut';
import PageHeader from '../../components/PageHeader';
import { useApproval } from '../../hooks/useApproval';
import { useBuyToken } from '../../hooks/useBuyToken';
import { IDO_SALE_STATUS, useIDOSaleState } from '../../hooks/useIDOSaleState';
import { useObtainIDOProjects } from '../../store/ido/hooks';
import { getDate } from '../../utilities';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import ContentLoader from '../../components/ContentLoader';
import { useUserTokenBalance } from '../../hooks/useMiscellaneous';
import { useRouteMatch } from 'react-router-dom'; 
import { useValidateSolanaAddress } from 'hooks/useValidateSolanaAddress';
import { isEmpty } from 'lodash';

const Launch = () => {

  const { params } = useRouteMatch<{ projectId: string }>();
  const {errorMessage,solanaAddress,solanaInputHandler} = useValidateSolanaAddress();

  const projects = useObtainIDOProjects();
  
  let project = useMemo(() => {
    if(isEmpty(projects)) return null;
    return projects.filter(e => e.extra.idoAddress.toLowerCase() === params?.projectId?.toLowerCase())[0];
  },[projects,params?.projectId])

  const saleStatus = useIDOSaleState(
    project?.totalRaisedInPercentage,
    project?.endTime,
    project?.userData?.hasBuyed
  );

  const { loading, approval, triggeredApproval } = useApproval(
    project?.extra?.idoAddress,
    project?.paymentToken?.address,
    project?.paymentToken?.decimals
  );

  const balance = useUserTokenBalance(
    project?.paymentToken?.address,
    project?.paymentToken?.decimals
  );
  const { transactionStatus, buyToken } = useBuyToken(project?.extra?.idoAddress,solanaAddress);

  const getIDOSaleScreen = () => {
    if (saleStatus === IDO_SALE_STATUS.WALLET_NOT_CONNECTED) {
      return <Empty startTime={project?.startTime} />;
    } else if (saleStatus === IDO_SALE_STATUS.SOLD_OUT) {
      return <SoldOut sellTokenName={project?.sellToken?.name} />;
    } else if (saleStatus === IDO_SALE_STATUS.SALE_CLOSED) {
      return <SaleClosed />;
    } else if (saleStatus === IDO_SALE_STATUS.USER_BUYED) {
      return (
        <OrderPlaced
          sellTokenName={project?.sellToken?.name}
          sellTokenLogo={project?.extra?.sellTokenLogo}
          allocateTokens={project?.userData?.allocateAmount}
        />
      );
    } else {
      return project !== undefined ? (
        <Fragment>
          <Purchase
            approvalLoading={loading}
            approvalStatus={approval}
            balance={balance}
            approveCallback={() => triggeredApproval(project?.userData?.allocateAmount)}
            buyStatus={transactionStatus}
            buyCallback={() => buyToken()}
            idoTokenIcon={project?.paymentToken?.icon}
            idoTokenTicker={project?.paymentToken?.symbol}
            sellTokenTicker={project?.sellToken?.symbol}
            sellTokenIcon={project?.sellToken?.icon}
            notEligible={project?.userData?.allocateAmount === 0}
            allocateTokens={project?.userData?.allocateAmount}
            errorMessage={errorMessage}
            solanaAddress={solanaAddress}
            solanaInputHandler={solanaInputHandler}
          />
          {project.userData.allocateAmount > 0 && (
            <ProjectDetail
              startTime={getDate(project.startTime, true)}
              endTime={getDate(project.endTime, true)}
              totalInvestors={project.participantsCount}
              purchaseCap={project.purchaseCap}
              totalRaisedPercentage={project.totalRaisedInPercentage}
            />
          )}
        </Fragment>
      ) : (
        <ContentLoader color="#222" message="Fetching the project details" />
      );
    }
  };
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down('xs'));

  return (
    <>
      {mobile ? (
        <PageHeader
          title="Launch"
          content={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <a href="https://unifarm.co/launch" style={{ color: '#212121' }}>
                How To Participate
              </a>
              <Tippy theme="light" placement="top" content="Help Content">
                <HelpOutlineIcon />
              </Tippy>
            </div>
          }
          hasShowSwitch={false}
        />
      ) : (
        <PageHeader
          title="Launchpad"
          content="Participate in the Gameyoo IDO by staking in UFARM - BNB pool. To know more details about the project, click on “How to Participate”"
          hasShowSwitch={false}
        />
      )}
      {getIDOSaleScreen()}
    </>
  ); 
};

export default Launch;
