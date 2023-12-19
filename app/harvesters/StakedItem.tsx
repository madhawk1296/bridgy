import rubik from "@/fonts/rubik";
import { ItemType } from "@/types/tables";
import Image from "next/image";
import { StakedItemType } from "./[harvesterId]/Harvester";
import { ChangeEvent } from "react";
import Trash from "@/components/icons/Trash";

export default function StakedItem({ item, changeQuantity, deleteItem }: { item: StakedItemType, changeQuantity: (value: number, key: number) => void, deleteItem: (key: number) => void }) {
    const { image, name, key, quantity } = item

    const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        changeQuantity(Number(e.target.value), key)
    }

    const handleDelete = () => {
        deleteItem(key)
    }

    return (
        <div className="relative w-[100px] h-fit p-[10px] shadow border-2 rounded-xl flex flex-col items-center gap-2">
            <Image className="rounded-xl" alt="Staked Item" src={`https://vivvmwqjviedqmobmope.supabase.co/storage/v1/object/public/images/items/${image}`} width={80} height={80} quality={25} />
            <h1 className={`${rubik.semiBold} text-gray-700 truncate tracking-wide text-xs w-full`}>{name}</h1>
            <div className="flex items-center w-full justify-between">
                <h1 className={`${rubik.semiBold} text-xs tracking-wide text-gray-800`}>Qty</h1>
                <input onChange={handleQuantity} type="number" className="w-[40px] text-xs text-gray-800 border-2 shadow rounded-lg py-[5px] p-[2px] outline-none text-right" value={quantity} />
            </div>
            <button onClick={handleDelete} className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rounded-full h-[30px] p-[2px] aspect-square bg-red-200 shadow">
                <Trash />
            </button>
        </div>
    )
}