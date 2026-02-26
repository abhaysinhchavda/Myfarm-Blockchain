import React, { lazy, Suspense } from "react";
import PageHeader from "../../components/PageHeader";
import ReferedWrappper from "../../components/ReferalEarn/ReferedWrappper";
import ReferedStatitics from "../../components/ReferalEarn/ReferedStatitcs";
import ReferralLinkInput from "../../components/ReferalEarn/ReferralLinkInput";
import Group from "../../assets/images/New/group.png";
import Hand from "../../assets/images/New/hand.png";
import Style from "styled-components";
import RefferalCopyButton from "../../components/ReferalEarn/RefferalCopyButton";
import ShareIcons from "../../components/ReferalEarn/ShareIcons";
import ContentLoader from "../../components/ContentLoader/index";
import { useReferralData } from "../../store/referral/hooks";
import { getReferralLink, isEmpty } from "../../utilities";
import { useWeb3React } from "@web3-react/core";

const RefernEarnTable = lazy(
  () => import("../../components/ReferalEarn/RefernEarnTable")
);

const Container = Style.div`
display:flex;
width:100%;
justify-content:flex-start;
@media screen and (min-device-width: 375px) and (max-device-width: 700px){
  flex-direction:column;
  align-items: center
 }
`;
const Wrapper = Style.div`

margin-bottom:1rem;

`;

const Wrapper2 = Style.div`
margin-left:1rem;
width:100%;
height:165px;
@media screen and (min-device-width: 375px) and (max-device-width: 700px) {
  margin-top:1rem;
  width:100%;
  margin-left:0rem;
 }
`;
const CopyWrapper = Style.div`
display:flex;
align-items:center;
margin-top:1.5rem
`;

const ReferEarn = () => {
  const { referrals, noReferFound } = useReferralData();
  const { account } = useWeb3React();
  const referralLink = getReferralLink(account);

  return (
    <div>
      <PageHeader
        title="Refer & Earn"
        content="Invite friends and additional staking rewards every time your friend stake"
        hasShowSwitch={false}
      />
      <br />
      <br />
      <Container>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Wrapper>
            <ReferedWrappper>
              <ReferedStatitics
                statsTitle="Total Referred Friends"
                statsValue={isEmpty(referrals) ? 0 : referrals.length}
                statsIcon={Group}
              />
            </ReferedWrappper>
          </Wrapper>
          <Wrapper>
            <ReferedWrappper>
              <ReferedStatitics
                statsTitle="Rewards"
                statsValue={0}
                statsIcon={Hand}
              />
            </ReferedWrappper>
          </Wrapper>
        </div>

        <Wrapper2>
          <ReferedWrappper>
            <CopyWrapper>
              <ReferralLinkInput link={referralLink} />
              <RefferalCopyButton referralLink={referralLink} />
            </CopyWrapper>
            <ShareIcons referralLink={referralLink} />
          </ReferedWrappper>
        </Wrapper2>
      </Container>

      <Suspense
        fallback={<ContentLoader color="purple" message="Fetching Data.." />}
      >
        <RefernEarnTable referrals={referrals} noReferFound={noReferFound} />
      </Suspense>
    </div>
  );
};
export default ReferEarn;
