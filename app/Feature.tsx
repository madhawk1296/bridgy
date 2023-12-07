import Sword from "@/components/icons/Sword";
import rubik from "@/fonts/rubik";
import { ReactNode } from "react";

export default function Feature({ icon, title, content }: { icon: ReactNode, title: string, content: string}) {
    return (
        <div className="border-2 shadow-md rounded-xl h-[120px] w-[300px] px-[20px] py-[20px] flex items-center gap-4">
            <div className="h-[40px]">
                {icon}
            </div>
            <div className="flex flex-col self-start">
                <h1 className={`text-2xl ${rubik.semiBold} tracking-wide text-gray-800`}>{title}</h1>
                <h1 className={`text-sm ${rubik.medium} tracking-wide text-gray-700`}>{content}</h1>
            </div>
        </div>
    )
}