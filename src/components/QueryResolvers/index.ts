import { useObtainAppCohorts } from '../../store/application/hooks';
import { useObtainTokenlist } from '../../store/lists/hooks';
import { useFillTokenList } from '../../store/Token/hooks';
import { useFetchAllFarms } from '../../store/farms/hooks';
import { useFetchBalance } from '../../store/balance/hooks';
import { useObtainUserStakes, useSetClaimHistory } from '../../store/stakes/hooks';
import { useSetReferralData } from '../../store/referral/hooks';
import { useUpdateIdoData } from '../../store/ido/hooks';
import {
  useFetchFarmData,
  useFetchFarmDetails,
  useFetchV2Farms,
} from '../../store/V2/farms/hooks';

export function QueryResolvers() {
  useObtainAppCohorts();
  useObtainTokenlist();
  useFetchAllFarms();
  useFetchBalance();
  useObtainUserStakes();
  useSetClaimHistory();
  useSetReferralData();
  useFillTokenList();
  useUpdateIdoData();
  useFetchV2Farms();
  useFetchFarmDetails();
  useFetchFarmData();
  return null;
}
