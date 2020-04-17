module.exports = {
    types: `
        type Feeding{
            _id: ID!
            number: Int!
            feed: Feed!
            rearingRecord: RearingRecord!
            storeTime: String!
            creator: User!
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type Feedings{
            totalCount: Int!
            feedings: [Feeding!]
        }

        type CheckDeleteFeeding{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        feedings(keyword: String, limit: Int, skip: Int): Feedings
        feeding(_id: ID!): Feeding
    `
    ,
    mutations: `
        createFeeding(feedingInput: FeedingInput): Feeding
        updateFeeding(_id: ID!, updateFeedingInput: UpdateFeedingInput): Feeding
        deleteFeeding(_id: ID!): CheckDeleteFeeding
    `
    ,
    inputs: `
        input FeedingInput{
            number: Int!
            storeTime: String!
            feed: String
            rearingRecord: String
        }
        input UpdateFeedingInput{
            number: Int
            storeTime: String
        }
    `
};