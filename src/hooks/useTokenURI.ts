import { useCallback, useState } from "react";
import base64 from "base-64";

import { useNFTManagerContract } from "./useContract";

type BooleanOrNull = boolean | null;

interface TokenURI {
	name: string;
	description: string;
	image: string;
	isURI: boolean; 
};

interface TokenURIResponse {
	tokenURI: TokenURI;
	getTokenURI: () => void;
};

export const useTokenURI = (
	tokenId: number
): TokenURIResponse => {

	const [URI, setURI] = useState<TokenURI>({
		name: '',
		description: '',
		image: '',
    isURI: false
	});

	const managerInstance = useNFTManagerContract();

	const getTokenURI = useCallback( async () => {
		if (!managerInstance) return null;

		try {
			let tokenURI = await managerInstance.tokenURI(tokenId);
			tokenURI = base64.decode(tokenURI.replace('data:application/json;base64,', ''))
			setURI({
				name: tokenURI.name,
				description: tokenURI.description,
				image: tokenURI.image,
        isURI: true
			})
		} catch(err) {
			console.log(err.message);
			setURI({
				name: '',
				description: '',
				image: '',
        isURI: false
			})
		}
	}, [
		tokenId
	])

	return {
		tokenURI: URI,
		getTokenURI
	}
}