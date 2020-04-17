module.exports = {
    types: `
        type Rearing{
            _id: ID!
            chickInDate: String!
            chickInWeight: Int!
            population: Int!
            otherInformation: String
            creator: User!
            house: House!
            rearingRecord: [RearingRecord!]
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type Rearings{
            totalCount: Int!
            rearings: [Rearing!]
        }

        type CheckDeleteRearing{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        rearings(keyword: String, limit: Int, skip: Int): Rearings
        rearing(_id: ID!): Rearing
    `
    ,
    mutations: `
        createRearing(rearingInput: RearingInput): Rearing
        updateRearing(_id: ID!, updateRearingInput: UpdateRearingInput): Rearing
        deleteRearing(_id: ID!): CheckDeleteRearing
    `
    ,
    inputs: `
        input RearingInput{
            chickInDate: String!
            chickInWeight: Int!
            population: Int!
            otherInformation: String
            house: String!
        }
        input UpdateRearingInput{
            chickInDate: String
            chickInWeight: Int
            population: Int
            otherInformation: String
            house: String
        }
    `
};