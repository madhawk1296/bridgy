import rubik from "@/fonts/rubik";
import { Tables } from "@/types/supabase";
import { EventHandler } from "posthog-js";
import { ChangeEvent, FormEvent, useState } from "react";
import StakedItem from "./StakedItem";
import { ItemType } from "@/types/tables";
import { StakedItemType } from "./[harvesterId]/Harvester";

export default function ItemsStaked({ type, title, stakedItems, items, addItem, changeQuantity, filterOptions, currentFilter, currentItem, filteredItems, changeFilter, changeCurrentItem, filterTitle, currentAmount, max, maxTitle=null, deleteItem }: { type: string, title: string, stakedItems: StakedItemType[], items: ItemType[], addItem: (value: StakedItemType) => void, changeQuantity: (value: number, key: number) => void, filterOptions: any[], currentFilter: any, currentItem: ItemType, filteredItems: ItemType[], changeFilter: (value: string) => void, changeCurrentItem: (value: string) => void, filterTitle: (fitler: any) => string, currentAmount: number, max: number, maxTitle?: ((value: number, max: number) => string) | null, deleteItem: (key: number) => void}) {
    const containsFilter = ["legions", "treasures"].includes(type)
    const isMaxxed = currentAmount >= max

    const handleChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        changeFilter(e.target.value)
    }

    const handleChangeCurrentItem = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log({ change: e.target.value})
        changeCurrentItem(e.target.value)
    }

    const handleAdd = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        addItem({...currentItem, quantity: 1, key: stakedItems.length})
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${rubik.medium} tracking-wide text-gray-800`}>{title}</h1>
                <h1 className={`${rubik.medium} tracking-wide text-gray-800`}>{maxTitle ? maxTitle(currentAmount, max) : `${currentAmount}/${max}`}</h1>
            </div>
            <div className="w-full flex flex-wrap gap-2">
                {stakedItems.map(stakedItem => <StakedItem item={stakedItem} changeQuantity={changeQuantity} deleteItem={deleteItem} />)}
            </div>
            {!isMaxxed && <form onSubmit={handleAdd} className="relative w-[200px] bg-white border-2 rounded-xl shadow-md flex flex-col p-[10px] gap-2">
                <h1 className="text-center text-gray-800 tracking-wide text">Add Item</h1>
                {containsFilter && <select value={currentFilter} onChange={handleChangeFilter} className="w-full border-2 bg-gray-100 rounded-xl shadow text-xs p-[10px]">
                    {filterOptions.map(filter => (
                        <option value={filter} className="text-xs px-[10px] py-[10px] hover:bg-gray-100">{filterTitle(filter)}</option>
                    ))}
                </select>}
                <select value={currentItem.id} onChange={handleChangeCurrentItem} className="w-full border-2 bg-gray-100 rounded-xl shadow text-xs p-[10px]">
                    {(containsFilter ? filteredItems : items).map(item => (
                        <option value={item.id} className="text-xs px-[10px] py-[10px] hover:bg-gray-100">{item.name}</option>
                    ))}
                </select>
                <button type="submit" className="p-[10px] bg-blue-500 text-gray-50 rounded-xl shadow-md text-xs">Add</button>
            </form>}
        </div>
    )
}