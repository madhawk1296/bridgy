export async function callFunction(address: string, encoded: string) {
    return (await (await fetch(`https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`, {
        method: "POST",
        body: JSON.stringify({
            "jsonrpc":"2.0",
            "method":"eth_call",
            "params":[{"from": process.env.FROM_ADDRESS ,"to": address, "data": encoded}, "latest"],
            "id":1
        }),
        cache: "no-store"
    })).json()).result
}

export async function callTestnetFunction(address: string, encoded: string) {
    return (await (await fetch(`https://arb-sepolia.g.alchemy.com/v2/rwcTdovR4QfjWRSlDIwQvyF267jv6k2S`, {
        method: "POST",
        body: JSON.stringify({
            "jsonrpc":"2.0",
            "method":"eth_call",
            "params":[{"from": process.env.FROM_ADDRESS ,"to": address, "data": encoded}, "latest"],
            "id":1
        }),
        cache: "no-store"
    })).json()).result
}