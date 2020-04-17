module.exports = {
    types: `
        type GrowingParam{
            _id: ID!
            name: String!
            abbr: String!
            unit: String!
            growing: [Growing!]
            creator: User!
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type GrowingParams{
            totalCount: Int!
            growingParams: [GrowingParam!]
        }

        type CheckDeleteGrowingParam{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        growingParams(keyword: String, limit: Int, skip: Int): GrowingParams
        growingParam(_id: ID!): GrowingParam
    `
    ,
    mutations: `
        createGrowingParam(growingParamInput: GrowingParamInput): GrowingParam
        updateGrowingParam(_id: ID!, updateGrowingParamInput: UpdateGrowingParamInput): GrowingParam
        deleteGrowingParam(_id: ID!): CheckDeleteGrowingParam
    `
    ,
    inputs: `
        input GrowingParamInput{
            name: String!
            abbr: String!
            unit: String!
        }
        input UpdateGrowingParamInput{
            name: String
            abbr: String
            unit: String
        }
    `
};