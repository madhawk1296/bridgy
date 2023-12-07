import { ChangeEvent } from "react"

export default function Input({ value, onChange }: { value: number, onChange: (value: number) => void}) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value))
    }
    return (
        <input onChange={handleChange} type="number" className="border-2 rounded-xl shadow py-[10px] px-[10px] w-[100px] text-right text-gray-800 text-sm" value={value}  />
    )
}