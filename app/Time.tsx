import Clock from "@/components/icons/Clock";
import rubik from "@/fonts/rubik";

export default function Time({ title, hours }: { title: string, hours: number }) {
    return (
        <div className="flex items-center gap-1 justify-end w-full md:w-[500px]">
            <h1 className={`w-fit ${rubik.semiBold} text-sm tracking-wide text-gray-600`}>{title} {hours} hours</h1>
            <div className="relative h-[20px]">
                <Clock />
            </div>
        </div>
    )
}