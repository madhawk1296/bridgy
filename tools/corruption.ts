import { callFunction } from "@/clients/alchemy"
import { encodeFunctionData, ethersInterface } from "@/clients/ethers"
import corruption from "@/data/abis/corruption.json"
import Web3 from "web3"

export async function getCraftCorruption() {
    const functionName = "balanceOf"
    const inter = ethersInterface(corruption)
    const encoded = inter.encodeFunctionData(functionName, [process.env.CRAFTING_ADDRESS!])
    const response = await callFunction(process.env.CORRUPTION_ADDRESS!, encoded)
    const decoded = inter.decodeFunctionResult(functionName, response)[0]
    return Number(Web3.utils.fromWei(decoded, "ether"))
}

export async function getQuestCorruption() {
    const functionName = "balanceOf"
    const inter = ethersInterface(corruption)
    const encoded = inter.encodeFunctionData(functionName, [process.env.QUESTING_ADDRESS!])
    const response = await callFunction(process.env.CORRUPTION_ADDRESS!, encoded)
    const decoded = inter.decodeFunctionResult(functionName, response)[0]
    return Number(Web3.utils.fromWei(decoded, "ether"))
}