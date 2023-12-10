import rubik from "@/fonts/rubik";
import Container from "../Container";
import { getQuestCorruption } from "@/tools/corruption";
import Quest from "./Quest";
import { getDropRates } from "@/tools/quest";
import getItems from "@/tools/items";

export default async function Main() {
    const itemsData = getItems();
    const corruptionData = getQuestCorruption();
    const [items, corruption] = await Promise.all([itemsData, corruptionData])
    const dropRates = await getDropRates(corruption);

    return (
        <Container>
            <div className="flex flex-col gap-4 items-center">
                <h1 className={`${rubik.bold} text-4xl md:text-6xl text-center text-gray-800`}>Quest</h1>
            </div>
            <Quest items={items} corruption={corruption} dropRates={dropRates} />
        </Container>
    )
}