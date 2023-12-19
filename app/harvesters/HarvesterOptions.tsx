'use client'

import { Tables } from "@/types/tables";
import HarvesterOption from "./HarvesterOption";
import { usePathname } from "next/navigation";

export default function HarvesterOptions({ harvesters }: { harvesters: Tables<"buildings">[]}) {
    const pathname = usePathname()
    const section = pathname.split("/")[2] || null

    return (
        <div className="flex items-center gap-4 flex-wrap justify-center">
            {harvesters.map(harvester => <HarvesterOption harvester={harvester} selected={harvester.id == section} />)}
        </div>
    )
}