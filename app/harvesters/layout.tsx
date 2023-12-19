import { updateEmissions, updateLp } from "@/tools/buildings";
import IsSubscribed from "../IsSubscribed";
import Main from "./Main";
import { updateCorruption } from "@/tools/buildings";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode}) {
    updateCorruption()
    updateEmissions()
    updateLp()

    return (
        <IsSubscribed> 
            <Main children={children} />   
        </IsSubscribed>
    )
}