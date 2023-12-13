import { updatePrices } from "@/tools/prices";
import IsSubscribed from "../IsSubscribed";
import Main from "./Main";
import { updateCorruption, updateDropRates } from "@/tools/buildings";

export default async function Page() {
    updatePrices()
    updateCorruption()
    updateDropRates()

    return (
        <IsSubscribed> 
            <Main />   
        </IsSubscribed>
    )
}