import { ethersInterface } from "@/clients/ethers";
import masterOfCoin from "@/data/abis/masterOfCoin.json"
import middleman from "@/data/abis/middleman.json"
import { callFunction } from "@/clients/alchemy";
import Web3 from "web3";
import { zeroAddress } from "./address";
import { BuildingType, ItemType } from "@/types/tables";
import { StakedItemType } from "@/app/harvesters/[harvesterId]/Harvester";
import { secondsPer } from "./time";

export function corruptionMiningPower(corruption: number) {
    if (corruption >= 600000) {
        return .4;
    } else if (corruption >= 500000) {
        return .5;
    } else if (corruption >= 400000) {
        return .6;
    } else if (corruption >= 300000) {
        return .7;
    } else if (corruption >= 200000) {
        return .8;
    } else if (corruption >= 100000) {
        return .9
    } else {
        return 1;
    }
}

function getUserBoost(primariesStaked: StakedItemType[], secondariesStaked: StakedItemType[]) {
    return [...primariesStaked, ...secondariesStaked].reduce((acc, item) => {
        return acc + (item.boost! * item.quantity)
    }, 0)
}

function getCorruptionEmissions(emissions: number, corruption: number, displayCorruption: number) {
    const originalEmissions = emissions / corruptionMiningPower(corruption)
    return originalEmissions * corruptionMiningPower(displayCorruption) 

}

export function calculateHarvester(harvester: BuildingType, corruption: number, displayCorruption: number, timeframe: string, magicStaked: number, primariesStaked: StakedItemType[], secondariesStaked: StakedItemType[]) {
    const { total_lp, emissions_per_second } = harvester
    const userBoost = getUserBoost(primariesStaked, secondariesStaked)
    const userLp = magicStaked + magicStaked * (userBoost / 100)
    const userShare = userLp / total_lp!
    const corruptionEmissions = getCorruptionEmissions(emissions_per_second!, corruption, displayCorruption)
    const userRewards = userShare * corruptionEmissions!
    const rewardPerTimeframe = userRewards * secondsPer(timeframe)
    const apy = userRewards * secondsPer("year") / magicStaked

    return {
        revenue: rewardPerTimeframe,
        cost: 0,
        profit: rewardPerTimeframe,
        apy
    }
}