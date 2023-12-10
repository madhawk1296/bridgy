import rubik from "@/fonts/rubik";
import Container from "../Container";
import Craft from "./Craft";
import { getCraftCorruption } from "@/tools/corruption";
import getItems from "@/tools/items";

export default async function Main() {
    const itemsData = getItems();
    const corruptionData = getCraftCorruption();
 
    const [items, corruption] = await Promise.all([itemsData, corruptionData])
    
    return (
        <Container>
            <div className="flex flex-col gap-4 items-center">
                <h1 className={`${rubik.bold} text-4xl md:text-6xl text-center text-gray-800`}>Craft</h1>
            </div>
            <Craft items={items} corruption={corruption} />
        </Container>
    )
}