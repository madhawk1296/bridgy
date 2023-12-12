import { callFunction } from "@/clients/alchemy"
import { ethersInterface } from "@/clients/ethers"
import magicABI from "@/data/abis/magic.json"
import Web3 from "web3"

export async function getMagicApproved(address: string) {
    const functionName = "allowance"
    const inter = ethersInterface(magicABI)
    const encoded = inter.encodeFunctionData(functionName, [address, process.env.NEXT_PUBLIC_SUBSCRIPTION_ADDRESS])
    const response = await callFunction(process.env.NEXT_PUBLIC_MAGIC_ADDRESS!, encoded)
    const decoded = inter.decodeFunctionResult(functionName, response)[0]
    return Number(Web3.utils.fromWei(BigInt(parseInt(decoded)), "ether"))
}

export async function getMagicBalance(address: string) {
    const functionName = "balanceOf"
    const inter = ethersInterface(magicABI)
    const encoded = inter.encodeFunctionData(functionName, [address])
    const response = await callFunction(process.env.NEXT_PUBLIC_MAGIC_ADDRESS!, encoded)
    const decoded = inter.decodeFunctionResult(functionName, response)[0]
    return Number(Web3.utils.fromWei(BigInt(parseInt(decoded)), "ether"))
}