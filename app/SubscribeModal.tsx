import Magic from "@/components/icons/Magic";
import rubik from "@/fonts/rubik";
import { ReactNode, createContext, useEffect, useState } from "react";
import Option from "./Option";
import Select from "./Select";
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import magicApproved from "@/actions/magicApproved";
import magicABI from "@/data/abis/magic.json"
import subscribeABI from "@/data/abis/subscription.json"
import parseUnits from "@/tools/parse";
import useSWR from 'swr'
import { fetcher } from "@/tools/fetcher";



export const SuscriptionContext = createContext({
    menu: true,
    toggleMenu: () => {}
})

export default function SubscribeModal({ children}: { children: ReactNode }) { 
    const { address } = useAccount()
    const [menu, setMenu] = useState(false)
    const [months, setMonths] = useState(1)
    const { data: allowanceData } = useSWR(`/api/allowance/${address}`, fetcher)
    const { data: balanceData } = useSWR(`/api/balance/${address}`, fetcher)
    const approvedMagic: number = allowanceData?.data || 0
    const magicBalance: number = balanceData?.data || 0
    const monthlyCost = 20
    const totalCost = monthlyCost * months
    const insufficientAllowance = approvedMagic < totalCost
    const insufficientBalance = magicBalance < totalCost

    const { config: approveConfig } = usePrepareContractWrite({
        address: process.env.NEXT_PUBLIC_MAGIC_ADDRESS as `0x${string}`,
        abi: magicABI,
        functionName: 'approve',
        args: [process.env.NEXT_PUBLIC_SUBSCRIPTION_ADDRESS, parseUnits(300)]
    })
    const { write: approveWrite } = useContractWrite(approveConfig)
    const handleApprove = async () => {
        approveWrite?.()
    }

    const { config: subscribeConfig } = usePrepareContractWrite({
        address: process.env.NEXT_PUBLIC_SUBSCRIPTION_ADDRESS as `0x${string}`,
        abi: subscribeABI,
        functionName: 'subscribe',
        args: [months]
    })
    const { write: subscribeWrite } = useContractWrite(subscribeConfig)
    const handleSubscribe = async () => {
        subscribeWrite?.()
    }


    const toggleMenu = () => {
        setMenu(!menu)
    }

    const changeMonths = (value: number) => {
        setMonths(value)
    }

    return (
        <SuscriptionContext.Provider value={{ menu, toggleMenu }}>
            {children}
            {menu && (
                <div className="fixed w-screen h-screen top-0 left-0 flex items-end md:items-center justify-center z-20">
                    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50" onClick={toggleMenu} />
                    <div className="relative w-full md:w-[400px] h-fit bg-white rounded-t-xl md:rounded-xl flex flex-col gap-10 pb-[100px] py-[15px] px-[25px] ">
                        <h1 className={`${rubik.semiBold} text-2xl text-gray-800 tracking-wide text-center`}>Buy Subscription</h1>
                        <div className="flex flex-col gap-4">
                            <div className='flex items-center justify-between text'>
                                <h1 className='text-lg text-gray-800 tracking-wide'>Cost</h1>
                                <div className={`text-lg text-gray-800 tracking-wide flex gap-1 items-center ${rubik.semiBold}`}>
                                    <div className="h-[20px]">
                                        <Magic />
                                    </div>
                                    {monthlyCost}
                                </div>
                            </div>
                            <div className='flex items-center justify-between text'>
                                <h1 className='text-lg text-gray-800 tracking-wide'>Months</h1>
                                <div className={`text-lg text-gray-800 tracking-wide flex gap-1 items-center ${rubik.semiBold}`}>
                                    <Select value={months} onChange={changeMonths} >
                                        <Option value={1} title="1" />
                                        <Option value={2} title="2" />
                                        <Option value={3} title="3" />
                                        <Option value={4} title="4" />
                                        <Option value={5} title="5" />
                                        <Option value={6} title="6" />
                                        <Option value={7} title="7" />
                                        <Option value={8} title="8" />
                                        <Option value={9} title="9" />
                                        <Option value={10} title="10" />
                                        <Option value={11} title="11" />
                                        <Option value={12} title="12" />
                                    </Select>
                                </div>
                            </div>
                            <div className='flex items-center justify-between text pt-[10px] border-t-2'>
                                <h1 className='text-lg text-gray-800 tracking-wide'>Total Cost</h1>
                                <div className={`text-lg text-gray-800 tracking-wide flex gap-1 items-center ${rubik.semiBold}`}>
                                    <div className="h-[20px]">
                                        <Magic />
                                    </div>
                                    {totalCost}
                                </div>
                            </div>
                            <button disabled={insufficientBalance} onClick={insufficientAllowance ? handleApprove : handleSubscribe} className="py-[5px] bg-red-500 shadow-md text-gray-50 rounded-xl tracking-wide disabled:bg-red-400">{insufficientBalance ? "Insufficient Balance" : (insufficientAllowance ? "Approve MAGIC" : "Buy Subscriptions")}</button>
                        </div>
                    </div>
                </div>
            )}
        </ SuscriptionContext.Provider>
    )
}