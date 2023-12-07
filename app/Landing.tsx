import rubik from "@/fonts/rubik";
import Feature from "./Feature";
import Sword from "@/components/icons/Sword";
import Potion from "@/components/icons/Potion";
import LandingButton from "./LandingButton";
import Container from "./Container";

export default function Landing() {
    return (
        <Container>
            <div className="flex flex-col gap-4 items-center">
                <h1 className={`${rubik.bold} text-4xl md:text-6xl text-center text-gray-800`}>Don't Play <span className="text-red-500">Bridgeworld</span> Blind</h1>
                <h1 className={`${rubik.light} text-xl md:text-2xl text-center text-gray-800 max-w-[700px]`}>Level up your Bridgeworld game by calculating the profitability of your quests and crafts</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <Feature icon={<Sword />} title="Quest" content="Maximize your legion's questing abilities" />
                <Feature icon={<Potion/>} title="Craft" content="Never make an unprofitable craft again" />
            </div>
            <div className="flex items-center gap-4 flex-col">
                <h1 className={`${rubik.medium} text-2xl text-center text-gray-800 max-w-[700px]`}>Only <span className="text-red-500">20 MAGIC</span> per month</h1>
                <LandingButton />
            </div>
        </Container>
    )
}