export function getRegionalTreasures(treasures: any, region: string) {
    // exclude grin and honeycomb treasures
    const filteredTreasures = treasures.filter(treasure => treasure.id !== "0xebba467ecb6b21239178033189ceae27ca12eadf-95" && treasure.id !== "0xebba467ecb6b21239178033189ceae27ca12eadf-97")
    
    // return treasures from chosen region
    if(region == "corrupt_canyons") {
        return filteredTreasures.filter(treasure => treasure.category === "Alchemy" || treasure.category === "Arcana")
    } else if (region == "desert_ruins") {
        return filteredTreasures.filter(treasure => treasure.category === "Smithing" || treasure.category === "Leatherworking")
    } else {
        return filteredTreasures.filter(treasure => treasure.category === "Enchanting" || treasure.category === "Brewing")
    }
}

export function getTreasureTiers(treasures: any) {
    const treasureTiers = []

    for (let i =1; i < 6; i++) {
        const treasureTier = treasures.filter(treasure => treasure.tier === i)
        const treasureTierLength = treasureTier.length
        const averageTreasureTier = treasureTier.reduce((currentTotal, treasure) => currentTotal + treasure.price, 0) / treasureTierLength
        
        treasureTiers.push(averageTreasureTier)
    }

    return treasureTiers
}