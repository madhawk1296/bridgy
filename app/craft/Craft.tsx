'use client'

import { ChangeEvent, useState } from "react";
import AnswerDetail from "../AnswerDetail";
import Detail from "../Detail";
import Switch from '@mui/material/Switch';
import { calculateCraft, corruptionIncrease } from "@/tools/craft";
import rubik from "@/fonts/rubik";
import numeral from "numeral";
import Select from "../Select";
import Option from "../Option";
import Input from "../Input";

export default function Craft({ items, corruption }: { items: any, corruption: number }) {
    const [timeframe, setTimeframe] = useState("each")
    const [legions, setLegions] = useState(1)
    const [craft, setCraft] = useState("prism")
    const [replace, setReplace] = useState(false)

    const { revenue, cost, profit } = calculateCraft(items, timeframe, legions, craft, replace, corruption)

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
        <>
            <div className="w-full md:w-fit relative flex flex-col gap-6">
                <div className="w-full md:w-[484px] h-fit border-2 border-purple-300 shadow-md rounded-xl flex flex-col gap-1 p-[10px]">
                    <h1 className={`${rubik.medium} text-purple-600 text-center`}>Corruption</h1>
                    <h1 className={`${rubik.medium} text-gray-800 text-3xl text-center`}>{numeral(corruption).format("0,0.0a")}</h1>
                    <h1 className={`${rubik.medium} text-purple-600 text-center`}>+{numeral(corruptionIncrease(corruption)).format("0%")} Break Rate</h1>
                </div>
                <div className="flex items-center gap-4">
                    <AnswerDetail answer={revenue} title="Revenue" color="blue" />
                    <AnswerDetail answer={cost} title="Cost" color="red"  />
                    <AnswerDetail answer={profit} title="Profit" color="green"  />
                </div>
            </div>
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
        </>
    )
}