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
import { calculateQuest, getCorruptionDropRate } from "@/tools/quest";

export default function Quest({ items, corruption, dropRates }: { items: any, corruption: number, dropRates: {tier: number, dropRate: number}[] }) {
    const [timeframe, setTimeframe] = useState("each")
    const [legions, setLegions] = useState(1)
    const [legionType, setLegionType] = useState("auxiliary")
    const [legionRarity, setLegionRarity] = useState("common")
    const [region, setRegion] = useState("corrupt_canyons")
    const [constellation, setConstellation] = useState(0)
    const [questLevel, setQuestLevel] = useState(1)
    const [questPart, setQuestPart] = useState(1)
    const [cardsFlipped, setCardFlipped] = useState(0)
    const [corruptCardsUnflipped, setCorruptCardsUnflipped] = useState(0)

    const { revenue, cost, profit } = calculateQuest(items, timeframe, legions, legionType, legionRarity, region, constellation, questLevel, questPart, cardsFlipped, corruptCardsUnflipped,  corruption, dropRates)
    const corruptionDropRate = getCorruptionDropRate(corruption)

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

    const changeLegionType = (value: string) => {
        setLegionType(value)
    }

    const changeLegionRarity = (value: string) => {
        setLegionRarity(value)
    }

    const changeRegion = (value: string) => {
        setRegion(value)
    }

    const changeConstellation = (value: number) => {
        setConstellation(Number(value))
    }

    const changeQuestLevel = (value: number) => {
        setQuestLevel(Number(value))
    }

    const changeQuestPart = (value: number) => {
        setQuestPart(Number(value))
    }

    const changeCardsFlipped = (value: number) => {
        setCardFlipped(Number(value))
    }

    const changeCorruptCardsUnflipped = (value: number) => {
        setCorruptCardsUnflipped(Number(value))
    }

    return (
        <>
            <div className="relative w-full md:w-fit flex flex-col gap-6">
                <div className="w-full md:w-[484px] h-fit border-2 border-purple-300 shadow-md rounded-xl flex flex-col gap-1 p-[10px]">
                    <h1 className={`${rubik.medium} text-purple-600 text-center`}>Corruption</h1>
                    <h1 className={`${rubik.medium} text-gray-800 text-3xl text-center`}>{numeral(corruption).format("0,0.0a")}</h1>
                    <h1 className={`${rubik.medium} text-purple-600 text-center`}>{corruptionDropRate >= 0 && "+"}{numeral(corruptionDropRate).format("0%")} Drop Rate</h1>
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
                <Detail title="Legion Type" >
                    <Select value={legionType} onChange={changeLegionType}>
                        <Option value="auxiliary" title="Auxiliary" />
                        <Option value="genesis" title="Genesis" />
                    </Select>
                </Detail>
                <Detail title="Legion Rarity" >
                    <Select value={legionRarity} onChange={changeLegionRarity}>
                        <Option value="common" title="Common" />
                        {legionType == "genesis" && <Option value="special" title="Special" />}
                        <Option value="uncommon" title="Uncommon" />
                        <Option value="rare" title="Rare" />
                        {legionType == "genesis" && <Option value="legendary" title="Legendary" />}
                    </Select>
                </Detail>
                <Detail title="Region" >
                    <Select value={region} onChange={changeRegion}>
                        <Option value="corrupt_canyons" title="Corrupt Canyons" />
                        <Option value="desert_ruins" title="Desert Ruins" />
                        <Option value="icy_ascent" title="Icy Ascent" />
                    </Select>
                </Detail>
                <Detail title="Constellation Level" >
                    <Select value={constellation} onChange={changeConstellation}>
                        <Option value={0} title="0" />
                        <Option value={1} title="1" />
                        <Option value={2} title="2" />
                        <Option value={3} title="3" />
                        <Option value={4} title="4" />
                        <Option value={5} title="5" />
                        <Option value={6} title="6" />
                        <Option value={7} title="7" />
                    </Select>
                </Detail>
                <Detail title="Quest Level" >
                    <Select value={questLevel} onChange={changeQuestLevel}>
                        <Option value={1} title="1" />
                        <Option value={2} title="2" />
                        <Option value={3} title="3" />
                        <Option value={4} title="4" />
                        <Option value={5} title="5" />
                        <Option value={6} title="6" />
                    </Select>
                </Detail>
                <Detail title="Quest Part" >
                    <Select value={questPart} onChange={changeQuestPart}>
                        <Option value={1} title="1" />
                        <Option value={2} title="2" />
                        <Option value={3} title="3" />
                    </Select>
                </Detail>
                {questPart == 3 && (
                    <>
                        <Detail title="Cards Flipped" >
                            <Select value={cardsFlipped} onChange={changeCardsFlipped}>
                                <Option value={0} title="0" />
                                <Option value={1} title="1" />
                                <Option value={2} title="2" />
                                <Option value={3} title="3" />
                            </Select>
                        </Detail>
                        <Detail title="Corrupt Cards Unflipped" >
                            <Select value={corruptCardsUnflipped} onChange={changeCorruptCardsUnflipped}>
                                <Option value={0} title="0" />
                                <Option value={1} title="1" />
                                <Option value={2} title="2" />
                            </Select>
                        </Detail>
                    </>
                )}
            </div>
        </>
    )
}