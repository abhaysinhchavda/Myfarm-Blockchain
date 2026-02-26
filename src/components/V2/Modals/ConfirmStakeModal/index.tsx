import React from 'react'
import ConfirmStaking from './ConfirmStaking/index'
import TransactionComplete from './StakeTransactionCompleted/index'
interface IsConfirmStake {
	status: 'pending' | 'confirmed'
	boosted:boolean
}

interface Booster {
	bpid: number;
	boosterPackAmount: number;
	boosterTokenIcon: string;
	boosterTokenName: string;
	boosterTokenTicker: string;
	address: string;
}

const boosters: Booster[] = [
	{
		bpid: 1,
		boosterPackAmount: 100,
		boosterTokenIcon: "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/.github/assets/icons/ufarm.png",
		boosterTokenName: "Unifarm Token",
		boosterTokenTicker: "UFARM",
		address: "0xf7745D2e7FdE51c542568F718457d983F761e8C3"
	},
	{
		bpid: 10,
		boosterPackAmount: 150,
		boosterTokenIcon: "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/.github/assets/icons/Polkabridge.png",
		boosterTokenName: "PolkaBridge",
		boosterTokenTicker: "PBR",
		address: "0xC10bbe7DC1701B3f17276CD2665DE8de9EC73aC5"
	}
]

const farmData = {
	farmId: 0,
	cohortAddress: '0x828954676f2634D404251f05e4F619FF83f7EceB',
	farmTokenName: '',
	farmTokenIcon: '',
	cohortVersion: '',
	farmTokenAddress: '',
	APY: 0,
}

const ConfirmStakeModal = ({ status,boosted }: IsConfirmStake) => {
	const confirmStake = (status) => {
		if (status === 'pending') {
			return <ConfirmStaking 
				closeModal={()=>console.log('close Modal')}
				farmData={farmData}
				stakeAmount={10}
				stakeAmountInUSD={1}
				referralAddress=""
				boosters={boosters}
			/>
		}
		else if (status === 'confirmed') {
			return <TransactionComplete boosted={boosted}/>
		}
	}
	return (
		<>
			{confirmStake(status)}
		</>
	)
}
export default ConfirmStakeModal