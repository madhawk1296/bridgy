import { updatePrices } from "@/tools/prices";
import IsSubscribed from "../IsSubscribed";
import Main from "./Main";

export default async function Page() {
    updatePrices()

    return (
        <IsSubscribed> 
            <Main />   
        </IsSubscribed>
    )
}