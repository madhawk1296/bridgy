import rubik from "@/fonts/rubik";
import Container from "../Container";
import Craft from "./Craft";
import getItems from "@/tools/items";
import getBuildings from "@/tools/buildings";

export default async function Main() {
    const itemsData = getItems();
    const buildingsData = getBuildings();
 
    const [items, buildings] = await Promise.all([itemsData, buildingsData])
    const corruption = buildings!.find(building => building.type == "crafting")!.corruption || 0
    
    return (
        <Container>
            <div className="flex flex-col gap-4 items-center">
                <h1 className={`${rubik.bold} text-4xl md:text-6xl text-center text-gray-800`}>Craft</h1>
            </div>
            <Craft items={items} corruption={corruption} />
        </Container>
    )
}