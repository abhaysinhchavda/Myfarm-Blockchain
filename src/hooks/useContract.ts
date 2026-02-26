import { useMemo } from "react";
import { useWeb3Provider } from "./useWeb3Provider";
import { Contract } from "@ethersproject/contracts";
import CohortABI from "../constants/ABI/cohorts/Cohort.json";
import TokenABI from "../constants/ABI/ERC20.json";
import RouterABI from "../constants/ABI/UNIFARMROUTER.json";
import { useApplicationUserState } from "../store/user/hooks";
import { unifarmAddress, unifarmNFTManagerAddress } from "../constants";
import UNIFARM_CONTRACT_ABI from "../constants/ABI/UNIFARM.json";
import IDO_ABI from "../constants/ABI/IDO.json";
import NFTMANAGER_ABI from "../constants/ABI/UNIFARMNFTMANAGER.json"

export const useContract = (ABI, address: string) => {
  const { library } = useWeb3Provider();
  const { appChainId } = useApplicationUserState();
  return useMemo(() => {
    if (!address || !library || !appChainId) return null;
    return new Contract(address, ABI, library);
  }, [ABI, address, library, appChainId]);
};

export const useUnifarmTokenContract = () => {
  const { appChainId } = useApplicationUserState();
  const unifarm = unifarmAddress[appChainId];
  return useContract(UNIFARM_CONTRACT_ABI, unifarm);
};

export const useCohortContract = (cohortId: string) => {
  return useContract(CohortABI, cohortId);
};

export const useTokenContract = (address: string) => {
  return useContract(TokenABI, address);
};

export const useRouterContract = (address: string) => {
  return useContract(RouterABI, address);
}

export const useIdoContract = (address: string) => {
  return useContract(IDO_ABI, address);
};

export const useNFTManagerContract = () => {
  const { appChainId } = useApplicationUserState();
  const unifarmNftManager = unifarmNFTManagerAddress[appChainId];
  return useContract(NFTMANAGER_ABI, unifarmNftManager);
};
