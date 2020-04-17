module.exports = {
    types: `
        type House{
            _id: ID!
            name: String!
            capacity: Int!
            lat: String
            lng: String
            address: String!
            otherInformation: String
            creator: User!
            company: Company!
            rearing: [Rearing!]
            feedStocks: [FeedStock!]
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }
        
        type Houses {
            totalCount : Int!
            houses : [House!]
        }
        
        type CheckDeleteHouse{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        houses(keyword: String, limit: Int, skip: Int): Houses
        house(_id: ID!): House
    `
    ,
    mutations: `
        createHouse(houseInput: HouseInput): House
        updateHouse(_id: ID!, updateHouseInput: UpdateHouseInput): House
        deleteHouse(_id: ID!): CheckDeleteHouse
    `
    ,
    inputs: `
        input HouseInput{
            name: String!
            capacity: Int!
            lat: String
            lng: String
            address: String!
            otherInformation: String
        }
        input UpdateHouseInput{
            name: String
            capacity: Int
            lat: String
            lng: String
            address: String
            otherInformation: String
        }
    `
};