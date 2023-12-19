import rubik from "@/fonts/rubik";
import Container from "../Container";
import getBuildings from "@/tools/buildings";
import HarvesterOption from "./HarvesterOption";
import { ReactNode } from "react";
import HarvesterOptions from "./HarvesterOptions";

export default async function Main({ children }: { children: ReactNode}) {
    const buildingsData = getBuildings();
 
    const [buildings] = await Promise.all([buildingsData])
    const harvesters = buildings!.filter(building => building.type == "harvester" && building.active)
    
    return (
        <Container>
            <div className="flex flex-col gap-4 items-center">
                <h1 className={`${rubik.bold} text-4xl md:text-6xl text-center text-gray-800`}>Harvesters</h1>
            </div>
            <HarvesterOptions harvesters={harvesters} />
            {children}
        </Container>
    )
}