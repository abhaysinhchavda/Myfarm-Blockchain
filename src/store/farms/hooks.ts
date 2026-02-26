import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "..";
import {
  AllPools,
  AllPoolsQueryResponse,
  ALL_POOLS,
} from "../../graphql/queries";
import {
  deserializePools,
  isEmpty,
  getRewardsBeforeStaking,
  getApy,
  getQuatersInOneYear,
} from "../../utilities";
import { useApplicationUserState } from "../user/hooks";
import { setFarms } from "./action";
import { useTokenlist } from "../lists/hooks";
import _ from "loadsh";
import { useChainIdError } from "../../hooks/useChainIdError";
import { getTotalStakingMultiCall } from "../../utilities/multicall";
import { FarmResponse, getFarms } from "../../utilities/farms";
import { Farm } from "./reducer";
import { DEFAULT_STAKE_USD_AMOUNT, STARTFI_SPECIAL } from "../../constants";

export const useFetchAllFarms = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { appChainId } = useApplicationUserState();

  const { refetch } = useQuery<AllPoolsQueryResponse>(ALL_POOLS, {
    skip: true,
  });

  const tokenlist = useTokenlist();
  const chainError = useChainIdError();

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const results = await refetch({
          where: {
            chainId: appChainId,
          },
        });

        const allFarms: AllPools[] = results.data.allPools.pools;
        const deserializedPools = deserializePools(allFarms);
        const totalStakings = await getTotalStakingMultiCall(
          appChainId,
          deserializedPools
        );

        var derivedFarms = [] as FarmResponse[];

        for (var k = 0; k < deserializedPools.length; k++) {
          const farm = deserializedPools[k];
          derivedFarms.push(
            getFarms(farm, tokenlist, appChainId, totalStakings[k])
          );
        }

        var farms: Farm[] = [];

        for (var g = 0; g < derivedFarms.length; g++) {
          const derivedFarm = derivedFarms[g];
          const {
            farmDetails,
            tokenDetails,
            cohortDetails,
            rewardSequence,
            totalStaking,
          } = derivedFarm;

          let deafultStakeAmountInUsd = DEFAULT_STAKE_USD_AMOUNT;
          let denominoter: number = totalStaking;
          if (
            cohortDetails.cohortId.toLowerCase() ===
            STARTFI_SPECIAL.toLowerCase()
          ) {
            deafultStakeAmountInUsd = 200;
            denominoter = tokenDetails.totalStakeLimit;
          }

          let numberOfTokenStaked = _.divide(
            deafultStakeAmountInUsd,
            farmDetails.price
          );

          const priorReward = getRewardsBeforeStaking(
            rewardSequence,
            numberOfTokenStaked,
            tokenDetails.tokenDailyDistribution,
            denominoter,
            cohortDetails.intervalDays,
            cohortDetails.stakeDuration,
            cohortDetails.rewardStrategy === "hourly"
          );

          const quater = getQuatersInOneYear(
            cohortDetails.stakeDuration / 86400
          );

          const APY = getApy(
            priorReward.aggregatedUSDReward,
            deafultStakeAmountInUsd,
            quater
          );

          farms.push({
            ...derivedFarms[g],
            APY,
          });
        }

        dispatch(
          setFarms({
            farms,
            total_pools: results.data.allPools.total_pools,
          })
        );
      } catch (err) {
        console.log(`errored ${err.message}`);
      }
    };
    // fetch farms
    if (!isEmpty(tokenlist) && chainError !== true) {
      fetchFarms();
    }
  }, [appChainId, chainError, dispatch, refetch, tokenlist]);
};

export const useFarms = () => {
  return useSelector((state: AppState) => state.farms);
};
