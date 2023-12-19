import getBuildings from "@/tools/buildings";
import { redirect } from "next/navigation";

export default async function Page() {
    const buildingsData = getBuildings();
 
    const [buildings] = await Promise.all([buildingsData])
    const harvesters = buildings!.filter(building => building.type == "harvester" && building.active)

    redirect(`/harvesters/${harvesters[0]!.id}`)
}