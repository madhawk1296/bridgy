import { getMagicApproved } from "@/tools/magic"
import { getIsSubscribed, getSubscribedUntil } from "@/tools/subscription"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params: { address }}: { params: { address: string}})  {
    const isSubscribed = await getIsSubscribed(address!)
    const subscribedUntil = await getSubscribedUntil(address!)

    return NextResponse.json({
        data: { isSubscribed, subscribedUntil},
        error: null
    })
}