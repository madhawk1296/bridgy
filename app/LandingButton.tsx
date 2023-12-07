'use client'

import rubik from "@/fonts/rubik";
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
  } from '@rainbow-me/rainbowkit';


export default function LandingButton() {
    const { openConnectModal } = useConnectModal();

    return (
        <button onClick={openConnectModal} className={`${rubik.semiBold} tracking-wide bg-red-500 rounded-2xl shadow-md text-gray-50 py-[12px] px-[20px] smoothe hover:bg-red-600 hover:shadow-lg disabled:bg-red-300`}>Connect Wallet</button>
    )
}