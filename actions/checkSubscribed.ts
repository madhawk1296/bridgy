'use server'

import { getSubscribedUntil, getIsSubscribed } from "@/tools/subscription"

export default async function checkSubscribed(address: string) {
    const isSubscribed = await getIsSubscribed(address!)
    const subscribedUntil = await getSubscribedUntil(address!)

    return {isSubscribed, subscribedUntil}
}