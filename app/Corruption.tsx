import Reset from "@/components/icons/Reset";
import rubik from "@/fonts/rubik";
import { corruptionIncrease } from "@/tools/craft";
import { Slider } from "@mui/material";
import numeral from "numeral";

export default function Corruption({ corruption, changeCorruption, resetCorruption, isDefault, detail }: { corruption: number, changeCorruption: (event: Event, value: number | number[], activeThumb: number) => void, resetCorruption: () => void, isDefault: boolean, detail: string}) {
    const marks = [
        {
          value: 0,
          label: 0,
        },
        {
            value: 100000,
            label: null,
        },
        {
            value: 200000,
            label: null,
        },
        {
            value: 300000,
            label: null,
        },
        {
            value: 400000,
            label: null,
        },
        {
            value: 500000,
            label: null,
        },
        {
            value: 600000,
            label: null,
        },
        {
            value: 700000,
            label: null,
        },
        {
            value: 800000,
            label: null,
        },{
            value: 900000,
            label: null,
        },{
            value: 1000000,
            label: numeral(1000000).format("0,0a"),
        }
      ];

    return (
        <div className="w-full md:w-[484px] h-fit border-2 border-purple-300 shadow-md rounded-xl flex flex-col gap-1 py-[10px] px-[30px]">
            <h1 className={`${rubik.medium} text-purple-600 text-center`}>Corruption</h1>
            <Slider aria-label="Corruption Level" onChange={changeCorruption} step={100000} marks={marks} min={0} max={1000000} valueLabelDisplay="auto" value={corruption} color="secondary" />
            <button onClick={resetCorruption} className={`w-fit px-[10px] border-2 shadow-md rounded-xl flex gap-1 items-center smoothe ${isDefault ? "invisible opacity-0 h-[0]" : "visible opacity-100 mt-[5px] h-[30px]"}`}>
                <h1 className={`w-fit text tracking-wide text-gray-700`}>Reset</h1>
                <div className="h-[14px]">
                    <Reset />
                </div>
            </button>
            <h1 className={`${rubik.medium} text-gray-800 text-3xl text-center`}>{numeral(corruption).format("0,0.0a")}</h1>
            <h1 className={`${rubik.medium} text-purple-600 text-center`}>{detail}</h1>
        </div>
    )
}