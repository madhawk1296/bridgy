import { callFunction } from "@/clients/alchemy"
import { ethersInterface } from "@/clients/ethers"
import subscriptionABI from "@/data/abis/subscription.json"

export async function getIsSubscribed(address: string) {
    const functionName = "isSubscribed"
    const inter = ethersInterface(subscriptionABI)
    const encoded = inter.encodeFunctionData(functionName, [address])
    const response = await callFunction(process.env.NEXT_PUBLIC_SUBSCRIPTION_ADDRESS!, encoded)
    const decoded = inter.decodeFunctionResult(functionName, response)[0]
    return decoded
}

export async function getSubscribedUntil(address: string) {
    const functionName = "subscribedUntil"
    const inter = ethersInterface(subscriptionABI)
    const encoded = inter.encodeFunctionData(functionName, [address])
    const response = await callFunction(process.env.NEXT_PUBLIC_SUBSCRIPTION_ADDRESS!, encoded)
    const decoded = inter.decodeFunctionResult(functionName, response)[0]
    return parseInt(decoded)
}