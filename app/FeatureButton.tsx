import Sword from "@/components/icons/Sword";
import rubik from "@/fonts/rubik";
import Link from "next/link";
import { ReactNode } from "react";

export default function FeatureButton({ link, icon, title, content }: { link: string, icon: ReactNode, title: string, content: string}) {
    return (
        <Link href={link}>
            <button className="border-2 shadow-md rounded-xl h-[120px] w-[300px] px-[20px] py-[20px] flex items-center justify-start gap-4 smoothe hover:shadow-lg hover:bg-red-50 hover:border-red-200">
                <div className="h-[40px]">
                    {icon}
                </div>
                <div className="flex flex-col self-start items-start text-start">
                    <h1 className={`text-2xl ${rubik.semiBold} tracking-wide text-gray-800`}>{title}</h1>
                    <h1 className={`text-sm ${rubik.medium} tracking-wide text-gray-700`}>{content}</h1>
                </div>
            </button>
        </Link>
    )
}