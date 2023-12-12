'use client'

import Home from "@/components/icons/Home";
import Tab from "./Tab";
import Sword from "@/components/icons/Sword";
import Potion from "@/components/icons/Potion";
import { usePathname } from "next/navigation";

export default function Nav() {
    const pathname = usePathname()
    const section = pathname.split("/")[1] || "home"
    
    return (
        <div className="h-full w-full relative grid grid-cols-4 md:flex justify-center">
            <Tab title="Home" link="/" iconName="home" selected={section == "home"} />
            <Tab title="Quest" link="/quest" iconName="quest" selected={section == "quest"} />
            <Tab title="Craft" link="/craft" iconName="craft" selected={section == "craft"} />
        </div>
    )
}