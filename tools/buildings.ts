import { callFunction } from "@/clients/alchemy"
import { ethersInterface } from "@/clients/ethers"
import { supabaseAdminClient, supabaseServerClient } from "@/clients/supabase"
import Web3 from "web3"
import corruption from "@/data/abis/corruption.json"
import masterOfInflation from "@/data/abis/masterOfInflation.json"

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