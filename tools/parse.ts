import { ethers } from "ethers";

export default function parseUnits(value: number) {
    return ethers.parseUnits(String(value), 18);
}