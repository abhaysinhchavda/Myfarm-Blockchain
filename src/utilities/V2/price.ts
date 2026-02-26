import { multiply } from 'lodash';

export const tokenToUSDAmount = (
  tokenAmount: number,
	priceInUsd: number
): number => {
	return multiply(tokenAmount, priceInUsd);
}