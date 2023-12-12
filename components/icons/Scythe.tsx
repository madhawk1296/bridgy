export default function Scythe({ selected }: { selected: boolean}) {
    return (
        <svg className={`h-full ${selected ? "stroke-red-500" : "stroke-gray-600"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.3935 6.97639C8.38298 2.64143 15.418 1.9105 21.0973 4.78361C15.7064 4.36298 10.1776 6.11907 5.93875 10.0519M3 6.50002L15 21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}