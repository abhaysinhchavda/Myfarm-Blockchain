import React from 'react';
import GridItem from './GridItem';
import ethImage from '../../assets/V2/Images/Eth.png';
import tokenImage from '../../assets/V2/Images/tk1.png';
import styled from 'styled-components';
import PageHeader from 'components/PageHeader';
import { SaleStatus } from 'store/ido/reducer';

const Wrapper = styled.div``;
const Header = styled.div``;
const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 25px;
  padding: 15px 0px;
`;

function GridView() {
  return (
    <Wrapper>
      <Header>
        <PageHeader
          title="Launchpad"
          content="Participate in the Gameyoo IDO by staking in UFARM - BNB pool. To know more details about the project, click on “How to Participate”"
          hasShowSwitch={false}
        />
      </Header>
      <Body>
        <GridItem
          projectIcon={ethImage}
          projectName="Tether"
          projectSymbol="USDT"
          endTime={51430}
          eligibilityLabel="Cohort V36"
          saleStatus={SaleStatus.ACTIVE}
          paymentTokenName="UST"
          paymentTokenIcon={tokenImage}
          idoFilled="75.58"
          redirectionHandler={() => alert('successs')}
        />
        <GridItem
          projectIcon={ethImage}
          projectName="Tether"
          projectSymbol="USDT"
          endTime={51430}
          eligibilityLabel="Cohort V36"
          saleStatus={SaleStatus.UPCOMING}
          paymentTokenName="UST"
          paymentTokenIcon={tokenImage}
          idoFilled="75.58"
          redirectionHandler={() => alert('successs')}
        />{' '}
        <GridItem
          projectIcon={ethImage}
          projectName="Tether"
          projectSymbol="USDT"
          endTime={51430}
          eligibilityLabel="Cohort V36"
          saleStatus={SaleStatus.SOLD_OUT}
          paymentTokenName="UST"
          paymentTokenIcon={tokenImage}
          idoFilled="75.58"
          redirectionHandler={() => alert('successs')}
        />{' '}
        <GridItem
          projectIcon={ethImage}
          projectName="Tether"
          projectSymbol="USDT"
          endTime={51430}
          eligibilityLabel="Cohort V36"
          saleStatus={SaleStatus.CLOSED}
          paymentTokenName="UST"
          paymentTokenIcon={tokenImage}
          idoFilled="75.58"
          redirectionHandler={() => alert('successs')}
        />
      </Body>
    </Wrapper>
  );
}

export default GridView;
