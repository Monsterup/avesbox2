module.exports = {
    types: `
        type FeedWarehouse{
            _id: ID!
            name: String!
            houses: [House!]
            feedStocks: [FeedStock!]
            company: Company
            creator: User!
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type FeedWarehouses{
            totalCount: Int!
            feedWarehouses: [FeedWarehouse!]
        }

        type CheckDeleteFeedWarehouse{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        feedWarehouses(keyword: String, limit: Int, skip: Int): FeedWarehouses
        feedWarehouse(_id: ID!): FeedWarehouse
    `
    ,
    mutations: `
        createFeedWarehouse(feedWarehouseInput: FeedWarehouseInput): FeedWarehouse
        updateFeedWarehouse(_id: String!, updateFeedWarehouseInput: UpdateFeedWarehouseInput): FeedWarehouse
        deleteFeedWarehouse(_id: String!): CheckDeleteFeedWarehouse
    `
    ,
    inputs: `
        input FeedWarehouseInput{
            name: String!
        }
        input UpdateFeedWarehouseInput{
            name: String
        }
    `
};