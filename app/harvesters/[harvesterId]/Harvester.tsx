'use client'

import AnswerDetail from "@/app/AnswerDetail";
import Corruption from "@/app/Corruption";
import Detail from "@/app/Detail";
import Input from "@/app/Input";
import Option from "@/app/Option";
import Select from "@/app/Select";
import { calculateHarvester, corruptionMiningPower } from "@/tools/harvester";
import numeral from "numeral";
import { useState } from "react";
import ItemsStaked from "../ItemsStaked";
import { BuildingType, ItemType } from "@/types/tables";
import { capitalizeFirstLetter } from "@/tools/string";

export interface StakedItemType extends ItemType {
    quantity: number;
    key: number;
}

export default function Harvester({ items, harvester }: { items: ItemType[], harvester: BuildingType }) {
    const { corruption, primaries_type, secondaries_type, max_primaries, max_secondaries } = harvester
    const primaries = items.filter(item => item.collection == primaries_type)
    const secondaries = items.filter(item => item.collection == secondaries_type)
    const [displayCorruption, setDisplayCorruption] = useState(corruption)
    const [timeframe, setTimeframe] = useState("daily")
    const [magicStaked, setMagicStaked] = useState(1000)
    const [primariesStaked, setPrimariesStaked] = useState<StakedItemType[]>([])
    const [secondariesStaked, setSecondariesStaked] = useState<StakedItemType[]>([])

    const primaryFilterOptions = ["auxiliary", "genesis"]
    const [currentPrimaryFilter, setCurrentPrimaryFilter] = useState(primaryFilterOptions[0])
    const filteredPrimaryItems = primaries.filter(item => item.type == currentPrimaryFilter)
    const [currentPrimaryItem, setCurrentPrimaryItem] = useState(primaries_type == "legions" ? filteredPrimaryItems[0] : primaries[0])

    const currentPrimaryAmount = primariesStaked.reduce((acc, item) => acc + (item.weight! * item.quantity), 0)
    const maxTitle = (value: number, max: number) => `${value}KG/${max}KG`

    const secondairesFilterOptions = [1,2,3,4,5]
    const [currentSecondaryFilter, setCurrentSecondaryFilter] = useState(secondairesFilterOptions[0])
    const filteredSecondaryItems = secondaries.filter(item => item.tier == currentSecondaryFilter)
    const [currentSecondaryItem, setCurrentSecondaryItem] = useState(secondaries_type == "treasures" ? filteredSecondaryItems[0] : secondaries[0])

    const currentSecondaryAmount = secondariesStaked.reduce((acc, item) => acc + item.quantity, 0)

    const { revenue, cost, profit, apy } = calculateHarvester(harvester, corruption, displayCorruption, timeframe, magicStaked, primariesStaked, secondariesStaked)
    const isDefault = corruption == displayCorruption

    const changePrimaryFilter = (value: string) => {
        setCurrentPrimaryFilter(value)
        setCurrentPrimaryItem(items.filter(item => item.type == value)[0])
    }

    const changeCurrentPrimaryItem = (value: string) => {
        setCurrentPrimaryItem(primaries.find(item => item.id == value)!)
    }

    const changeSecondaryFilter = (value: string) => {
        const newTier = Number(value)
        setCurrentSecondaryFilter(newTier)
        setCurrentSecondaryItem(items.filter(item => item.tier == newTier)[0])
    }

    const changeCurrentSecondaryItem = (value: string) => {
        setCurrentSecondaryItem(secondaries.find(item => item.id == value)!)
    }

    const changeCorruption = (event: Event, value: number | number[], activeThumb: number) => {
        setDisplayCorruption(value as number)
    }

    const resetCorruption = () => {
        setDisplayCorruption(corruption)
    }

    const changeTime = (value: string) => {
        setTimeframe(value)
    }

    const changeMagicStaked = (value: number) => {
        if(value >= 0) {
            setMagicStaked(value);
        } else {
            setMagicStaked(0)
        }
    }

    const addPrimaryStaked = (value: StakedItemType) => {
        setPrimariesStaked([...primariesStaked, value])
    }

    const addSecondaryStaked = (value: StakedItemType) => {
        setSecondariesStaked([...secondariesStaked, value])
    }

    const changePrimaryQuantity = (value: number, key: number) => {
        const newStakedItems = primariesStaked.map(item => {
            if(item.key == key) {
                if(value > 0) {
                    if (Number.isInteger(value)) {
                        return {...item, quantity: value};
                    }
                } else {
                    return {...item, quantity: 1}
                }
            } 

            return item
        })

        const newMax = newStakedItems.reduce((acc, item) => acc + (item.weight! * item.quantity), 0)

        if(newMax <= max_primaries!) {
            setPrimariesStaked(newStakedItems)
        }
    }

    const changeSecondaryQuantity = (value: number, key: number) => {
        const newStakedItems = secondariesStaked.map(item => {
            if(item.key == key) {
                if(value > 0) {
                    if (Number.isInteger(value)) {
                        return {...item, quantity: value};
                    }
                } else {
                    return {...item, quantity: 1}
                }
            } 

            return item
        })

        const newMax = newStakedItems.reduce((acc, item) => acc + item.quantity, 0)

        if(newMax <= max_secondaries!) {
            setSecondariesStaked(newStakedItems)
        }
    }

    const primaryFilterTitle = (filter: any) => {
        return capitalizeFirstLetter(filter)
    }

    const secondaryFilterTitle = (filter: any) => {
        return `Tier ${filter}`
    }

    const deletePrimary = (key: number) => {
        setPrimariesStaked(primariesStaked.filter(item => item.key != key))
    }

    const deleteSecondary = (key: number) => {
        setSecondariesStaked(secondariesStaked.filter(item => item.key != key))
    }

    return (
        <div className="w-full flex flex-col pb-[80px] gap-4 items-center px-[10px]">
            <div className="w-full md:w-fit relative flex flex-col gap-6">
                <Corruption corruption={displayCorruption} changeCorruption={changeCorruption} resetCorruption={resetCorruption} isDefault={isDefault} detail={`${numeral(corruptionMiningPower(displayCorruption)).format("0%")} Mining Power`} />
                <div className="self-center flex items-center gap-4">
                    <AnswerDetail answer={apy} title="APY" color="yellow" isPercent={true} />
                    <AnswerDetail answer={profit} title="Profit" color="green"  />

                </div>
            </div>
            <div className="w-full md:w-[500px] h-fit border-2 rounded-xl shadow-md flex flex-col gap-6 p-[20px]">
                <Detail title="Timeframe" >
                    <Select value={timeframe} onChange={changeTime}>
                        <Option value="daily" title="Daily" />
                        <Option value="weekly" title="Weekly" />
                        <Option value="monthly" title="Monthly" />
                        <Option value="yearly" title="Yearly" />
                    </Select>
                </Detail>
                <Detail title="Magic Staked" >
                    <Input value={magicStaked} onChange={changeMagicStaked} />
                </Detail>
                <ItemsStaked type={primaries_type!} title={`${capitalizeFirstLetter(primaries_type!)} Staked`} stakedItems={primariesStaked} items={primaries} addItem={addPrimaryStaked} changeQuantity={changePrimaryQuantity} filterOptions={primaryFilterOptions} currentFilter={currentPrimaryFilter} currentItem={currentPrimaryItem} filteredItems={filteredPrimaryItems} changeFilter={changePrimaryFilter} changeCurrentItem={changeCurrentPrimaryItem} filterTitle={primaryFilterTitle} currentAmount={currentPrimaryAmount} max={max_primaries!} maxTitle={maxTitle} deleteItem={deletePrimary} />
                <ItemsStaked type={secondaries_type!} title={`${capitalizeFirstLetter(secondaries_type!)} Staked`} stakedItems={secondariesStaked} items={secondaries} addItem={addSecondaryStaked} changeQuantity={changeSecondaryQuantity} filterOptions={secondairesFilterOptions} currentFilter={currentSecondaryFilter} currentItem={currentSecondaryItem} filteredItems={filteredSecondaryItems} changeFilter={changeSecondaryFilter} changeCurrentItem={changeCurrentSecondaryItem} filterTitle={secondaryFilterTitle} currentAmount={currentSecondaryAmount} max={max_secondaries!} deleteItem={deleteSecondary} />
            </div>
        </div>
    )
}