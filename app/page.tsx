import Dashboard from "./Dashboard";
import IsConnected from "./IsConnected";
import Landing from "./Landing";

export default function Home() {
  return (
    <IsConnected dashboard={<Dashboard />} landing={<Landing />} />
  )
}
