import { ItemType } from "@/types/tables"
import { hoursPer } from "./time"

export function calculateCraft(items: ItemType[], timeframe: string, legions: number, craft: string, replace: boolean, corruption: number) {
    const consumables = items.filter(item => item.collection == "consumables")
    const treasures = items.filter(item => item.collection == "treasures")

    // revenue
    const eachRevenue = getCraftValue(consumables, craft)
    
    // cost
    const craftingFee = 2.5
    const brokenTreasures = replace ? getBrokenTreasures(treasures, craft, corruption) : 0
    const eachCost = craftingFee + brokenTreasures

    // profit
    const eachProfit = eachRevenue - eachCost

    // crafts per timeframe
    const craftsPerTimeframe = timeframe == "each" ? 1 : getCraftsPerTimeframe(craft, timeframe)
    
    return {
        revenue: eachRevenue * craftsPerTimeframe * legions,
        cost: eachCost * craftsPerTimeframe * legions,
        profit: eachProfit * craftsPerTimeframe * legions
    }
}

function getCraftValue(consumables: ItemType[], craft: string) {
    if(craft == "prism") {
        const smallPrismProbability = 0.9
        const mediumPrismProbability = 0.09
        const largePrismProbability = 0.01

        const smallPrismPrice = consumables.find(consumable => consumable.token_id === 1)!.price
        const mediumPrismPrice = consumables.find(consumable => consumable.token_id === 2)!.price
        const largePrismPrice = consumables.find(consumable => consumable.token_id === 3)!.price

        return smallPrismPrice * smallPrismProbability + mediumPrismPrice * mediumPrismProbability + largePrismPrice * largePrismProbability
    } else {
        const smallExtractorProbability = 0.75
        const mediumExtractorProbability = 0.15
        const largeExtractorProbability = 0.1
    
        const smallExtractorPrice = consumables.find(consumable => consumable.token_id === 4)!.price
        const mediumExtractorPrice = consumables.find(consumable => consumable.token_id === 5)!.price
        const largeExtractorPrice = consumables.find(consumable => consumable.token_id === 6)!.price
    
        return smallExtractorPrice * smallExtractorProbability + mediumExtractorPrice * mediumExtractorProbability + largeExtractorPrice * largeExtractorProbability
    }
}

function getBrokenTreasures(treasures: any[], craft: string, corruption: number) {
    const treasuresPerCraft = {
        "prism": {
            1: 0,
            2: 0,
            3: 2,
            4: 2,
            5: 2
        },
        "booster": {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 2
        }
    }

    return Object.entries(treasuresPerCraft[craft as "prism" | "booster"]).reduce((totalCost, [tier, treasureAmount]) => {
        const tierFloor = Math.min(...treasures.filter(treasure => treasure.tier == Number(tier) && treasure.listed).map(treasure => treasure.price))
        const cost  = tierFloor * getTreasureBreakRate(Number(tier), corruption) * treasureAmount

        return totalCost + cost
    }, 0)
}

function getTreasureBreakRate(tier: number, corruption: number) {
    switch(tier) {
        case 1:
            return 0.03 + corruptionIncrease(corruption)
        case 2:
            return 0.06 + corruptionIncrease(corruption)
        case 3:
            return 0.09 + corruptionIncrease(corruption)
        case 4:
            return 0.12 + corruptionIncrease(corruption)
        default:
            return 0.15 + corruptionIncrease(corruption)
    }
}

export function corruptionIncrease(corruption: number) {
    if (corruption >= 600000) {
        return .1;
    } else if (corruption >= 500000) {
        return .08;
    } else if (corruption >= 400000) {
        return .06;
    } else if (corruption >= 300000) {
        return .04;
    } else if (corruption >= 200000) {
        return .02;
    } else {
        return 0;
    }
}

function getCraftsPerTimeframe(craft: string, timeframe: string) {
    const craftHours = getHoursPerCraft(craft)
    return hoursPer(timeframe) / craftHours
}

export function getHoursPerCraft(craft: string) {
    return craft == "prism" ? 12 : 24
}