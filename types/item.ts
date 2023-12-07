export type ItemType = {
    category: string | null
    collection: string
    contract: string
    id: string
    name: string
    tier: number | null
    token_id: number
    price: number
}

export type ListingType = {
    token: {
        id: string
    },
    pricePerItem: string
}