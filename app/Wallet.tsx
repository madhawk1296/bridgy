'use client'

import Eth from '@/components/icons/Eth';
import Magic from '@/components/icons/Magic';
import { fetcher } from '@/tools/fetcher';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import numeral from 'numeral';
import useSWR from 'swr';
import { useAccount } from 'wagmi'

export default function Wallet() {
    const { address } = useAccount()
    const { data, error } = useSWR(`/api/balance/${address}`, fetcher)

    const magicBalance: number = data?.data || 0

    return (
        <ConnectButton.Custom>
        {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
        }) => {
            const ready = mounted && authenticationStatus !== 'loading';
            const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');;

            return (
            <div>
                {(() => {
                if (!connected) {
                    return (
                    <button className='py-[10px] px-[20px] rounded-3xl shadow-lg border-2 text-sm tracking-wide text-gray-800' onClick={openConnectModal} type="button">
                        Connect Wallet
                    </button>
                    );
                }

                if (chain.unsupported) {
                    return (
                    <button className='py-[10px] px-[20px] rounded-3xl shadow-lg border-2 text-sm tracking-wide text-gray-800' onClick={openChainModal} type="button">
                        Wrong network
                    </button>
                    );
                }

                return (
                    <button className='py-[10px] px-[20px] rounded-3xl shadow-lg border-2 text-sm tracking-wide text-gray-800 flex items-center gap-3' onClick={openAccountModal} type="button">
                        <div className='flex items-center gap-1.5'>
                            <div className='h-[15px]'>
                                <Magic />
                            </div>
                            {numeral(magicBalance).format("0,0.0a")}
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <div className='h-[18px]'>
                                <Eth />
                            </div>
                            {numeral(account.balanceFormatted).format("0,0.000a")}
                        </div>
                    </button>
                );
                })()}
            </div>
            );
        }}
        </ConnectButton.Custom>
    )
}