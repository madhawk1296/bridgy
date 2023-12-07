import { getMagicApproved, getMagicBalance } from "@/tools/magic"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params: { address }}: { params: { address: string}}): Promise<NextResponse<{ data: number, error: null}>>  {
    const res = await getMagicBalance(address)
    return NextResponse.json({
        data: res,
        error: null
    })
}