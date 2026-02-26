import React from 'react';
import ListItem from './ListItem';
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
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 15px 0px;
`;

function ListView() {
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
        <ListItem
          projectIcon={ethImage}
          projectName="Tether"
          projectSymbol="USDT"
          endTime={51430}
          saleStatus={SaleStatus.CLOSED}
          eligibilityLabel="Cohort 36"
          paymentTokenName="UST"
          paymentTokenIcon={tokenImage}
          idoFilled="75.58"
          redirectionHandler={() => alert('successs')}
        />
        <ListItem
          projectIcon={ethImage}
          projectName="Tether"
          projectSymbol="USDT"
          endTime={51430}
          saleStatus={SaleStatus.ACTIVE}
          eligibilityLabel="Cohort 36"
          paymentTokenName="UST"
          paymentTokenIcon={tokenImage}
          idoFilled="75.58"
          redirectionHandler={() => alert('successs')}
        />
        <ListItem
          projectIcon={ethImage}
          projectName="Tether"
          projectSymbol="USDT"
          endTime={51430}
          saleStatus={SaleStatus.UPCOMING}
          eligibilityLabel="Cohort 36"
          paymentTokenName="UST"
          paymentTokenIcon={tokenImage}
          idoFilled="75.58"
          redirectionHandler={() => alert('successs')}
        />
      </Body>
    </Wrapper>
  );
}

export default ListView;
