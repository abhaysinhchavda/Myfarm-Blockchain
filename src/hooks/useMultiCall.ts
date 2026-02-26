import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

export const useBlockTimeStamp = () => {
  const [blockTimeStamp, setBlockTimeStamp] = useState<number | null>();
  const { library } = useWeb3React();
  useEffect(() => {
    if (!library) return null;
    const fetchBlockNumber = async () => {
      const blockNumber = await library.getBlockNumber();
      const block = await library.getBlock(blockNumber);
      const timestamp = Number(block.timestamp);
      setBlockTimeStamp(timestamp);
    };
    fetchBlockNumber();
  }, [library]);

  return blockTimeStamp;
};
