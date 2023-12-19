'use client'

import { ChangeEvent, useState } from "react";
import AnswerDetail from "../AnswerDetail";
import Detail from "../Detail";
import Switch from '@mui/material/Switch';
import { calculateCraft, corruptionIncrease, getHoursPerCraft } from "@/tools/craft";
import rubik from "@/fonts/rubik";
import numeral from "numeral";
import Select from "../Select";
import Option from "../Option";
import Input from "../Input";
import Corruption from "../Corruption";
import Time from "../Time";

export default function Craft({ items, corruption }: { items: any, corruption: number }) {
    const [displayCorruption, setDisplayCorruption] = useState(corruption)
    const [timeframe, setTimeframe] = useState("each")
    const [legions, setLegions] = useState(1)
    const [craft, setCraft] = useState("prism")
    const [replace, setReplace] = useState(false)
    const { revenue, cost, profit } = calculateCraft(items, timeframe, legions, craft, replace, displayCorruption)
    const isDefault = corruption == displayCorruption
    const time = getHoursPerCraft(craft)

    const changeCorruption = (event: Event, value: number | number[], activeThumb: number) => {
        setDisplayCorruption(value as number)
    }

    const resetCorruption = () => {
        setDisplayCorruption(corruption)
    }

    const changeTime = (value: string) => {
        setTimeframe(value)
    }

    const changeLegions = (value: number) => {
        if(value > 0) {
            Number.isInteger(value) && setLegions(value);
        } else {
            setLegions(1)
        }
    }

    const changeCraft = (value: string) => {
        setCraft(value)
    }

    const toggleReplace = () => {
        setReplace(!replace)
    }

    return (
        <div className="w-full flex flex-col pb-[80px] gap-4 items-center px-[10px]">
            <div className="w-full md:w-fit relative flex flex-col gap-6">
                <Corruption corruption={displayCorruption} changeCorruption={changeCorruption} resetCorruption={resetCorruption} isDefault={isDefault} detail={`+${numeral(corruptionIncrease(displayCorruption)).format("0%")} Break Rate`} />
                <div className="flex items-center gap-4">
                    <AnswerDetail answer={revenue} title="Revenue" color="blue" />
                    <AnswerDetail answer={cost} title="Cost" color="red"  />
                    <AnswerDetail answer={profit} title="Profit" color="green"  />
                </div>
            </div>
            <Time title="Craft Time:" hours={time} />
            <div className="w-full md:w-[500px] h-fit border-2 rounded-xl shadow-md flex flex-col gap-6 p-[20px]">
                <Detail title="Timeframe" >
                    <Select value={timeframe} onChange={changeTime}>
                        <Option value="each" title="Each" />
                        <Option value="daily" title="Daily" />
                        <Option value="weekly" title="Weekly" />
                        <Option value="monthly" title="Monthly" />
                        <Option value="yearly" title="Yearly" />
                    </Select>
                </Detail>
                <Detail title="Legions" >
                    <Input value={legions} onChange={changeLegions} />
                </Detail>
                <Detail title="Craft" >
                    <Select value={craft} onChange={changeCraft}>
                        <Option value="prism" title="Prism" />
                        <Option value="booster" title="Metabolic Booster" />
                    </Select>
                </Detail>
                <Detail title="Replace Broken Treasures" >
                    <Switch value={replace} onChange={toggleReplace} />
                </Detail>
            </div>
        </div>
    )
}