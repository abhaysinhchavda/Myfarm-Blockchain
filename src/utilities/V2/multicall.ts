import { ICall } from '@makerdao/multicall';

export const createCalls = (
  target: string,
  methodName: string,
  args: string[],
  returns: string[][]
): ICall => {
  if (!target) throw Error('Target undefined');
  return {
    target,
    call: [methodName, ...args],
    returns,
  };
};
