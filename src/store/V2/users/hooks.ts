import { ICall } from '@makerdao/multicall';
import { useWeb3React } from '@web3-react/core';
import { hexlify } from 'ethers/lib/utils';
import { concat, isEmpty } from 'lodash';
import { useEffect } from 'react';
import { unifarmNFTManagerAddress } from '../../../constants';
import { unitFormatter } from '../../../utilities';
import { multicall } from '../../../utilities/multicall';
import { getUserMints } from '../../../utilities/V2/mints';
import { createCalls } from '../../../utilities/V2/multicall';
import { CohortYF2, TokenMetaDataYF2 } from '../../../utilities/V2/types';
import { useApplicationUserState } from '../../user/hooks';
import { useV2Farms } from '../farms/hooks';
import { FarmDetails } from '../farms/reducer';

export const useFetchUserNFts = (): void => {
  const { appChainId } = useApplicationUserState();
  const { account } = useWeb3React();
  const farms = useV2Farms();

  useEffect(() => {
    async function fetchActiveStakings() {
      if (!account || isEmpty(farms)) return null;
      const transfers = await getUserMints(appChainId, account);
      if (!isEmpty(transfers)) {
        // create calls for grabing cohort addresses
        let calls = [] as ICall[];
        let nftManager = unifarmNFTManagerAddress[appChainId];

        for (var e = 0; e < transfers.length; e++) {
          calls.push(
            createCalls(
              nftManager,
              'tokenIdToCohort()(address)',
              [],
              [[transfers[e].tokenId]]
            )
          );
        }
        if (!isEmpty(calls)) {
          const result = await multicall(appChainId, calls);
          const original = result.results.original;
          let stakeCalls = [] as ICall[];
          for (var k = 0; k < transfers.length; k++) {
            const { tokenId } = transfers[e];
            const cohort = original[tokenId] as string;
            stakeCalls.push(
              createCalls(
                cohort,
                'viewStakingDetails(uint256)(uint32,uint256,uint256,uint256,uint256,address,address,bool)',
                [account],
                [
                  [concat(tokenId, '-', 'fid')],
                  [concat(tokenId, '-', 'nftTokenId')],
                  [concat(tokenId, '-', 'stakedAmount')],
                  [concat(tokenId, '-', 'startBlock')],
                  [concat(tokenId, '-', 'endBlock')],
                  [concat(tokenId, '-', 'originalOwner')],
                  [concat(tokenId, '-', 'referralAddress')],
                  [concat(tokenId, '-', 'isBooster')],
                ]
              )
            );
          }
          const stakes = await multicall(appChainId, stakeCalls);

          let farmData = [] as {
            cohort: CohortYF2;
            token: TokenMetaDataYF2;
            farmDetails: FarmDetails;
          }[];

          let userData = [] as any;

          let actives = stakes.results.original;

          for (var g = 0; g < transfers.length; g++) {
            let { tokenId } = transfers[g];
            // filter the farm by fid
            let cohort = original[tokenId] as string;
            let fid = parseFloat(actives[concat(tokenId, '-', 'fid')].toString());
            let farm = farms.filter(
              (e) => e.token.id === concat(cohort.toLowerCase(), '-', hexlify(fid))
            );

            if (!isEmpty(farm)) {
              // let derive other properties
              let { token, cohort, farmDetails } = farm[0];
              if (!isEmpty(token) && !isEmpty(cohort) && !isEmpty(farmDetails)) {
                // push the farms first
                farmData.push({ token, cohort, farmDetails });
                // user stake data
                userData.push({
                  userStakeData: {
                    nftTokenId: parseFloat(
                      actives[concat(tokenId, '-', 'nftTokenId')].toString()
                    ),
                    stakedAmount: unitFormatter(
                      actives[concat(tokenId, '-', 'stakedAmount')].toString(),
                      parseFloat(token.decimals)
                    ),
                  },
                });
              }
            }
          }
        }
      }
    }
    fetchActiveStakings();
  }, []);
};
