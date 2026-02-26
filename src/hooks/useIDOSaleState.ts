import { useWeb3React } from "@web3-react/core";
import { useEffect, useMemo, useState } from "react";
import { getBlock } from "../utilities";

export enum IDO_SALE_STATUS {
  WALLET_NOT_CONNECTED,
  SOLD_OUT,
  SALE_CLOSED,
  USER_BUYED,
}

export const useIDOSaleState = (
  totalRaisedPercentage: number,
  endTime: number,
  hasBuyed: boolean
): IDO_SALE_STATUS => {
  const { account } = useWeb3React();
  const [blockTimeStamp, setBlockTimeStamp] = useState<number>(0);

  useEffect(() => {
    const fetchBlockTimeStamp = async () => {
      const block = await getBlock();
      setBlockTimeStamp(block.timestamp);
    };
    fetchBlockTimeStamp();
  }, []);

  return useMemo(() => {
    if (!account) {
      return IDO_SALE_STATUS.WALLET_NOT_CONNECTED;
    } else if (totalRaisedPercentage >= 100 && hasBuyed === false) {
      return IDO_SALE_STATUS.SOLD_OUT;
    } else if (blockTimeStamp > endTime && hasBuyed === false) {
      return IDO_SALE_STATUS.SALE_CLOSED;
    } else if (hasBuyed) {
      return IDO_SALE_STATUS.USER_BUYED;
    }
  }, [account, blockTimeStamp, endTime, totalRaisedPercentage, hasBuyed]);
};
