import rubik from "@/fonts/rubik";
import Container from "../Container";
import Quest from "./Quest";
import { getDropRates } from "@/tools/quest";
import getItems from "@/tools/items";
import getBuildings from "@/tools/buildings";

export default async function Main() {
    const itemsData = getItems();
    const buildingsData = getBuildings();
    const [items, buildings] = await Promise.all([itemsData, buildingsData])
    
    const questing = buildings!.find(building => building.type == "questing")!
    const corruption = questing.corruption || 0
    const dropRates = questing.drop_rates.map((dropRate, index) => {
        return {
            tier: index + 1,
            dropRate
        }
    })

    return (
        <Container>
            <div className="flex flex-col gap-4 items-center">
                <h1 className={`${rubik.bold} text-4xl md:text-6xl text-center text-gray-800`}>Quest</h1>
            </div>
            <Quest items={items} corruption={corruption} dropRates={dropRates} />
        </Container>
    )
}