import { parseUnits } from '@ethersproject/units';
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from "@ethersproject/contracts";
import TokenABI from "../constants/ABI/ERC20.json";
import RouterABI from "../constants/ABI/UNIFARMROUTER.json";

export async function UseSwapTokens(
    address1: string,
    address2: string,
    amount: string,
    tokenId: string,
    accountAddress: string,
    library: any
) {
    const instance = new Contract(tokenId, RouterABI, library.getSigner());
    console.log('instance:',instance)
    const tokens = [address1, address2];
    console.log('tokens:',tokens)
    const time = Math.floor(Date.now() / 1000) + 2000;
    const deadline = BigNumber.from(time);
    const token1 = new Contract(address1, TokenABI, library.getSigner());
    const tokenDecimals = await getDecimals(token1);
    const wethAddress = await instance.WETH();
    console.log('wethAddress:', wethAddress);
    console.log('tokenDecimals:',tokenDecimals)
    console.log('deadline:', deadline)
    console.log('amount:',amount)
    const amountIn = parseUnits(amount, tokenDecimals);
    console.log('amountIn:',amountIn);
    const amountOut = await instance.callStatic.getAmountsOut(
        amountIn,
        tokens
    );
    await token1.approve(instance.address, amountIn);
    console.log('tokens:', tokens)
    console.log('amountIn:',amountIn)
    console.log('amountOut[1]:',amountOut[1])
    console.log('accountAddress:',accountAddress);
    console.log('deadline:',deadline)
    if (address1.toUpperCase() === wethAddress.toUpperCase()) {
        // Eth -> Token
        console.log('Eth -> Token')
        const result = await instance.swapExactETHForTokens(
            amountOut[1],
            tokens,
            accountAddress,
            deadline,
            "0",
            { value: amountIn }
        );
        console.log('result:',result)
    } else if (address2.toUpperCase() === wethAddress.toUpperCase()) {
        // Token -> Eth
        console.log('Token -> Eth')
        await instance.swapExactTokensForETH(
            amountIn,
            amountOut[1],
            tokens,
            accountAddress,
            deadline
        );
    } else {
        console.log('Token -> Token')
        await instance.swapExactTokensForTokens(
            amountIn,
            amountOut[1],
            tokens,
            accountAddress,
            deadline,
        );
    }
};


export async function getDecimals(token: Contract) {
    const decimals = await token.decimals().then((result) => {
        return result;
    }).catch(() => {
        console.log('No tokenDecimals function for this token, set to 0');
        return 0;
    });
    return decimals;
}