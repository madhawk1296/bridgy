import { Interface } from "ethers";
import { ethers } from "ethers";

export function ethersInterface(abi: any[]) {
    return new ethers.Interface(abi)
}

export function encodeFunctionData(inter: Interface, functionName: string, args: any[] = []) {
    return inter.encodeFunctionData(functionName, args)
}