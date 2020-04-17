module.exports = {
    types: `
        type Harvest{
            _id: ID!
            date: String!
            totalWeight: Int!
            numberLiveBird: Int!
            averageWeight: Int!
            rearing: Rearing!
            creator: User!
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type Harvests{
            totalCount: Int!
            harvests: [Harvest!]
        }

        type CheckDeleteHarvest{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        harvests(keyword: String, limit: Int, skip: Int): Harvests
        harvest(_id: ID!): Harvest
    `
    ,
    mutations: `
        createHarvest(harvestInput: HarvestInput): Harvest
        updateHarvest(_id: ID!, updateHarvestInput: UpdateHarvestInput): Harvest
        deleteHarvest(_id: ID!): CheckDeleteHarvest
    `
    ,
    inputs: `
        input HarvestInput{
            date: String!
            totalWeight: Int!
            numberLiveBird: Int!
            averageWeight: Int!
            rearing: String!
        }
        input UpdateHarvestInput{
            date: String
            totalWeight: Int
            numberLiveBird: Int
            averageWeight: Int
        }
    `
};