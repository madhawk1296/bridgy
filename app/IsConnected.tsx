'use client'

import { fetcher } from "@/tools/fetcher";
import { ReactNode } from "react";
import useSWR from "swr";
import { useAccount } from 'wagmi'


export default function IsConnected({ dashboard, landing }: { dashboard: ReactNode, landing: ReactNode}) {
    const { status, isConnecting, isReconnecting } = useAccount()
    const connected = status == "connected"
    const { address } = useAccount()
    const { data, error, isLoading } = useSWR(`/api/subscription/${address}`, fetcher)
    const { isSubscribed, subscribedUntil } = data?.data || { isSubscribed: false, subscribedUntil: 0}

    return !(isConnecting || isReconnecting || isLoading) && (connected ? dashboard : landing)
}