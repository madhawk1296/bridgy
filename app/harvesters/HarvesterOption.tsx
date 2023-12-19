import { BuildingType } from "@/types/tables";
import Link from "next/link";

export default function HarvesterOption({ harvester, selected }: { harvester: BuildingType, selected: boolean}) {
    const { name, id } = harvester
    return (
        <Link href={`/harvesters/${id}`}>
            <button className={`flex flex-col gap-1 items-center p-[10px] border-[3px] rounded-xl shadow-md smoothe ${selected && "border-gray-600"}`}>
                <h1 className="text-xl text-gray-600 tracking-wide">{name}</h1>
            </button>
        </Link>
    )
}