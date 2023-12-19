import IsSubscribed from "@/app/IsSubscribed";
import Harvester from "./Harvester";
import getItems from "@/tools/items";
import getBuildings from "@/tools/buildings";

export default async function Page({ params: { harvesterId }}: { params: { harvesterId: number}}) {
    const itemsData = getItems()
    const buildingsData = getBuildings();
 
    const [items, buildings] = await Promise.all([itemsData, buildingsData])
    const harvester = buildings!.find(building => building.id == harvesterId)
    return (
        <IsSubscribed>
            <Harvester items={items!} harvester={harvester} />
        </IsSubscribed>
    )
}