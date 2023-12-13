import { updatePrices } from "@/tools/prices";
import IsSubscribed from "../IsSubscribed";
import Main from "./Main";
import { updateCorruption } from "@/tools/buildings";

export default async function Page() {
    updatePrices()
    updateCorruption()

    return (
        <IsSubscribed> 
            <Main />   
        </IsSubscribed>
    )
}