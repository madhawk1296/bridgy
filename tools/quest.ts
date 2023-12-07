import { ethersInterface } from "@/clients/ethers"
import { hoursPer } from "./time"
import masterOfInflation from "@/data/abis/masterOfInflation.json"
import { callFunction } from "@/clients/alchemy"
import Web3 from "web3"
import { getRegionalTreasures, getTreasureTiers } from "./treasures"
import { ItemType } from "@/types/item"


export function calculateQuest(items: ItemType[], timeframe: string, legions: number, legionType: string, legionRarity: string, region: string, constellation: number, questLevel: number, questPart: number, cardsFlipped: number, corruptCardsUnflipped: number,  corruption: number, dropRates: {tier: number, dropRate: number}[]) {
    const consumables = items.filter(item => item.collection == "consumables")
    const treasures = items.filter(item => item.collection == "treasures")

    // revenue
    const eachRevenue = getQuestValue(consumables, treasures, dropRates, legionType, legionRarity, region, questLevel, questPart, cardsFlipped)

    // crafts per timeframe
    const questsPerTimeframe = timeframe == "each" ? 1 : getQuestsPerTimeframe(timeframe, legionType, constellation, questPart, corruptCardsUnflipped, corruption)
    
    return {
        revenue: eachRevenue * questsPerTimeframe * legions,
        cost: 0,
        profit: eachRevenue * questsPerTimeframe * legions
    }
}

function getQuestsPerTimeframe(timeframe: string, legionType: string, constellation: number, questPart: number, corruptCardsUnflipped: number, corruption: number) {
    const totalQuestHours = getTotalQuestHours(questPart, constellation, legionType, corruption, corruptCardsUnflipped)
    return hoursPer(timeframe) / totalQuestHours
}

function getTotalQuestHours(questPart: number, constellation: number, legionType: string, corruption: number, corruptCardsUnflipped: number) {
    const questingHours = getQuestingHours(questPart, corruption)
    const statisHours = (legionType == "genesis" || questPart == 1) ? 0 : getStasisHours(constellation, questPart, corruption)
    const corruptStasisHours = (legionType == "genesis" || questPart != 3) ? 0 : getCorruptCardsStasisHours(corruptCardsUnflipped, corruption)
    return questingHours + statisHours + corruptStasisHours
}

function getCorruptCardsStasisHours(corruptCardsUnflipped: number, corruption: number) {
    const corruptionStasis = corruptCardsUnflipped > 0 ? 0 : getCorruptionExtraHours(corruption)
    return 12 * corruptCardsUnflipped + corruptionStasis
}

function getStasisHours(constellation: number, questPart: number, corruption: number) {
    const corruptionStasis = getCorruptionExtraHours(corruption)

    const constellationReduction: Record<number, number> = {
        0: 0,
        1: .04,
        2: .06,
        3: .08,
        4: .1,
        5: .15,
        6: .2,
        7: .25
    }

    const totalStasisHours = (4 * (questPart - 1)) + corruptionStasis
    const stasisProbability = .3 - constellationReduction[constellation]

    return totalStasisHours * stasisProbability
}

function getQuestingHours(questPart: number, corruption: number) {
    const questTime = getCorruptionExtraHours(corruption)
    return (7.5 + questTime) * questPart
}

function getCorruptionExtraHours(corruption: number) {
    if (corruption > 100000) {
        return 1
    } else if (corruption > 200000) {
        return 2
    } else if (corruption > 300000) {
        return 3
    } else if (corruption > 400000) {
        return 4
    } else if (corruption > 500000) {
        return 5
    } else if (corruption > 600000) {
        return 6
    } else {
        return 0
    }
}

function getQuestValue(consumables: any, treasures: any, dropRates: {tier: number, dropRate: number}[], legionType: string, legionRarity: string, region: string, questLevel: number, questPart: number, cardsFlipped: number) {
    const adjustedDropRates = getFragmentDropRates(dropRates, legionType, legionRarity, questLevel, questPart, cardsFlipped)
    const regionalTreasures = getRegionalTreasures(treasures, region)

    const fragment = getFragmentValue(adjustedDropRates, regionalTreasures, questPart, consumables)
    const treasure = legionType == "genesis" ? getTreasureValue(regionalTreasures, legionRarity, questPart) : 0
    const essence = getEssenceValue(consumables, questPart)
    const shard = getShardValue(consumables, questPart)
    const lock = getLockValue(consumables)

    return fragment + treasure + essence + shard + lock
}

function getLockValue(consumables: ItemType[]) {
    const lockPrice = consumables.find(consumable => consumable.id === "0xF3d00A2559d84De7aC093443bcaAdA5f4eE4165C-10")!.price
    const probability = .00001

    return lockPrice * probability
}

function getShardValue(consumables: ItemType[], questPart: number) {
    const shardPrice = consumables.find(consumable => consumable.id === "0xF3d00A2559d84De7aC093443bcaAdA5f4eE4165C-9")!.price
    const amount = questPart === 1 ? 1 : questPart === 2 ? 2 : questPart === 3 ? 3 : 0

    return shardPrice * amount
}

function getEssenceValue(consumables: ItemType[], questPart: number) {
    const essencePrice = consumables.find(consumable => consumable.id === "0xF3d00A2559d84De7aC093443bcaAdA5f4eE4165C-8")!.price
    const amount = questPart === 1 ? 1 : questPart === 2 ? 2 : questPart === 3 ? 3 : 0

    return essencePrice * amount
}

function getFragmentValue(dropRates: {tier: number, dropRate: number}[], regionalTreasures: any, questPart: number, consumables: any) {
    // get tiered fragment values
    const fragmentTiers = getFragmentTiers(regionalTreasures, consumables)

    return getTotalFragmentValue(fragmentTiers, dropRates, questPart)
}

function getTreasureValue(treasures: any, legionRarity: string, questPart: number) {
    // get tiered treasure values
    const treasureTiers = getTreasureTiers(treasures)

    // get average treasure value based on quest difficulty
    const averageTreasureValue = getAverageFragmentValue(treasureTiers, questPart)

    // get drop rate 
    const treasureDropRate = getTreasureDropRate(legionRarity)

    return averageTreasureValue * treasureDropRate
}

function getTreasureDropRate(legionRarity: string) {
    return legionRarity === "common" ? .01 : legionRarity === "special" ? .015: legionRarity === "uncommon" ? .02 : legionRarity === "rare" ? .04 : legionRarity === "legendary" ? .12 : 0
}

function getAverageFragmentValue(fragments: any, questDifficulty: number) {
    return questDifficulty === 1 ? .15 * fragments[3] + .85 * fragments[4] : questDifficulty === 2 ? .2 * fragments[2] + .3 * fragments[3] + .5 * fragments[4] : questDifficulty === 3 ? .05 * fragments[0] + .1 * fragments[1] + .45 * fragments[2] + .4 * fragments[3] : 0 
}

function getFragmentTiers(treasures: ItemType[], consumables: ItemType[]) {
    const prismShardsPrice = consumables.find(consumable => consumable.id === "0xF3d00A2559d84De7aC093443bcaAdA5f4eE4165C-9")!.price

    const fragmentTiers:Record<number, number> = {}

    for (let i =1; i < 6; i++) {
        // get prism shards used based on tier
        const prismShardsUsed = i === 1 ? 24 : i === 2 ? 16 : i === 3 ? 8 : i === 4 ? 4 : 2
        const prismShardsCost = prismShardsUsed * prismShardsPrice

        // get treasure value based on tier
        const treasureTier = treasures.filter(treasure => treasure.tier === i)
        const treasureTierLength = treasureTier.length
        const averageTreasureTier = treasureTier.reduce((currentTotal, treasure) => currentTotal + treasure.price, 0) / treasureTierLength

        // get fragment value based on tier
        const averageFragmentTier = (averageTreasureTier - prismShardsCost) / 12
        
        fragmentTiers[i] = averageFragmentTier
    }

    return fragmentTiers
}

function getTotalFragmentValue(fragmentTiers: any, dropRates: {tier: number, dropRate: number}[], questPart: number) {
    if (questPart === 2) {
        return (fragmentTiers[5] * getDropRateTier(dropRates, 5)) + (fragmentTiers[4] * getDropRateTier(dropRates, 4)) + (fragmentTiers[3] * getDropRateTier(dropRates, 3))

    } else if(questPart === 3) {
        return (fragmentTiers[3] * getDropRateTier(dropRates, 3)) + (fragmentTiers[2] * getDropRateTier(dropRates, 2)) + (fragmentTiers[1] * getDropRateTier(dropRates, 1))

    } else {
        return (fragmentTiers[5] * getDropRateTier(dropRates, 5)) + (fragmentTiers[4] * getDropRateTier(dropRates, 4)) 

    }
}

function getDropRateTier(dropRates: {tier: number, dropRate: number}[], tier: number) {
    return dropRates.find(dropRate => dropRate.tier == tier)?.dropRate!
}

export default function getFragmentDropRates(dropRates: {tier: number, dropRate: number}[], legionType: string, legionRarity: string, questLevel: number, questPart: number, cardsFlipped: number): {tier: number, dropRate: number}[] {
    return dropRates.map(({ tier, dropRate }) => {
        const levelBonus = questLevel === 4 ? .05 : questLevel === 5 ? .1 : questLevel === 6 ? .15 : 0

        // if quest difficulty is 3, assign cards flipped bonus based on amount of cards flipped
        let cardsFlippedBonus = 0
        if(questPart === 3) {
            cardsFlippedBonus = cardsFlipped === 1 ? .05 : cardsFlipped === 2 ? .1 : cardsFlipped === 3 ? .15 : 0
        }
    
        // if legion is genesis, assign genesis bonus based on rarity
        let genesisBonus = 0
        if (legionType === "genesis") {
            genesisBonus = legionRarity === "common" ? .025 : legionRarity === "special" ? .0375: legionRarity === "uncommon" ? .05 : legionRarity === "rare" ? .1 : legionRarity === "legendary" ? .3 : 0
        }
    
        return {
            tier,
            dropRate: dropRate * (1 + levelBonus + cardsFlippedBonus + genesisBonus)
        }
    })
}

export async function getDropRates(corruption: number): Promise<{ tier: number, dropRate: number }[]> {
    const functionName = "chanceOfItemFromPools"
    const inter = ethersInterface(masterOfInflation)

    const poolIds = [1,2,3,4,5]
    const poolArgs = poolIds.map(poolId => {
        const dropRate = getCorruptionDropRate(corruption) * 100000
        const negative = dropRate < 0
        const bonus = negative ? 0 : dropRate
        const negativeBonus = negative ? Math.abs(dropRate) : 0  
        return [poolId, 1, bonus, negativeBonus]
    })

    const encoded = inter.encodeFunctionData(functionName, [poolArgs])
    const response = await callFunction(process.env.MASTER_OF_INFLATION_ADDRESS!, encoded)
    const decoded = inter.decodeFunctionResult(functionName, response)[0] as string[]
    return decoded.map((data, index) => {
        return {
            tier: index + 1, 
            dropRate: parseInt(data) / 100000
        }
    })
}

export function getCorruptionDropRate(corruption: number) {
    if (corruption > 600000) {
        return -.48
    } else if (corruption > 500000) {
        return -.32
    } else if (corruption > 400000) {
        return -.16
    } else if (corruption > 300000) {
        return -.08
    } else if (corruption > 200000) {
        return -.04
    } else if (corruption > 100000) {
        return 0
    } else {
        return .1
    }
}