import { callFunction } from "@/clients/alchemy"
import { ethersInterface } from "@/clients/ethers"
import { supabaseAdminClient, supabaseServerClient } from "@/clients/supabase"
import Web3 from "web3"
import corruption from "@/data/abis/corruption.json"
import masterOfInflation from "@/data/abis/masterOfInflation.json"
import masterOfCoin from "@/data/abis/masterOfCoin.json"
import harvester from "@/data/abis/harvester.json"
import middleman from "@/data/abis/middleman.json"
import { zeroAddress } from "./address";

export default async function getBuildings() {
    const supabase = supabaseServerClient()
    const { data: buildings, error } = await supabase.from("buildings").select()

    return buildings
}

async function getCorruption() {
    const supabase = supabaseServerClient()
    const { data: buildings, error } = await supabase.from("buildings").select()


    const functionName = "balanceOfBatch"
    const inter = ethersInterface(corruption)
    const encoded = inter.encodeFunctionData(functionName, [buildings!.map(building => building.address)])
    const response = await callFunction(process.env.CORRUPTION_ADDRESS!, encoded)
    const decoded: string[] = inter.decodeFunctionResult(functionName, response)[0]
    return buildings!.map((building, index) => {
        building.corruption = Number(Web3.utils.fromWei(BigInt(parseInt(decoded[index])), "ether"))
        return building
    })
}

export async function updateCorruption() {
    const supabase = supabaseAdminClient()
    const buildings = await getCorruption()

    buildings.forEach(async (building) => {
        await supabase.from("buildings").update({ corruption: building.corruption }).eq("id", building.id)
    })
}

export async function getDropRates() {
    const functionName = "chanceOfItemFromPools"
    const inter = ethersInterface(masterOfInflation)

    const poolIds = [1,2,3,4,5]
    const poolArgs = poolIds.map(poolId => {
        return [poolId, 1, 0, 0]
    })

    const encoded = inter.encodeFunctionData(functionName, [poolArgs])
    const response = await callFunction(process.env.MASTER_OF_INFLATION_ADDRESS!, encoded)
    const decoded = inter.decodeFunctionResult(functionName, response)[0] as string[]
    return decoded.map((data, index) => parseInt(data) / 100000)
}

export async function updateDropRates() {
    const supabase = supabaseAdminClient()
    const dropRates = await getDropRates()

    await supabase.from("buildings").update({ drop_rates: dropRates }).eq("type", "questing")
}

async function getRatePerSecond() {
    // get total emmissions
    const functionName = "getRatePerSecond"
    const inter = ethersInterface(masterOfCoin)
    const encoded = inter.encodeFunctionData(functionName, [process.env.MIDDLEMAN_ADDRESS])
    const response = await callFunction(process.env.MASTER_OF_COIN_ADDRESS!, encoded)
    const decoded = inter.decodeFunctionResult(functionName, response)[0]
    return Number(Web3.utils.fromWei(BigInt(parseInt(decoded)), "ether"))
}

async function getHarvesterShare(): Promise<Record<string, number>> {
    // get harvester shares 
    const functionName = "getHarvesterShares"
    const inter = ethersInterface(middleman)
    const encoded = inter.encodeFunctionData(functionName, [zeroAddress()])
    const response = await callFunction(process.env.MIDDLEMAN_ADDRESS!, encoded)
    const [harvesters, shares, totalShare] = inter.decodeFunctionResult(functionName, response)
    const formattedTotal = Number(Web3.utils.fromWei(BigInt(parseInt(totalShare)), "ether"))

    return harvesters.reduce((all: Record<string, number>, harvester: string, index: number) => {
        all[harvester.toLowerCase()] = Number(Web3.utils.fromWei(BigInt(parseInt(shares[index])), "ether")) / formattedTotal
        return all
    }, {})
}

export async function updateEmissions() {
    const ratePerSecond = await getRatePerSecond()
    const harvesterShares = await getHarvesterShare()

    const supabase = supabaseAdminClient()
    const { data: harvesters, error } = await supabase.from("buildings").select().eq("type", "harvester").eq("active", true)

    harvesters!.forEach(async (harvester) => {
        const harvesterShare = harvesterShares[harvester.address.toLowerCase()]
        await supabase.from("buildings").update({ emissions_per_second: harvesterShare * ratePerSecond }).eq("id", harvester.id)
    })
}

async function getLp(harvesterAddress: string) {
        // get harvester shares 
        const functionName = "totalLpToken"
        const inter = ethersInterface(harvester)
        const encoded = inter.encodeFunctionData(functionName, [])
        const response = await callFunction(harvesterAddress, encoded)
        const totalLp = inter.decodeFunctionResult(functionName, response)[0]
        return Number(Web3.utils.fromWei(BigInt(parseInt(totalLp)), "ether"))
}

export async function updateLp() {
    const supabase = supabaseAdminClient()
    const { data: harvesters, error } = await supabase.from("buildings").select().eq("type", "harvester").eq("active", true)

    harvesters!.forEach(async (harvester) => {
        const totalLp = await getLp(harvester.address)
        await supabase.from("buildings").update({ total_lp: totalLp }).eq("id", harvester.id)
    })
}