'use client'

import { BuildingType } from "@/types/tables";
import HarvesterOption from "./HarvesterOption";
import { usePathname } from "next/navigation";

export default function HarvesterOptions({ harvesters }: { harvesters: BuildingType[]}) {
    const pathname = usePathname()
    const section = Number(pathname.split("/")[2]) || null

    return (
        <div className="flex items-center gap-4 flex-wrap justify-center">
            {harvesters.map(harvester => <HarvesterOption harvester={harvester} selected={harvester.id == section} />)}
        </div>
    )
}