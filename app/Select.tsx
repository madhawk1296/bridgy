import { ChangeEvent, ReactNode } from "react";

export default function Select({ children, value, onChange }: { children: ReactNode, value: string | number, onChange: (value: any) => void }) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value)
    }
    return (
        <select value={value} onChange={handleChange} className="border-2 bg-gray-100 p-[10px] rounded-xl border-2 text-sm text-gray-800 text-center">
            {children}
        </select>
    )
}