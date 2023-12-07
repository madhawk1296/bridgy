'use client'

import BridgeworldHelper from "@/components/logos/BridgeworldHelper";
import rubik from "@/fonts/rubik";
import Wallet from "./Wallet";
import Nav from "./Nav";
import IsConnected from "./IsConnected";
import IsSubscribed from "./IsSubscribed";
import Link from "next/link";
import { useAccount } from "wagmi";
import useSWR from "swr";
import { fetcher } from "@/tools/fetcher";

export default function Header() {
    const { address } = useAccount()
    const { data, error, isLoading } = useSWR(`/api/subscription/${address}`, fetcher)
    const { isSubscribed, subscribedUntil } = data?.data || { isSubscribed: false, subscribedUntil: 0}

    return (
        <>
            <div className="relative h-[80px] flex items-center justify-between px-[20px]">
                <Link className="" href="/">
                    <button className='justify-self-start! flex gap-2 items-center md:w-[280px]'>
                        <div className='h-[30px]'>
                            <BridgeworldHelper />
                        </div>
                    </button>
                </Link>
                <div className='flex items-center gap-2 md:w-[280px] justify-end'>
                    <Wallet />
                </div>
            </div>
            <div className={`${isSubscribed ? "block" : "hidden"} bottom-0 md:top-0 fixed w-screen md:w-full h-[80px] shadow flex items-center justify-between md:px-[80px] z-10 bg-white`}>
                <Link className="hidden md:block" href="/">
                    <button className='justify-self-start! flex gap-2 items-center w-[280px]'>
                        <div className='h-[30px]'>
                            <BridgeworldHelper />
                        </div>
                        <h1 className={`text-2xl tracking-wide text-gray-800 font-bold ${rubik.semiBold}`}>Bridgeworld Helper</h1>
                    </button>
                </Link>
                <IsSubscribed>
                    <Nav />
                </IsSubscribed>
                <div className='hidden md:block flex items-center gap-2 w-[280px] justify-end'>
                    <Wallet />
                </div>
            </div>
        </>
    )
}