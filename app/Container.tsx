import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
    return (
        <div className="w-full flex flex-col py-[80px] gap-10 items-center px-[10px]">
            {children}
        </div>
    )
}