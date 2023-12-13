import { getQuestCorruption } from "./corruption";
import { getDropRates } from "./quest";

export async function updateStats() {
    const corruptionData = getQuestCorruption();
    const dropRatesData = getDropRates();
    const [corruption, dropRates] = await Promise.all([corruptionData, dropRatesData])
    console.log(corruption, dropRates)
}