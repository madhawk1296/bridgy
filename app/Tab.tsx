import Home from "@/components/icons/Home";
import Potion from "@/components/icons/Potion";
import Sword from "@/components/icons/Sword";
import rubik from "@/fonts/rubik";
import Link from "next/link";
import { ReactNode } from "react";

export default function Tab({ title, link, iconName, selected }: { title: string, link: string, iconName: string, selected: boolean}) {
    const icon = iconName == "quest" ? <Sword selected={selected} /> : iconName == "craft" ? <Potion selected={selected} /> : <Home selected={selected} />

    return (
        <Link href={link}>
            <button className={`md:px-[30px] w-full h-full flex items-center justify-center py-[5px] text-xl md:text-2xl border-b-4 ${selected ? "text-red-500 border-red-500" : "text-gray-700 border-transparent"} tracking-wide ${rubik.semiBold} gap-2`}>
                <div className="h-[20px] md:h-[25px]">
                    {icon}
                </div>
                {title}
            </button>
        </Link>
    )
}