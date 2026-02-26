import { useWeb3React } from "@web3-react/core";
import { useEffect, useMemo, useState } from "react";
import { getUnifarmToken, unitFormatter } from "../utilities";
import { useUnifarmTokenContract } from "./useContract";

export const useTokenSupply = (): number | null => {
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const UFARM = useUnifarmTokenContract();

  useEffect(() => {
    if (!UFARM) return null;
    UFARM.totalSupply()
      .then((result) => {
        setTotalSupply(unitFormatter(String(result) ?? "0"));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [UFARM]);
  return totalSupply;
};

export const useUnifarmTokenBalance = (account: string): number | null => {
  const [balance, setBalance] = useState<number | null>(null);
  const ufarm = useUnifarmTokenContract();

  useEffect(() => {
    if (!account || !ufarm) return null;
    ufarm
      .balanceOf(account)
      .then((result) => {
        const parseBalance = Math.floor(unitFormatter(String(result) ?? "0"));
        setBalance(parseBalance);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [account, ufarm]);

  return balance;
};

interface CoingeckoResponse {
  usd: number;
  usd_market_cap: number;
}

export const useUnifarmToken = (): CoingeckoResponse => {
  const [token, setToken] = useState<CoingeckoResponse | null>(null);
  useEffect(() => {
    getUnifarmToken()
      .then((result: CoingeckoResponse) => {
        setToken(result);
      })
      .catch((err) => {
        throw err.message;
      });
  }, []);
  return token;
};

interface UnifarmBreakDown {
  totalSupply: number;
  userBalance: number;
  unifarmPrice: number;
  unifarmMarketCap: number;
}

export const useUnifarmBreakDown = (): UnifarmBreakDown => {
  const { account } = useWeb3React();
  const totalSupply = useTokenSupply();
  const userBalance = useUnifarmTokenBalance(account);
  const token = useUnifarmToken();

  return useMemo(() => {
    return {
      totalSupply,
      userBalance,
      unifarmPrice: token?.usd,
      unifarmMarketCap: token?.usd_market_cap,
    };
  }, [token, userBalance, totalSupply]);
};
