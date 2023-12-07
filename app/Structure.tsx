'use client'

import { ReactNode, useEffect, useState } from "react"
import Header from "./Header";

export default function Structure({ children }: { children: ReactNode}) {
    const [isSmallDevice, setIsSmallDevice] = useState(false);

    useEffect(() => {
        // Check screen width and update the state accordingly
        const checkDeviceSize = () => {
            setIsSmallDevice(window.innerWidth < 768); // Example breakpoint at 768px
        };

        // Call the function initially and on every window resize
        checkDeviceSize();
        window.addEventListener('resize', checkDeviceSize);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('resize', checkDeviceSize);
        };
    }, []);

    return isSmallDevice ? (
        <>
            
            <Header />
        </>
    )
}