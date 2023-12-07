export default function Option({ value, title }: { value: string | number, title: string}) {
    return (
        <option value={value} >{title}</option>
    )
}