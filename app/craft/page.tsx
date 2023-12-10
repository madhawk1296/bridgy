import { updatePrices } from "@/tools/prices";
import IsConnected from "../IsConnected";
import IsSubscribed from "../IsSubscribed";
import Landing from "../Landing";
import Main from "./Main";

export default async function Page() {
    updatePrices()

    return (
        <IsSubscribed> 
            <Main />   
        </IsSubscribed>
    )
}