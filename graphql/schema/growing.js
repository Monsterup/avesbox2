module.exports = {
    types: `
        type Growing{
            _id: ID!
            growingParam: GrowingParam!
            value: Int!
            rearingRecord: RearingRecord!
            creator: User!
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type Growings{
            totalCount: Int!
            growings: [Growing!]
        }

        type CheckDeleteGrowing{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        growings(keyword: String, limit: Int, skip: Int): Growings
        growing(_id: ID!): Growing
    `
    ,
    mutations: `
        createGrowing(growingInput: GrowingInput): Growing
        updateGrowing(_id: ID!, updateGrowingInput: UpdateGrowingInput): Growing
        deleteGrowing(_id: ID!): CheckDeleteGrowing
    `
    ,
    inputs: `
        input GrowingInput{
            value: Int!
            growingParam: String!
            rearingRecord: String!
        }
        input UpdateGrowingInput{
            value: Int
        }
    `
};