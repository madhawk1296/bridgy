'use client'

import rubik from '@/fonts/rubik'
import { useContext, } from 'react'
import { useAccount } from 'wagmi'
import { SuscriptionContext } from './SubscribeModal'
import useSWR from 'swr'
import { fetcher } from '@/tools/fetcher'
import { getDate, getTimestampFromBlock } from '@/tools/time'

export default function DashboardSubscription() {
    const { menu, toggleMenu } = useContext(SuscriptionContext)
    const { address } = useAccount()
    const { data, error, isLoading } = useSWR(`/api/subscription/${address}`, fetcher)
    const { isSubscribed, subscribedUntil } = data?.data || { isSubscribed: false, subscribedUntil: 0}
    const expireDate = getTimestampFromBlock(subscribedUntil)

    return (
        <div className='w-[300px] h-fit border-2 shadow rounded-xl flex flex-col gap-1 p-[15px]'>
            <h1 className={`${rubik.semiBold} text-center text-gray-800 tracking-wide underline`}>Subscription</h1>
            <div className='flex items-center justify-between text'>
                <h1 className='text-sm text-gray-800 tracking-wide'>Status</h1>
                <h1 className={`text-sm text-gray-800 tracking-wide ${rubik.semiBold} ${isSubscribed ? "text-green-500" : "text-red-500"}`}>{isSubscribed ? "Active" : "Not Active"}</h1>
            </div>
            {subscribedUntil > 0 && <div className='flex items-center justify-between text'>
                <h1 className='text-sm text-gray-800 tracking-wide'>Expires</h1>
                <h1 className={`text-sm text-gray-800 tracking-wide ${rubik.semiBold}`}>{getDate(expireDate)}</h1>
            </div>}
            <button onClick={toggleMenu} className='bg-red-500 mt-[15px] py-[5px] rounded-xl text-sm text-gray-50 shadow-md'>Buy Subscription</button>
        </div>
    )
}