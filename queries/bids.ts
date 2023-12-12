import { gql } from "@apollo/client"

export default gql`
query getItems($currentTime: BigInt!, $consumablesAddress: ID!, $treasuresAddress: ID!) {
    consumables: collection(id: $consumablesAddress) {
        listings(where: {expiresAt_gt: $currentTime status: ACTIVE} first: 1000 orderBy: timestamp orderDirection: desc) {
            token {
              id
            }
            pricePerItem
        }
    }
    treasures: collection(id: $treasuresAddress) {
        listings(where: {expiresAt_gt: $currentTime status: ACTIVE} first: 1000 orderBy: timestamp orderDirection: desc) {
            token {
              id
            }
            pricePerItem
        }
    }
}
`
