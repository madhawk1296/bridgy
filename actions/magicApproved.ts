'use server'

import { getMagicApproved } from "@/tools/magic"
import { revalidateTag } from 'next/cache'

export default async function magicApproved(address: string) {
    const res = await getMagicApproved(address)
    return res
}