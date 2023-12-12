import { supabaseAdminClient, supabaseServerClient } from "@/clients/supabase";
import listings from "@/queries/listings";
import { ItemType, ListingType } from "@/types/item";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import Web3 from "web3";

const apolloClient = new ApolloClient({
    uri: process.env.TREASURE_MARKETPLACE_SUBGRAPH,
    ssrMode: true,
    cache: new InMemoryCache(),
});

export async function getPrices() {
    // get current time in seconds
    const currentTime = Math.floor(Date.now() / 1000)

    const currentListings = (await apolloClient.query({
        query: listings, 
        variables: { 
            currentTime,
            consumablesAddress: process.env.CONSUMABLES_ADDRESS,
            treasuresAddress: process.env.TREASURES_ADDRESS
        }
    }).then(r => r.data))

    const supabase = supabaseServerClient()
    const { data: items, error } = await supabase.from("items").select()

    return items!.map(item => {
        const collection = item.contract.toLowerCase() == process.env.CONSUMABLES_ADDRESS ? "consumables" : "treasures"
        const collectionListings: ListingType[] = collection == "consumables" ? currentListings.consumables.listings : currentListings.treasures.listings
        const itemListings = collectionListings.filter(listing => listing.token.id.toLowerCase() == item.id.toLowerCase())
        const listed = itemListings.length > 0
        let price = 0
        if(listed) {
            const lowestPrice = itemListings.reduce((minPrice, listing) => {
                const price = BigInt(listing.pricePerItem)
                return price < minPrice ? price : minPrice;
            }, BigInt(itemListings[0].pricePerItem));
            price = Number(Web3.utils.fromWei(lowestPrice, "ether"))
        }

        return {...item, price, listed}
    })
}

export async function updatePrices() {
    const supbase = supabaseAdminClient()

    const items = await getPrices()

    items.forEach(async (item) => {
        await supbase.from("items").update({ price: item.price, listed: item.listed }).eq("id", item.id)
    })
}