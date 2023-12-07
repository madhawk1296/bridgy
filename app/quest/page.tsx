import IsConnected from "../IsConnected";
import IsSubscribed from "../IsSubscribed";
import Landing from "../Landing";
import Main from "./Main";

export default async function Page() {
    return (
        <IsSubscribed> 
            <Main />   
        </IsSubscribed>
    )
}