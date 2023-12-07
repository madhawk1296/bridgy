import rubik from "@/fonts/rubik";
import Feature from "./Feature";
import Sword from "@/components/icons/Sword";
import Potion from "@/components/icons/Potion";
import Link from "next/link";
import FeatureButton from "./FeatureButton";
import Container from "./Container";
import DashboardSubscription from "./DashboardSubscription";
import IsSubscribed from "./IsSubscribed";

export default function Dashboard() {
    return (
        <Container>
            <div className="flex flex-col gap-4 items-center">
                <h1 className={`${rubik.bold} text-4xl md:text-6xl text-center text-gray-800`}>Dashboard</h1>
            </div>
            <DashboardSubscription />
            <IsSubscribed>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <FeatureButton link="/quest" icon={<Sword />} title="Quest" content="Calculate your legion's questing profits" />
                    <FeatureButton link="/craft" icon={<Potion/>} title="Craft" content="Calculate your legion's crafting profits" />
                </div>
            </IsSubscribed>
        </Container>
    )
}