'use client'

import { fetcher } from "@/tools/fetcher"
import { ReactNode } from "react"
import useSWR from "swr"
import { useAccount } from "wagmi"

export default function IsSubscribed({ children }: { children: ReactNode }) {
    const { address } = useAccount()
    const { data, error, isLoading } = useSWR(`/api/subscription/${address}`, fetcher)
    const { isSubscribed, subscribedUntil } = data?.data || { isSubscribed: false, subscribedUntil: 0}

    return isSubscribed && children
}