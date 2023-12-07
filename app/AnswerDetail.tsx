import Magic from "@/components/icons/Magic";
import rubik from "@/fonts/rubik";
import numeral from "numeral"

export default function AnswerDetail({ answer, title, color }: { answer: number, title: string, color: "blue" | "red" | "green" }) {
    const textColor = {
        "red": "text-red-500",
        "blue": "text-blue-500",
        "green": "text-green-500"
    }

    const borderColor = {
        "red": "border-red-300",
        "blue": "border-blue-300",
        "green": "border-green-300"
    }
    
    return (
        <div className={`w-[150px] h-[100px] border-2 ${borderColor[color]} rounded-xl shadow-md flex flex-col items-center justify-center`}>
            <div className={`flex items-center gap-2 text-2xl md:text-3xl tracking-wide text-gray-800 ${rubik.medium} `}>
                <div className="h-[17px] md:h-[20px]">
                    <Magic />
                </div>
                {numeral(answer).format("0,0.0a")}
            </div>
            <h1 className={`${rubik.medium} tracking-wide ${textColor[color]}`}>{title}</h1>
        </div>
    )
}