import rubik from "@/fonts/rubik";
import { ReactNode } from "react";

export default function Detail({ title, children }: { title: string, children: ReactNode}) {
    return (
        <div className="w-full flex items-center justify-between">
            <h1 className={`${rubik.medium} text tracking-wide text-gray-800`}>{title}</h1>
            {children}
        </div>
    )
}